import styles from "./styles.module.css";

export function Connect() {
    return (
        <div className={styles.connectWalletOverlay}>
            <button className={styles.connectWalletButton}>
                connect wallet
            </button>
        </div>
    )
}
