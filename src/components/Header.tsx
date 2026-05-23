import React from 'react';
import { CrestLogo } from './CrestLogo';

export const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="logo-container">
        <CrestLogo />
        <h1 className="site-main-title">Joe TFT</h1>
      </div>
      <nav>
        <ul className="nav-links-list">
          <li><a href="#stats">Stats</a></li>
          <li><a href="#tactics">Tactics</a></li>
          <li><a href="#lore">Lore</a></li>
        </ul>
      </nav>
    </header>
  );
};
