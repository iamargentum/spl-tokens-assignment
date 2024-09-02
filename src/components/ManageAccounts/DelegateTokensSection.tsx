import { getShortenedString } from "@/utils/common";
import styles from "./delegateTokensSection.module.css";

export function DelegateTokensSection({}) {
    const delegatedTokens: Array<{address: string, delegatedAmount: number}> = [];

    return (
        <div>
            <div>
                <h3>delegate tokens</h3>
            </div>

            <div>
                <table className={styles.delegateTokensTable}>
                    <thead>
                        <tr className={styles.delegateTokensTableHeadingRow}>
                            <th className={styles.delegateTokensTableHeadingAddress}>address</th>
                            <th className={styles.delegateTokensTableHeadingAmount}>amount</th>
                            <th className={styles.delegateTokensTableHeadingAction}>action</th>
                        </tr>
                    </thead>
                    <tbody className={styles.delegateTokensDataBody}>
                        {
                            delegatedTokens.map((t, tIndex) => (
                                <tr key={`token_account_${tIndex}`} className={styles.delegateTokensDataRow}>
                                    {/* account */}
                                    <td className={styles.delegateTokensDataRowAddress}>
                                        {
                                            getShortenedString(t.address)
                                        }
                                    </td>
                                    {/* amount */}
                                    <td className={styles.delegateTokensDataRowAmount}>
                                        {
                                            t.delegatedAmount
                                        }
                                    </td>
                                    {/* action */}
                                    <td className={styles.delegateTokensDataRowAction}>
                                        <button>revoke</button>
                                    </td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td>
                                <input placeholder="account (public key)" />
                            </td>
                            <td>
                                <input placeholder="amount" />
                            </td>
                            <td className={styles.delegateTokensDataRowAction}>
                                <button>delegate</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
