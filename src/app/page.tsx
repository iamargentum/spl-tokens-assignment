"use client"

import { useState } from "react";
import styles from "./page.module.css";
import { ACTION_TABS } from "@/constants";
import { Transfer } from "@/components/Transfer";
import { MintBurn } from "@/components/MintBurn";
import { ManageAccounts } from "@/components/ManageAccounts";
import { Connect } from "@/components/Wallet/Connect";

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

  const wallets = [];

  return (
    <div className={styles.container}>
      {/* top bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarText}>wallet address</div>
        <div className={styles.topBarText}>balance</div>
      </div>
      {/* main content */}
      <div className={styles.mainContent}>
        {/* actual content */}
        <div className={styles.actionsWrapper}>
          <div  className={styles.tabSelectorWrapper}>
            <div
              className={
                selectedTab === ACTION_TABS.manage_accounts ?
                styles.tabButtonSelected :
                styles.tabButton
              }
              onClick={
                () => setSelectedTab(ACTION_TABS.manage_accounts)
              }
            >
              manage accounts
            </div>
            <div
              className={
                selectedTab === ACTION_TABS.mint_burn ?
                styles.tabButtonSelected :
                styles.tabButton
              }
              onClick={
                () => setSelectedTab(ACTION_TABS.mint_burn)
              }
            >
              mint/burn
            </div>
            <div
              className={
                selectedTab === ACTION_TABS.transfer ?
                styles.tabButtonSelected :
                styles.tabButton
              }
              onClick={
                () => setSelectedTab(ACTION_TABS.transfer)
              }
            >
              transfer
            </div>
          </div>
          <div className={styles.actionComponentsWrapper}>
            {actionComponent}
          </div>
        </div>
      </div>

      {/* connect wallet overlay */}
      {
          // wallets.length <= 0 && <Connect />
      }
    </div>
  );
}
