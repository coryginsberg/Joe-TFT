import React, { useState, useEffect } from 'react';
import { LORE_QUOTES } from '../data/champions';

export const LoreBiography: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      // 1. Trigger Fade Out
      setOpacity(0);

      // 2. Load next quote and Trigger Fade In after fade transition is complete
      setTimeout(() => {
        setQuoteIndex((prevIndex) => (prevIndex + 1) % LORE_QUOTES.length);
        setOpacity(1);
      }, 400); // matches the CSS transition delay

    }, 5000); // shift quote every 5 seconds

    return () => clearInterval(quoteInterval);
  }, []);

  const currentQuote = LORE_QUOTES[quoteIndex];

  return (
    <article className="glass-panel widget-panel-container board-builder-fullwidth" id="lore">
      <h3 className="widget-main-title">
        <span>Tactician Biography</span>
        <svg className="widget-icon-vector" viewBox="0 0 24 24">
          <path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
        </svg>
      </h3>
      
      <p className="lore-bio-text-para">
        Hailing from the elite Challenger lobby networks of Teamfight Tactics, <strong>Joseph McCarthy</strong> (known to all as <strong>Joe TFT</strong>) represents the pinnacle of tactical flexibility and item math perfection. Whether rolling down to 0 gold on a prayer at Stage 4-1 or orchestrating highly precise board transformations, his tactician choices have shaped the meta.
      </p>
      
      {/* Declarative Quote Rotation Box with transition states */}
      <div className="lore-quote-box">
        <p 
          className="lore-quote-text" 
          style={{ opacity: opacity }}
        >
          {currentQuote.text}
        </p>
        <span 
          className="lore-quote-author" 
          style={{ opacity: opacity }}
        >
          — {currentQuote.author}
        </span>
      </div>
    </article>
  );
};
