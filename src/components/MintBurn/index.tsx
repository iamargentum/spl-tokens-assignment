import { BurnIcon } from "../../../public/burn";
import { MintIcon } from "../../../public/mint";
import styles from "./mintBurn.module.css";

export function MintBurn({}) {
    return (
        <div className={styles.mintBurnWrapper}>
            <select value={''}>
                <option disabled value={''}>select account</option>
            </select>

            <input type="number" placeholder="enter amount" />

            <div className={styles.mintBurnButtonWrapper}>
                <button className={styles.mintBurnButton}>
                    <span>
                        mint
                    </span>
                    <MintIcon />
                </button>
                <button className={styles.mintBurnButton}>
                    <span>
                        burn
                    </span>
                    <BurnIcon />
                </button>
            </div>
        </div>
    )
}