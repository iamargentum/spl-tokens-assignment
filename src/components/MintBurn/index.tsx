import styles from "./mintBurn.module.css";

export function MintBurn({}) {
    return (
        <div className={styles.mintBurnWrapper}>
            <select value={''}>
                <option disabled value={''}>select account</option>
            </select>

            <input type="number" placeholder="enter amount" />

            <div className={styles.mintBurnButtonWrapper}>
                <button className={styles.mintBurnButton}>mint</button>
                <button className={styles.mintBurnButton}>burn</button>
            </div>
        </div>
    )
}