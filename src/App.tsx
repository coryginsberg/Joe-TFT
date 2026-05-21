import React from 'react';
import { Header } from './components/Header';
import { ProfileCard } from './components/ProfileCard';
import { MatchHistory } from './components/MatchHistory';
import { MetaMasteries } from './components/MetaMasteries';
import { LoreBiography } from './components/LoreBiography';
import { Footer } from './components/Footer';
import './App.css';

export const App: React.FC = () => {
  return (
    <>
      {/* Dynamic Header Navbar */}
      <Header />
      
      {/* Grid Dashboard Layout */}
      <main className="main-content-layout">
        
        {/* Profile Sidebar */}
        <ProfileCard />
        
        {/* Main Dashboard Widget Panels Column */}
        <section className="dashboard-layout-grid">
          
          <div className="dashboard-subgrid-panels">
            {/* Match History Widget */}
            <MatchHistory />
            
            {/* Active Meta Masteries Badge grid */}
            <MetaMasteries />
          </div>
          
          {/* Gamer Bio Description & Quotes Cycler */}
          <LoreBiography />
          
        </section>
      </main>
      
      {/* Brand Footer copyright */}
      <Footer />
    </>
  );
};

export default App;
