import React, { useState } from 'react';
import styles from './AddLinkModal.module.css';

interface AddLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (title: string, url: string) => void;
}

export const AddLinkModal: React.FC<AddLinkModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && url) {
            onAdd(title, url);
            setTitle('');
            setUrl('');
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.modal} glass`} onClick={e => e.stopPropagation()}>
                <h2 className={styles.heading}>Add New Link</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. My Twitter"
                            className={styles.input}
                            autoFocus
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="url">URL</label>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://twitter.com/..."
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.actions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitButton} disabled={!title || !url}>
                            Add Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
