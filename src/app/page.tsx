'use client';

import React, { useState, useEffect } from 'react';
import { Reorder, AnimatePresence } from 'framer-motion';
import { Pencil, Plus } from 'lucide-react';
import styles from './page.module.css';
import { DraggableLinkCard } from '@/components/DraggableLinkCard';
import { Carousel } from '@/components/Carousel';
import { AddLinkModal } from '@/components/AddLinkModal';
import { EditProfileModal } from '@/components/EditProfileModal';
import { Background } from '@/components/Background';

interface Link {
  id: string;
  title: string;
  url: string;
}

interface Profile {
  name: string;
  bio: string;
  image: string;
}

export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Profile state (persisted too)
  const [profile, setProfile] = useState<Profile>({
    name: 'Your Name',
    bio: 'Digital Creator | Tech Enthusiast',
    image: '/profile.jpg' // Updated to local image
  });

  useEffect(() => {
    setMounted(true);
    const savedLinks = localStorage.getItem('my-links');
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    } else {
      // Default links for demo
      setLinks([
        { id: '1', title: 'Twitter / X', url: 'https://twitter.com' },
        { id: '2', title: 'GitHub', url: 'https://github.com' },
        { id: '3', title: 'Instagram', url: 'https://instagram.com' },
      ]);
    }

    const savedProfile = localStorage.getItem('my-profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      // Migration: Update old default avatar to new local image
      if (parsed.image.includes('dicebear')) {
        parsed.image = '/profile.jpg';
      }
      setProfile(parsed);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('my-links', JSON.stringify(links));
    }
  }, [links, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('my-profile', JSON.stringify(profile));
    }
  }, [profile, mounted]);

  const handleAddLink = (title: string, url: string) => {
    const newLink = {
      id: Date.now().toString(),
      title,
      url: url.startsWith('http') ? url : `https://${url}`
    };
    setLinks([...links, newLink]);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleUpdateProfile = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="container">
      <Background />

      <main className={styles.main}>
        {/* Profile Section */}
        <div className={`${styles.profile} glass animate-fade-in`}>
          <button
            className={styles.editProfileButton}
            onClick={() => setIsProfileModalOpen(true)}
            aria-label="Edit Profile"
          >
            <Pencil size={18} />
          </button>
          <div className={styles.avatarWrapper}>
            <img src={profile.image} alt="Profile" className={styles.avatar} />
          </div>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.bio}>{profile.bio}</p>
        </div>

        {/* Links Section (Carousel) */}
        <div className={styles.carouselWrapper}>
          <Carousel links={links} onDelete={handleDeleteLink} />
        </div>

        {/* Add Button */}
        <button
          className={`${styles.addButton} glass`}
          onClick={() => setIsModalOpen(true)}
          aria-label="Add Link"
        >
          <Plus size={32} />
        </button>

        <AddLinkModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddLink}
        />

        <EditProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          profile={profile}
          onSave={handleUpdateProfile}
        />
      </main>

      <footer className={styles.footer}>
        <p>Powered by Next.js</p>
      </footer>
    </div>
  );
}
