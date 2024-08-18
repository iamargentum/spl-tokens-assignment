export function TokenAccountsSection({}) {
    const accounts = [{}];
    return (
        <div>
            <div>
                <p>token accounts</p>
                <button>create new +</button>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>address</th>
                            <th>balance</th>
                            <th>
                                <button>refresh</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accounts.map((a, aIndex) => (
                                <tr key={`account_${aIndex}`}></tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}