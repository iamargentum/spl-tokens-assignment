"use client"

import { useState } from "react";
import styles from "./styles.module.css";
import { ACTION_TABS } from "@/constants";
import { Transfer } from "@/components/Transfer";
import { MintBurn } from "@/components/MintBurn";
import { Connect } from "@/components/Wallet/Connect";
import { useWallet } from "@solana/wallet-adapter-react";
import { ManageAccounts } from "@/components/ManageAccounts";

export function TokenManager() {

    const [selectedTab, setSelectedTab] = useState(ACTION_TABS.manage_accounts);
  
    const { wallet } = useWallet();
  
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
  
    console.log("wallet is ", wallet);
  
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
            !!wallet ? <></> : <Connect />
        }
      </div>
    );
  }