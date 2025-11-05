import React from "react";
import pkg from '../../../package.json';

export const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem' }}>Cantina App v{pkg.version}</footer>
  );
};
