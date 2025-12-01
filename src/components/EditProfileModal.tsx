import React, { useState, useEffect } from 'react';
import styles from './EditProfileModal.module.css';

interface Profile {
    name: string;
    bio: string;
    image: string;
}

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: Profile;
    onSave: (profile: Profile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, profile, onSave }) => {
    const [name, setName] = useState(profile.name);
    const [bio, setBio] = useState(profile.bio);
    const [image, setImage] = useState(profile.image);

    useEffect(() => {
        if (isOpen) {
            setName(profile.name);
            setBio(profile.bio);
            setImage(profile.image);
        }
    }, [isOpen, profile]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, bio, image });
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.modal} glass`} onClick={e => e.stopPropagation()}>
                <h2 className={styles.heading}>Edit Profile</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className={styles.textarea}
                            rows={3}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="image">Avatar URL</label>
                        <input
                            type="url"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className={styles.input}
                            placeholder="https://..."
                        />
                    </div>
                    <div className={styles.actions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
