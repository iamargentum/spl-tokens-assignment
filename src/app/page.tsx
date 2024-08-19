"use client"

import styles from "./page.module.css";
import { Wallet } from "@/components/Wallet";
import { TokenManager } from "@/components/TokenManager";

export default function Home() {
  return (
    <>
      <h1 className={styles.pageTitle}>spl tokens assignment</h1>
      <Wallet>
        <TokenManager />
      </Wallet>
    </>
  );
}
