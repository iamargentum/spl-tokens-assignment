import styles from "./transfer.module.css";

export function Transfer() {
    return (
        <div className={styles.transferWrapper}>
            {/* from account selection */}
            <select value={''}>
                <option disabled value={''}>select account</option>
            </select>

            {/* to account */}
            <input type="text" placeholder="to account address" />

            {/* transfer button */}
            <button className={styles.transferButton}>transfer</button>
        </div>
    );
}