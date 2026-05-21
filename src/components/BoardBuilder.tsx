import React, { useState } from 'react';
import { CHAMPIONS_DATABASE, SYNERGY_THRESHOLDS } from '../data/champions';
import type { Champion, SynergyThreshold } from '../types';

export const BoardBuilder: React.FC = () => {
  const [activeUnits, setActiveUnits] = useState<string[]>([]);

  const toggleChampion = (id: string) => {
    if (activeUnits.includes(id)) {
      setActiveUnits(activeUnits.filter(uId => uId !== id));
    } else {
      if (activeUnits.length >= 5) {
        alert("Tactician! Your standard bench is full (Max 5 Units for this demo card!). Remove a unit to swap.");
        return;
      }
      setActiveUnits([...activeUnits, id]);
    }
  };

  const clearUnit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveUnits(activeUnits.filter(uId => uId !== id));
  };

  // 1. Calculate Active Board Lists
  const activeChamps = activeUnits.map(id => 
    CHAMPIONS_DATABASE.find(c => c.id === id)
  ).filter((c): c is Champion => !!c);

  // 2. Tally Trait counts live
  const traitTallies: Record<string, number> = {};
  activeChamps.forEach(champ => {
    traitTallies[champ.trait] = (traitTallies[champ.trait] || 0) + 1;
  });

  const activeTraits = Object.keys(traitTallies);

  return (
    <article className="glass-panel widget-panel-container board-builder-fullwidth" id="board-builder">
      <h3 className="widget-main-title">
        <span>Dynamic Strategy Board Builder</span>
        <svg className="widget-icon-vector" viewBox="0 0 24 24">
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-8h14V7H7v2z"/>
        </svg>
      </h3>
      <p className="builder-desc-para">
        Add units to your virtual field (Max 5 Units) to calculate your live synergies and active trait multipliers instantly!
      </p>
      
      {/* 1. Champion Grid Node Selector */}
      <div className="champs-selectors-grid">
        {CHAMPIONS_DATABASE.map(champ => {
          const isActive = activeUnits.includes(champ.id);
          const rarityColors = { 1: '#808080', 2: '#11b288', 3: '#207ac8', 4: '#c41a8a', 5: '#f4af11' };
          const borderStyle = {
            border: `2px solid ${rarityColors[champ.rarity] || '#808080'}`,
            color: rarityColors[champ.rarity]
          };

          return (
            <div 
              key={champ.id} 
              className={`champ-node-block ${isActive ? 'node-active' : ''}`}
              onClick={() => toggleChampion(champ.id)}
            >
              <div className="champ-mockup-circle" style={borderStyle}>
                {champ.name[0]}
              </div>
              <div className="champ-node-name-label">{champ.name}</div>
              <div className="champ-node-trait-label">{champ.trait}</div>
            </div>
          );
        })}
      </div>
      
      {/* 2. Live Calculated Synergy Displays */}
      <div className="builder-live-display-panel">
        
        {/* Synergies Panel */}
        <div className="live-synergies-column">
          <h4>Calculated Synergies</h4>
          <div className="live-synergies-list-wrapper">
            {activeTraits.length === 0 ? (
              <span className="live-synergies-empty-txt">
                No synergies active. Place champions to trigger synergies.
              </span>
            ) : (
              activeTraits.map(traitName => {
                const count = traitTallies[traitName];
                const thresholds = SYNERGY_THRESHOLDS[traitName] || [{ min: 1, text: 'Bronze', tier: 1 }];
                
                // Find highest active tier threshold
                let activeTier: SynergyThreshold | null = null;
                thresholds.forEach(tierDef => {
                  if (count >= tierDef.min) {
                    activeTier = tierDef;
                  }
                });

                return (
                  <div key={traitName} className="live-synergy-item-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong>{traitName}</strong>
                      <span>({count} Active)</span>
                    </div>
                    {activeTier ? (
                      <span className={`live-synergy-badge-tier badge-tier-${(activeTier as SynergyThreshold).tier}`}>
                        {(activeTier as SynergyThreshold).text} Tier
                      </span>
                    ) : (
                      <span className="live-synergy-badge-tier" style={{ background: '#333', color: '#777' }}>
                        Inactive ({count}/{thresholds[0].min})
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Bench Panel */}
        <div className="live-bench-column">
          <h4>Current Bench (Max 5)</h4>
          <div className="live-bench-units-wrapper">
            {activeChamps.length === 0 ? (
              <span className="live-bench-empty-txt">
                Select champions above to place them on board...
              </span>
            ) : (
              activeChamps.map(champ => (
                <div key={champ.id} className="live-bench-unit-tag">
                  <span>{champ.name}</span>
                  <span 
                    className="live-bench-unit-remove-btn" 
                    onClick={(e) => clearUnit(champ.id, e)}
                  >
                    ×
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        
      </div>
    </article>
  );
};
