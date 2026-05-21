/* ==========================================
   🧠 INTERACTIVE ENGINE - JOE TFT WEBSITE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initQuotes();
    initBoardBuilder();
});

/* ------------------------------------------
   💬 ANIMATED QUOTE CAROUSEL
   ------------------------------------------ */
function initQuotes() {
    const quotes = [
        { text: "Me Corki Riven", author: "Joe TFT" },
        { text: "It's not a first or eighth, it's about sending a message.", author: "Joseph Teamfight" },
        { text: "Tony you're greifing all of us!", author: "Trey" },
        { text: "Please don't send me 8th again. I have 20 LP left.", author: "Patricia Patcat" },
        { text: "He is THE Joe TFT. Everyone else is just playing for 2nd.", author: "Slayer Synergy Fan" }
    ];

    const quoteTextEl = document.getElementById('quote-text');
    const quoteAuthorEl = document.getElementById('quote-author');

    if (!quoteTextEl || !quoteAuthorEl) return;

    let currentIndex = 0;

    function rotateQuote() {
        // Smooth Fade Out
        quoteTextEl.style.opacity = 0;
        quoteAuthorEl.style.opacity = 0;

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % quotes.length;
            const nextQuote = quotes[currentIndex];

            quoteTextEl.textContent = nextQuote.text;
            quoteAuthorEl.textContent = `— ${nextQuote.author}`;

            // Smooth Fade In
            quoteTextEl.style.opacity = 1;
            quoteAuthorEl.style.opacity = 1;
        }, 400); // matches fade transition duration
    }

    // Set styling support for transitions
    quoteTextEl.style.transition = 'opacity 0.4s ease';
    quoteAuthorEl.style.transition = 'opacity 0.4s ease';

    // Cycle every 5 seconds
    setInterval(rotateQuote, 5000);
}



/* ------------------------------------------
   ⚔️ DYNAMIC SYNERGY BOARD BUILDER
   ------------------------------------------ */
function initBoardBuilder() {
    // Mock Database of active Champions in Set 12
    const champions = [
        { id: 'zoe', name: 'Zoe', trait: 'Portal', rarity: 1, avatar: 'fonts/Antipasto/AntipastoPro-Bold_trial.ttf' },
        { id: 'hecarim', name: 'Hecarim', trait: 'Bastion', rarity: 3, avatar: '' },
        { id: 'ahri', name: 'Ahri', trait: 'Arcana', rarity: 2, avatar: '' },
        { id: 'rumble', name: 'Rumble', trait: 'Vanguard', rarity: 2, avatar: '' },
        { id: 'milio', name: 'Milio', rarity: 5, trait: 'Faerie', avatar: '' },
        { id: 'norra', name: 'Norra & Yuumi', trait: 'Portal', rarity: 5, avatar: '' },
        { id: 'diana', name: 'Diana', trait: 'Bastion', rarity: 5, avatar: '' },
        { id: 'ryze', name: 'Ryze', trait: 'Portal', rarity: 4, avatar: '' }
    ];

    const champSelectorEl = document.getElementById('champ-selector');
    const liveSynListEl = document.getElementById('live-syn-list');
    const liveBoardNodesEl = document.getElementById('live-board-nodes');

    if (!champSelectorEl || !liveSynListEl || !liveBoardNodesEl) return;

    let activeBoardIds = new Set();

    // Generate the clickable HTML Grid Nodes
    champions.forEach(champ => {
        const node = document.createElement('div');
        node.className = 'champ-node';
        node.dataset.id = champ.id;

        // Custom avatar frame using inline color indicator by rarity
        const rarityColors = { 1: '#808080', 2: '#11b288', 3: '#207ac8', 4: '#c41a8a', 5: '#f4af11' };
        const borderStyle = `border: 2px solid ${rarityColors[champ.rarity] || '#808080'}`;

        // Inline mockup icon placeholder (TFT Emblem letters)
        node.innerHTML = `
            <div class="champ-avatar-mock" style="${borderStyle}; width:50px; height:50px; border-radius:50%; background: #1e1a38; display:flex; justify-content:center; align-items:center; font-weight:800; color:${rarityColors[champ.rarity]}; font-size:1.1rem; margin-bottom: 8px;">
                ${champ.name[0]}
            </div>
            <div class="champ-node-name">${champ.name}</div>
            <div class="champ-node-trait">${champ.trait}</div>
        `;

        node.addEventListener('click', () => toggleChampion(champ.id, node));
        champSelectorEl.appendChild(node);
    });

    function toggleChampion(id, element) {
        if (activeBoardIds.has(id)) {
            activeBoardIds.delete(id);
            element.classList.remove('active');
        } else {
            // Team limit of 5 units for simplicity
            if (activeBoardIds.size >= 5) {
                alert("Tactician! Your standard bench is full (Max 5 Units for this demo card!). Remove a unit to swap.");
                return;
            }
            activeBoardIds.add(id);
            element.classList.add('active');
        }
        updateBoardDisplay();
    }

    function updateBoardDisplay() {
        // 1. Update Active Board List Representation
        liveBoardNodesEl.innerHTML = '';
        if (activeBoardIds.size === 0) {
            liveBoardNodesEl.innerHTML = '<span class="live-board-empty">Select champions above to place them on board...</span>';
        } else {
            activeBoardIds.forEach(id => {
                const champ = champions.find(c => c.id === id);
                const unitTag = document.createElement('div');
                unitTag.className = 'live-board-unit';
                unitTag.innerHTML = `
                    <span>${champ.name}</span>
                    <span class="live-board-unit-remove" data-id="${id}">×</span>
                `;
                unitTag.querySelector('.live-board-unit-remove').addEventListener('click', (e) => {
                    e.stopPropagation();
                    const node = document.querySelector(`.champ-node[data-id="${id}"]`);
                    toggleChampion(id, node);
                });
                liveBoardNodesEl.appendChild(unitTag);
            });
        }

        // 2. Calculate Active Traits (Synergies)
        const traitCounts = {};
        activeBoardIds.forEach(id => {
            const champ = champions.find(c => c.id === id);
            traitCounts[champ.trait] = (traitCounts[champ.trait] || 0) + 1;
        });

        // 3. Render Synergies and determine active tier badges
        liveSynListEl.innerHTML = '';
        const activeTraits = Object.keys(traitCounts);

        if (activeTraits.length === 0) {
            liveSynListEl.innerHTML = '<span class="live-syn-placeholder">No synergies active. Place champions to trigger synergies.</span>';
            return;
        }

        // Setup thresholds: Portal (3/6/9), Bastion (2/4/6), Arcana (2/3/5), Vanguard (2/4), Faerie (3/5)
        const thresholds = {
            'Portal': [{ min: 1, text: 'Bronze', tier: 1 }, { min: 2, text: 'Silver', tier: 2 }, { min: 3, text: 'Gold', tier: 3 }],
            'Bastion': [{ min: 1, text: 'Bronze', tier: 1 }, { min: 2, text: 'Gold', tier: 3 }],
            'Arcana': [{ min: 1, text: 'Silver', tier: 2 }, { min: 2, text: 'Prismatic', tier: 4 }],
            'Vanguard': [{ min: 1, text: 'Bronze', tier: 1 }, { min: 2, text: 'Gold', tier: 3 }],
            'Faerie': [{ min: 1, text: 'Gold', tier: 3 }]
        };

        activeTraits.forEach(traitName => {
            const count = traitCounts[traitName];
            const rule = thresholds[traitName] || [{ min: 1, text: 'Bronze', tier: 1 }];

            // Find highest active tier
            let activeTier = null;
            rule.forEach(tierDef => {
                if (count >= tierDef.min) {
                    activeTier = tierDef;
                }
            });

            const synItem = document.createElement('div');
            synItem.className = 'live-syn-item';

            if (activeTier) {
                synItem.innerHTML = `
                    <div style="display:flex; align-items:center; gap:8px;">
                        <strong>${traitName}</strong>
                        <span>(${count} Active)</span>
                    </div>
                    <span class="live-syn-badge badge-tier-${activeTier.tier}">${activeTier.text} Tier</span>
                `;
            } else {
                synItem.innerHTML = `
                    <div style="display:flex; align-items:center; gap:8px; opacity:0.6;">
                        <span>${traitName}</span>
                        <span>(${count}/2)</span>
                    </div>
                    <span class="live-syn-badge" style="background:#333; color:#777;">Inactive</span>
                `;
            }

            liveSynListEl.appendChild(synItem);
        });
    }
}
