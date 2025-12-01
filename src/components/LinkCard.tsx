import React from 'react';
import { DragControls } from 'framer-motion';
import { GripVertical, X } from 'lucide-react';
import styles from './LinkCard.module.css';

interface LinkCardProps {
  id: string;
  title: string;
  url: string;
  onDelete?: (id: string) => void;
  dragControls?: DragControls;
}

export const LinkCard: React.FC<LinkCardProps> = ({ id, title, url, onDelete, dragControls }) => {
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${url}&sz=128`;
  // Using WordPress mshots as a more reliable free alternative for screenshots
  // Requesting a vertical aspect ratio
  const previewUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=400&h=800`;

  return (
    <div className={styles.cardWrapper}>
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.card}>
        {/* Preview Background */}
        <div className={styles.previewBg}>
          <img src={previewUrl} alt="Preview" className={styles.previewImage} />
          <div className={styles.previewOverlay} />
        </div>

        <div
          className={styles.dragHandle}
          onPointerDown={(e) => dragControls?.start(e)}
          style={{ touchAction: 'none' }}
        >
          <GripVertical size={20} color="rgba(255,255,255,0.2)" />
        </div>
        <div className={styles.iconWrapper}>
          <img src={faviconUrl} alt={`${title} icon`} className={styles.icon} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.url}>{url.replace(/^https?:\/\//, '')}</p>
        </div>
        {onDelete && (
          <button
            className={styles.deleteButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(id);
            }}
          >
            <X size={18} />
          </button>
        )}
      </a>
    </div>
  );
};
