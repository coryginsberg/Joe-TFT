import React from 'react';
import { RECENT_MATCHES } from '../data/champions';

export const MatchHistory: React.FC = () => {
  return (
    <article className="glass-panel widget-panel-container" id="stats">
      <h3 className="widget-main-title">
        <span>Recent Placements</span>
        <svg className="widget-icon-vector" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0 4H7v-2h10v2zm0-8H7V7h10v2z"/>
        </svg>
      </h3>
      
      <div className="matches-history-wrapper">
        {RECENT_MATCHES.map((match) => {
          // Determine the correct style classes for placements
          let placementClass = 'round-placement-num placement-normal';
          if (match.placement === 1) {
            placementClass = 'round-placement-num placement-gold';
          } else if (match.placement === 2) {
            placementClass = 'round-placement-num placement-silver';
          }

          return (
            <div key={match.id} className="match-history-row">
              <div className="placement-badge-layout">
                <span className={placementClass}>
                  {match.placement === 1 ? '1st' : match.placement === 2 ? '2nd' : `${match.placement}th`}
                </span>
                <div className="match-meta-block">
                  <span className="match-comp-text">{match.comp}</span>
                  <span className="match-date-text">{match.date}</span>
                </div>
              </div>
              <span className="match-chip-badge">{match.badge}</span>
            </div>
          );
        })}
      </div>
    </article>
  );
};
