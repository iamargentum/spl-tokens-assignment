import { useState } from "react";
import styles from "./tokenAccountsSection.module.css";

export function TokenAccountsSection({}) {
    const [accounts, setAccounts] = useState([]);

    return (
        <div className={styles.tokenAccountsContainer}>
            <div className={styles.tokenAccountsTopBar}>
                <h3>token accounts</h3>
                <button>create new +</button>
            </div>

            <table className={styles.tokenAccountsTable}>
                <thead>
                    <tr className={styles.tokenAccountsTableHeading}>
                        <th className={styles.addressDataCell}>address</th>
                        <th className={styles.balanceDataCell}>
                            <span className={styles.balanceDataCellSpan}>
                                balance
                                <span className="material-symbols-outlined">
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
                            <tr key={`account_${aIndex}`}></tr>
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