import React from 'react';
import { META_MASTERIES } from '../data/champions';

export const MetaMasteries: React.FC = () => {
  return (
    <article className="glass-panel widget-panel-container" id="tactics">
      <h3 className="widget-main-title">
        <span>Meta Masteries</span>
        <svg className="widget-icon-vector" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
        </svg>
      </h3>
      
      <div className="mastery-traits-grid">
        {META_MASTERIES.map((synergy) => (
          <div key={synergy.id} className="mastery-trait-card">
            <div className={`trait-icon-wrapper ${synergy.tierClass}`}>
              <svg className="syn-icon" viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2zm0 4.38L18.8 18H5.2L12 6.38z"/>
              </svg>
            </div>
            <div className="trait-details-block">
              <span className="trait-name-bold">{synergy.name}</span>
              <span className="trait-tier-subtitle">{synergy.tierText}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};
