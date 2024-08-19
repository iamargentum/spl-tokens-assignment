"use client"

import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ACTION_TABS } from "@/constants";
import { Transfer } from "@/components/Transfer";
import { MintBurn } from "@/components/MintBurn";
import { Connect } from "@/components/Wallet/Connect";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ManageAccounts } from "@/components/ManageAccounts";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

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
      <TopBar />
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
      { !wallet && <Connect /> }
    </div>
  );
}

function TopBar() {
  const [walletBalance, setWalletBalance] = useState(-1);

  const { wallet } = useWallet();

  const { connection } = useConnection();

  const publicKey = wallet?.adapter?.publicKey;
  const walletPublicAddress = publicKey?.toBase58();
  const shortenedPublicAddress = 
    walletPublicAddress?.substring(0, 5) +
    "..." +
    walletPublicAddress?.substring(
      walletPublicAddress.length - 5, walletPublicAddress.length
    );
  
  const fetchBalance = useCallback(() => {
    if(!publicKey) return;

    connection.getBalance(publicKey)
    .then(res => setWalletBalance(res))
    .catch(err => console.error("error occurred while fetching balance - ", err));
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [])

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarText}>
        {shortenedPublicAddress}
        <span className={`material-symbols-outlined ${styles.topBarIconButton}`} onClick={() => navigator.clipboard.writeText(walletPublicAddress || "")}>
          content_copy
        </span>
        <span className={`material-symbols-outlined ${styles.topBarIconButton}`} onClick={() => wallet?.adapter?.disconnect()}>
          close
        </span>
      </div>
      <div className={styles.topBarText}>
        {
          walletBalance === -1 ? 'loading balance' : `${walletBalance/LAMPORTS_PER_SOL} sols`
        }
      </div>
    </div>
  )
}