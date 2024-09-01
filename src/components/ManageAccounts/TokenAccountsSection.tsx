import { useCallback, useContext, useEffect, useState } from "react";
import { TokenManagerContext } from "../TokenManager";
import styles from "./tokenAccountsSection.module.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { createAssociatedTokenAccount, createAssociatedTokenAccountInstruction, createInitializeAccountInstruction, getAccountLenForMint, getAssociatedTokenAddress, getMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getShortenedString } from "@/utils/common";

export function TokenAccountsSection() {
    
    const [tokenBalance, setTokenBalance] = useState('0');

    const tokenAccountsContext = useContext(TokenManagerContext);

    const defaultSetTokenAccounts = useCallback(() => {}, []);


    const token = tokenAccountsContext?.token;
    const accounts = tokenAccountsContext?.tokenAccounts?.value || [];
    const setTokenAccounts = tokenAccountsContext?.tokenAccounts?.setterFn || defaultSetTokenAccounts;

    const { wallet, sendTransaction } = useWallet();
    const publicKey = wallet?.adapter?.publicKey;

    const { connection } = useConnection();

    const createTokenAccount = useCallback(async () => {
        console.log("create token account called - ", token, publicKey);

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

        console.log("token account created - ", associatedTokenAddress);
        

        setTokenAccounts((prev: PublicKey[]) => [...prev, associatedTokenAddress]);

        return associatedTokenAddress;
    }, [connection, publicKey, sendTransaction, setTokenAccounts, token]);

    console.log("accounts changed - ", accounts);

    const getTokenAccountBalance = useCallback(async () => {
        if(!token) return;

        const res = await connection.getTokenAccountBalance(
            token.publicKey,
            "confirmed"
        );

        setTokenBalance(res.value.uiAmountString || "0");
    }, [connection, token]);

    useEffect(() => {
        if(accounts.length > 0) getTokenAccountBalance();
    }, [accounts, getTokenAccountBalance]);

    return (
        <div className={styles.tokenAccountsContainer}>
            <div className={styles.tokenAccountsTopBar}>
                <h3>token accounts</h3>
                <button onClick={createTokenAccount}>create new +</button>
            </div>

            <table className={styles.tokenAccountsTable}>
                <thead>
                    <tr className={styles.tokenAccountsTableHeading}>
                        <th className={styles.addressDataCell}>address</th>
                        <th className={styles.balanceDataCell}>
                            <span className={styles.balanceDataCellSpan}>
                                balance
                                <span className={`material-symbols-outlined ${styles.refreshButton}`} onClick={getTokenAccountBalance}>
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
                                    <td>
                                        {getShortenedString(a.toBase58(), 10)}
                                    </td>
                                    <td>
                                        {tokenBalance}
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={2} className={styles.noTokenAccountsTextCell}>
                                    no token accounts
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}