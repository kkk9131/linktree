'use client';

import React from 'react';
import styles from './page.module.css';
import { Carousel } from '@/components/Carousel';
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
  // 固定データ: 誰が見ても同じプロフィールとリンクが表示される
  const profile: Profile = {
    name: 'kazuto@solopreneur',
    bio: 'Build in Public!!',
    // リポジトリ内の固定画像（project pageでも相対パスで解決）
    image: 'profile.jpg'
  };

  const links: Link[] = [
    { id: '1', title: 'Twitter / X', url: 'https://twitter.com' },
    { id: '2', title: 'GitHub', url: 'https://github.com' },
    { id: '3', title: 'Instagram', url: 'https://instagram.com' },
  ];

  return (
    <div className="container">
      <Background />

      <main className={styles.main}>
        {/* Profile Section */}
        <div className={`${styles.profile} glass animate-fade-in`}>
          <div className={styles.avatarWrapper}>
            <img src={profile.image} alt="Profile" className={styles.avatar} />
          </div>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.bio}>{profile.bio}</p>
        </div>

        {/* Links Section (Carousel) */}
        <div className={styles.carouselWrapper}>
          <Carousel links={links} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Powered by Next.js</p>
      </footer>
    </div>
  );
}
