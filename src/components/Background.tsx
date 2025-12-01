import React from 'react';
import styles from './Background.module.css';

export const Background: React.FC = () => {
    return (
        <div className={styles.background}>
            <div className={styles.grid} />
            <div className={styles.orbs}>
                <div className={`${styles.orb} ${styles.orb1}`} />
                <div className={`${styles.orb} ${styles.orb2}`} />
                <div className={`${styles.orb} ${styles.orb3}`} />
            </div>
            <div className={styles.overlay} />
        </div>
    );
};
