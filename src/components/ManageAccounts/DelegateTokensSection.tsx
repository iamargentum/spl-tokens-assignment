export function DelegateTokensSection({}) {
    const delegatedTokens = [{}];

    return (
        <div>
            <div>
                <p>delegate tokens</p>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>address</th>
                            <th>amount</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            delegatedTokens.map((t, tIndex) => (
                                <tr key={`token_account_${tIndex}`}>
                                    {/* account */}
                                    {/* amount */}
                                    {/* action */}
                                    <td>
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
                            <td>
                                <button>delegate</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
