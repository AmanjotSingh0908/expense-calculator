import styles from "@/styles/Loader.module.css";

export const BeatLoader = () => {
    return (
        <div className={styles.main}>
            <div className={styles.round1}></div>
            <div className={styles.round2}></div>
            <div className={styles.round3}></div>
        </div>
    );
};
