import React from "react";
import { FaGithub } from 'react-icons/fa';
import { FaMastodon } from 'react-icons/fa';
import { FaBluesky } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import pkg from '../../../package.json';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ textAlign: 'center', padding: '1rem' }}>
      <div className='flex flex-row h-2/12 w-full justify-center gap-1'>
        <div className='h-full'>© {currentYear} Cantina App v{pkg.version}</div>
        <div className='h-full'>
          <a
            href='https://github.com/JGEsteves89/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-700 hover:text-blue-600'
            aria-label='Visit JGEsteves GitHub profile'
          >
            JGEsteves
          </a>
        </div>
        <div className='flex flex-row h-full'>
          <a href='https://github.com/JGEsteves89/'><FaGithub color='purple' size={20} /></a>
          <a href='https://bsky.app/profile/jgesteves.bsky.social'><FaBluesky color='orange' size={20} /></a>
          <a href='https://mastodon.social/@jgesteves'><FaMastodon color='green' size={20} /></a>
          <a href='https://x.com/jgesteves89'><FaXTwitter color='red' size={20} /></a>
        </div>
      </div>
    </footer>
  );
};
