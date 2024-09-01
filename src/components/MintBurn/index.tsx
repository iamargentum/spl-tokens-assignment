import { useCallback, useContext, useState } from "react";
import { BurnIcon } from "../../../public/burn";
import { MintIcon } from "../../../public/mint";
import styles from "./mintBurn.module.css";
import { TokenManagerContext } from "../TokenManager";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { createMintToCheckedInstruction } from "@solana/spl-token";

export function MintBurn({}) {
    const [tokensToMint, setTokensToMint] = useState(0);
    const [selectedAccount, setSelectedAccount] = useState('');

    const { connection } = useConnection();
    const { wallet, sendTransaction } = useWallet();
    const publicKey = wallet?.adapter?.publicKey;

    const tokenManagerContext = useContext(TokenManagerContext);

    const tokenMint = tokenManagerContext?.token?.publicKey;
    const accounts = tokenManagerContext?.tokenAccounts?.value;

    const mint = useCallback(async () => {
        if(!tokenMint || !selectedAccount || !publicKey) return;

        const transaction = new Transaction().add(
            createMintToCheckedInstruction(
                tokenMint,
                new PublicKey(selectedAccount),
                publicKey,
                BigInt(tokensToMint),
                9
            )
        );

        await sendTransaction(transaction, connection, {
            preflightCommitment: "confirmed"
        });
    }, [connection, publicKey, selectedAccount, sendTransaction, tokenMint, tokensToMint]);

    return (
        <div className={styles.mintBurnWrapper}>
            <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
                <option disabled value={''}>select account</option>
                {
                    !!accounts && accounts.map((a, aIndex) => <option key={`account_option_${aIndex}`}>
                        {a.toBase58()}
                    </option>)
                }
            </select>

            <input
                type="number"
                value={tokensToMint}
                placeholder="enter amount"
                onChange={
                    (e) => setTokensToMint(parseInt(e.target.value))
                }
            />

            <div className={styles.mintBurnButtonWrapper}>
                <button className={styles.mintBurnButton} onClick={mint}>
                    <span>
                        mint
                    </span>
                    <MintIcon />
                </button>
                <button className={styles.mintBurnButton}>
                    <span>
                        burn
                    </span>
                    <BurnIcon />
                </button>
            </div>
        </div>
    )
}