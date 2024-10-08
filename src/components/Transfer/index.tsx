import { useCallback, useContext, useState } from "react";
import styles from "./transfer.module.css";
import { TokenManagerContext } from "../TokenManager";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { createAssociatedTokenAccountInstruction, createTransferCheckedInstruction, createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";

export function Transfer() {
    const [amount, setAmount] = useState(0);
    const [toAccount, setToAccount] = useState('');
    const [fromAccount, setFromAccount] = useState('');

    const { connection } = useConnection();
    const { wallet, sendTransaction } = useWallet();
    const publicKey = wallet?.adapter?.publicKey;

    const tokenManagerContext = useContext(TokenManagerContext);

    const tokenMint = tokenManagerContext?.token?.publicKey;
    const accounts = tokenManagerContext?.tokenAccounts?.value || [];
    const accountsSetterFn = tokenManagerContext?.tokenAccounts?.setterFn || (() => {});

    const transfer = useCallback(async () => {
        if(
            !publicKey ||
            !tokenMint ||
            !toAccount ||
            !fromAccount
        ) return;

        const toAccountPublicKey = new PublicKey(toAccount);

        const srcAccount = await getAssociatedTokenAddress(
            tokenMint,
            publicKey
        );

        const destAccount = await getAssociatedTokenAddress(
            tokenMint,
            toAccountPublicKey,
        );

        const transaction = new Transaction();
        const destTokenAccountInfo = await connection.getAccountInfo(destAccount);

        // if the account does not exits
        if(!destTokenAccountInfo) {
            transaction.add(
                createAssociatedTokenAccountInstruction(
                    publicKey,
                    destAccount,
                    toAccountPublicKey,
                    tokenMint
                )
            );

            // also add it to our accounts list
            accountsSetterFn((prev: PublicKey[]) => {
                if(
                    prev.findIndex(element => element.toBase58() === destAccount.toBase58()) === -1
                ) return [...prev, destAccount];

                return prev;
            });
        }

        transaction.add(
            createTransferInstruction(
                srcAccount,
                destAccount,
                publicKey,
                amount
            )
        );

        await sendTransaction(transaction, connection, {
                preflightCommitment: "confirmed"
            }
        );
    }, [accountsSetterFn, amount, connection, fromAccount, publicKey, sendTransaction, toAccount, tokenMint]);

    const createRandomDestinationAccount = useCallback(() => {
        setToAccount(Keypair.generate().publicKey.toBase58());
    }, []);

    const transferButtonDisabled = !fromAccount || !toAccount || !amount || (amount <= 0);

    return (
        <div className={styles.transferWrapper}>
            {/* from account selection */}
            <select value={fromAccount} onChange={(e) => setFromAccount(e.target.value)}>
                <option disabled value={''}>from</option>
                {
                    accounts.map((a, aIndex) => <option key={`from_account_option_${aIndex}`}>
                        {a.toBase58()}
                    </option>)
                }
            </select>

            {/* to account */}
            <div className={styles.toAccountInputWrapper}>
                <input
                    type="text"
                    value={toAccount}
                    placeholder="to account address"
                    className={styles.toAccountInput}
                    onChange={(e) => setToAccount(e.target.value)}
                />
                <button onClick={createRandomDestinationAccount}>
                    randomise
                </button>
            </div>

            {/* amount */}
            <input
                type="number"
                value={amount}
                placeholder="amount"
                onChange={(e) => setAmount(parseInt(e.target.value))}
            />

            {/* transfer button */}
            <button
                onClick={transfer}
                disabled={transferButtonDisabled}
                className={styles.transferButton}
            >
                transfer
            </button>
        </div>
    );
}