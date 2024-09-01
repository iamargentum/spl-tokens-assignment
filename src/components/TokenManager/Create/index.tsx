import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import styles from "./styles.module.css";
import { createInitializeMintInstruction, createMint, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useCallback, useState } from "react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export function TokenCreator({ setToken }: {setToken: Function}) {
    const [decimals, setDecimals] = useState<number>();

    const { connection } = useConnection();

    const { wallet, sendTransaction } = useWallet();

    console.log("wallet from create token thingy is ", wallet);
    

    const publicKey = wallet?.adapter?.publicKey;

    const createToken = useCallback(async () => {
        if(!publicKey) return;

        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const accountKeyPair = Keypair.generate();
        const programId = TOKEN_PROGRAM_ID;

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: publicKey,
                newAccountPubkey: accountKeyPair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId
            }),
            createInitializeMintInstruction(
                accountKeyPair.publicKey,
                decimals || 9,
                publicKey,
                publicKey
            )
        );

        await sendTransaction(transaction, connection, {
            signers: [accountKeyPair],
            preflightCommitment: "confirmed"
        });

        setToken(accountKeyPair);
    }, [connection, decimals, publicKey, setToken]);

    return (
        <div className={styles.createTokenOverlay}>
            <input
                type="number"
                value={decimals}
                placeholder="decimals (default 9)"
                onChange={(e) => setDecimals(parseInt(e.target.value))}
            />
            <button onClick={createToken}>create token</button>
        </div>
    )
}
