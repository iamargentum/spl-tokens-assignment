import "./walletConnectionButton.css";
import styles from "./styles.module.css";
import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function Connect() {
    return (
        <div className={styles.connectWalletOverlay}>
            <BaseWalletMultiButton
                labels={{
                    connecting: "connecting...",
                    disconnect: "disconnect",
                    copied: "copied",
                    "copy-address": "copy address",
                    "change-wallet": "change wallet",
                    "has-wallet": "connect",
                    "no-wallet": "connect wallet"
                }}
            />
        </div>
    )
}
