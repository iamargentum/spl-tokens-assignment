"use client"

import styles from "./page.module.css";
import { Wallet } from "@/components/Wallet";
import { TokenManager } from "@/components/TokenManager";
import { useEffect, useState } from "react";

export default function Home() {

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <h1 className={styles.pageTitle}>spl tokens assignment</h1>
      {
        hydrated ? <Wallet>
          <TokenManager />
        </Wallet> : <h2 style={{ textAlign: "center" }}>Loading...</h2>
      }
    </>
  );
}
