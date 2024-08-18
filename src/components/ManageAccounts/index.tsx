import styles from "./manageAccounts.module.css";
import { TokenAccountsSection } from "./TokenAccountsSection";
import { DelegateTokensSection } from "./DelegateTokensSection";

export function ManageAccounts({}) {
    const accounts = [{}];

    return (
        <div className={styles.manageAccountsWrapper}>
            <TokenAccountsSection />
            <hr />
            <DelegateTokensSection />
        </div>
    )
}