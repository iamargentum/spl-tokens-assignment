import { useCallback, useContext, useEffect, useState } from "react";
import { TokenManagerContext } from "../TokenManager";
import styles from "./tokenAccountsSection.module.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { createAssociatedTokenAccount, createAssociatedTokenAccountInstruction, createInitializeAccountInstruction, getAccount, getAccountLenForMint, getAssociatedTokenAddress, getMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getShortenedString } from "@/utils/common";

export function TokenAccountsSection() {
    
    const [tokenBalance, setTokenBalance] = useState<{[accountAddress: string]: BigInt}>({});

    const tokenAccountsContext = useContext(TokenManagerContext);

    const defaultSetTokenAccounts = useCallback(() => {}, []);


    const token = tokenAccountsContext?.token;
    const accounts = tokenAccountsContext?.tokenAccounts?.value || [];
    const setTokenAccounts = tokenAccountsContext?.tokenAccounts?.setterFn || defaultSetTokenAccounts;

    const { wallet, sendTransaction } = useWallet();
    const publicKey = wallet?.adapter?.publicKey;

    const { connection } = useConnection();

    const createTokenAccount = useCallback(async () => {
        if (!token || !publicKey) return;

        const associatedTokenAddress = await getAssociatedTokenAddress(
            token.publicKey,
            publicKey
        );

        const transaction = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                publicKey,
                associatedTokenAddress,
                publicKey,
                token.publicKey
            )
        );

        await sendTransaction(transaction, connection, {
            preflightCommitment: "confirmed"
        });        

        setTokenAccounts((prev: PublicKey[]) => [...prev, associatedTokenAddress]);

        return associatedTokenAddress;
    }, [connection, publicKey, sendTransaction, setTokenAccounts, token]);

    const getTokenAccountBalance = useCallback(async (accountPublicKeyString: string) => {
        if(!token || !publicKey) return;

        const account = await getAccount(connection, new PublicKey(accountPublicKeyString))
        .catch(err => {
            console.log("error occurred while fetching balance for ", accountPublicKeyString, " - ", err);
            return {amount: BigInt(-1)};
        });

        setTokenBalance(prev => ({
            ...prev,
            [accountPublicKeyString]: account.amount
        }));
    }, [connection, publicKey, token]);

    const refreshTokenAccountBalances = useCallback(() => {
        for (let index = 0; index < accounts.length; index++) {
            const element = accounts[index];
            getTokenAccountBalance(element.toBase58());
        }
    }, [accounts, getTokenAccountBalance]);

    useEffect(() => {
        if(accounts.length > 0) refreshTokenAccountBalances();
    }, [accounts, refreshTokenAccountBalances]);

    return (
        <div className={styles.tokenAccountsContainer}>
            <div className={styles.tokenAccountsTopBar}>
                <h3>token accounts</h3>
            </div>

            <table className={styles.tokenAccountsTable}>
                <thead>
                    <tr className={styles.tokenAccountsTableHeading}>
                        <th className={styles.addressDataCell}>address</th>
                        <th className={styles.balanceDataCell}>
                            <span className={styles.balanceDataCellSpan}>
                                balance
                                <span className={`material-symbols-outlined ${styles.refreshButton}`} onClick={refreshTokenAccountBalances}>
                                    refresh
                                </span>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts.length > 0 ?
                            accounts.map((a, aIndex) => (
                                <tr key={`account_${aIndex}`}>
                                    <td className={styles.tokenAccountAddressDataCell}>
                                        {getShortenedString(a.toBase58(), 10)}
                                    </td>
                                    <td className={styles.tokenAccountBalanceDataCell}>
                                        {
                                            !tokenBalance?.[a.toBase58()] ?
                                            "NA" :
                                            tokenBalance[a.toBase58()]?.toString()
                                        }
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={2} className={styles.noTokenAccountsTextCell}>
                                    <p>no token accounts</p>
                                    <button onClick={createTokenAccount}>create new +</button>
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}