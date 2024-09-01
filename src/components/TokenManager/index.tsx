"use client"

import styles from "./styles.module.css";
import { ACTION_TABS } from "@/constants";
import { Transfer } from "@/components/Transfer";
import { MintBurn } from "@/components/MintBurn";
import { Connect } from "@/components/Wallet/Connect";
import { ManageAccounts } from "@/components/ManageAccounts";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createContext, useCallback, useEffect, useState } from "react";
import { TokenCreator } from "./Create";

type TokenManagerContext = {
  tokenAccounts: {
    value: PublicKey[],
    setterFn: Function
  },
  token: Keypair | undefined
};

export const TokenManagerContext = createContext<TokenManagerContext | null>(null);

export function TokenManager() {

  const { connection } = useConnection();

  const [token, setToken] = useState<Keypair | undefined>();
  const [tokenAccounts, setTokenAccounts] = useState<PublicKey[]>([]);
  const [selectedTab, setSelectedTab] = useState(ACTION_TABS.manage_accounts);

  const { wallet } = useWallet();
  const publicKey = wallet?.adapter?.publicKey;

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

  return (
    <div className={styles.container}>
      {/* top bar */}
      <TopBar />
      {/* main content */}
      <TokenManagerContext.Provider value={{
        tokenAccounts: {
          value: tokenAccounts,
          setterFn: setTokenAccounts
        },
        token: token
      }}>
        <div className={styles.mainContent}>
          { !token ?
            // token creation form
            <TokenCreator setToken={setToken} /> :
            // actual content
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
          }
        </div>
      </TokenManagerContext.Provider>

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
  }, [connection, publicKey]);

  useEffect(() => {
    fetchBalance();
  });

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