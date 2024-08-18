import { DelegateTokensSection } from "./DelegateTokensSection";
import { TokenAccountsSection } from "./TokenAccountsSection";

export function ManageAccounts({}) {
    const accounts = [{}];

    return (
        <div>
            <TokenAccountsSection />
            <hr />
            <DelegateTokensSection />
        </div>
    )
}