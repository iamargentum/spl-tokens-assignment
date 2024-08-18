"use client"

import { useState } from "react";
import styles from "./page.module.css";
import { ACTION_TABS } from "@/constants";
import { Transfer } from "@/components/Transfer";
import { MintBurn } from "@/components/MintBurn";
import { ManageAccounts } from "@/components/ManageAccounts";

export default function Home() {

  const [selectedTab, setSelectedTab] = useState(ACTION_TABS.manage_accounts);

  let actionComponent;

  switch(selectedTab) {
    case ACTION_TABS.manage_accounts:
      actionComponent = <ManageAccounts />;
      break;
    case ACTION_TABS.mint_burn:
      actionComponent = <MintBurn />;
      break;
    case ACTION_TABS.transfer:
      actionComponent = <Transfer />;
      break;
    default:
      actionComponent = <></>;
  }

  const wallets = [{}];

  return (
    <div>
      {/* top bar */}
      <div>
        <div>wallet address</div>
        <div>balance</div>
      </div>
      {/* main content */}
      <div>
        {
          // overlay
          wallets.length > 0 && <div></div>
        }
        {/* actual content */}
        <div>
          <div>
            <button onClick={() => setSelectedTab(ACTION_TABS.manage_accounts)}>
              manage accounts
            </button>
            <button onClick={() => setSelectedTab(ACTION_TABS.mint_burn)}>
              mint/burn
            </button>
            <button onClick={() => setSelectedTab(ACTION_TABS.transfer)}>
              transfer
            </button>
          </div>
          {actionComponent}
        </div>
      </div>
    </div>
  );
}
