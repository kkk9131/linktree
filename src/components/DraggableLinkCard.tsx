import React from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { LinkCard } from './LinkCard';

interface Link {
    id: string;
    title: string;
    url: string;
}

interface Props {
    link: Link;
    onDelete: (id: string) => void;
}

export const DraggableLinkCard: React.FC<Props> = ({ link, onDelete }) => {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={link}
            id={link.id}
            dragListener={false}
            dragControls={dragControls}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileDrag={{ scale: 1.05, zIndex: 100 }}
            style={{ position: 'relative', marginBottom: '1rem' }}
        >
            <LinkCard
                id={link.id}
                title={link.title}
                url={link.url}
                onDelete={onDelete}
                dragControls={dragControls}
            />
        </Reorder.Item>
    );
};
