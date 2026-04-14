/**
 * chatbot.js - StreamVault AI Movie Buddy (GOD MODE)
 * Implements the movie recommendation agent logic and UI interaction.
 */

(function() {
    // ── CONFIGURATION & DB ──
    const PERSONALITIES = {
        'friendly': { name: 'Buddy', emoji: '🤖', welcome: "Hey! 🍿 I'm your movie buddy! Ready to find a masterpiece?", intro: "I can help with suggestions, trivia, or just chatting! What's your vibe today?" },
        'pro': { name: 'Assistant', emoji: '🤵', welcome: "Greetings. I am your StreamVault Assistant. How may I facilitate your viewing selection?", intro: "I provide data-driven recommendations and platform navigation. What is your preferred genre?" },
        'sarcastic': { name: 'Sass-bot', emoji: '🙄', welcome: "Oh, look who's back. 🍿 Need me to pick another movie you won't actually watch?", intro: "I'm here to judge your taste and maybe suggest something that isn't a mindless explosion fest. What now?" }
    };

    let currentPersonality = 'friendly';

    const STARTER_PROMPTS = {
        morning: "Up early? ☀️ A sunrise comedy sounds like a plan!",
        afternoon: "Mid-day break? ☕ A short thriller perhaps?",
        evening: "Prime-time! 🌙 Blockbuster mode: ON.",
        night: "Late-night mystery? 🌌 Let's keep it spooky."
    };

    const RECOMMENDATIONS = {
        'action': [
            { id: 'dark-horizon', title: 'Dark Horizon', meta: 'Sci-Fi · Action', desc: 'A rogue AI awakens in deep space, forcing a crew to fight for survival.', yt: 'NIJFpgU18gY', rating: 4.9, poster: 'https://tse3.mm.bing.net/th/id/OIP.cN-RSRUO83lwievUuYSI5QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },
            { id: 'john-wick', title: 'John Wick', meta: 'Action · Crime', desc: 'An ex-hitman comes out of retirement for ultimate vengeance.', yt: 'C0BMw-q9P38', rating: 4.8, poster: 'https://image.tmdb.org/t/p/original/pNsw71rQcCiRUknCOLHosuxPpew.jpg' },
            { id: 'mad-max', title: 'Mad Max: Fury Road', meta: 'Action · Adventure', desc: 'In a post-apocalyptic wasteland, a woman rebels against a tyrant.', yt: 'hEJnMQG9ev8', rating: 4.7, poster: 'https://tse1.mm.bing.net/th/id/OIP.ivpM86SDLfEdHqm60IZZ_gHaLH?rs=1&pid=ImgDetMain&o=7&rm=3' }
        ],
        'comedy': [
            { id: 'office-chaos', title: 'Office Chaos', meta: 'Comedy · Satire', desc: 'A hilarious take on corporate life where a Tuesday turns into mayhem.', yt: 'hY7m5jjJ9mM', rating: 4.5, poster: 'https://tse2.mm.bing.net/th/id/OIP.GhWWKbvEEC8nbdyubfUn9QHaEO?rs=1&pid=ImgDetMain&o=7&rm=3' },
            { id: 'grand-budapest', title: 'The Grand Budapest Hotel', meta: 'Adventure · Comedy', desc: 'A legendary concierge teams up with a lobby boy at a famous hotel.', yt: '1Fg5iWmQjwk', rating: 4.8, poster: 'https://tse2.mm.bing.net/th/id/OIP.cSGZLH6YOG_Z2CZd_JrUHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
            { id: 'palm-springs', title: 'Palm Springs', meta: 'Comedy · Romance', desc: 'Stuck in a time loop, two wedding guests develop a romance.', yt: 'CpBLt4Yfzhw', rating: 4.6, poster: 'https://tse1.mm.bing.net/th/id/OIP.BmGHGjDz1zDZs2JkufvzlwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' }
        ]
        // ... (truncated database for focus)
        ,'horror': [
            { id: 'quiet-place', title: 'A Quiet Place', meta: 'Horror · Sci-Fi', desc: 'A family must live in silence to avoid mysterious creatures.', yt: 'WR7cc5t7tv8', rating: 4.7, poster: 'https://tse1.mm.bing.net/th/id/OIP.4UBmzySch2WW1TpzuNjy6wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' }
        ]
    };

    const POP_SOUND = "https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3";
    const audio = new Audio(POP_SOUND);
    audio.volume = 0.3;

    // ── UI GENERATION ──
    const chatbotHTML = `
        <div class="sv-chatbot-container">
            <button class="sv-chatbot-toggle" id="chatToggle" aria-label="Open Chat">
                <svg class="chat-icon" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H6l-2 2V4h16v12z"/></svg>
                <svg class="close-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                <div class="sv-chat-badge" id="chatBadge" style="position:absolute; top:-5px; right:-5px; background:#e50914; color:white; font-size:10px; width:18px; height:18px; border-radius:50%; display:none; align-items:center; justify-content:center; border:2px solid #000;">1</div>
            </button>
            <div class="sv-chatbot-window" id="chatWindow">
                <div class="sv-chatbot-header">
                    <div class="sv-chatbot-avatar" id="chatAvatar">🤖</div>
                    <div class="sv-chatbot-title">
                        <h3 id="chatName">Buddy</h3>
                        <span class="sv-chatbot-status" id="chatStatus">Online</span>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <select id="personalitySelect" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#888; font-size:10px; border-radius:4px; padding:2px 4px; cursor:pointer; outline:none;">
                            <option value="friendly">Friendly</option>
                            <option value="pro">Assistant</option>
                            <option value="sarcastic">Sass-bot</option>
                        </select>
                        <button id="chatClear" title="Clear Chat" style="background:none; border:none; cursor:pointer; color:#888; font-size:14px;">🧹</button>
                        <button id="chatMute" style="background:none; border:none; cursor:pointer; color:#888; font-size:14px;">🔊</button>
                    </div>
                </div>
                <div class="sv-chatbot-messages" id="chatMessages"></div>
                <div class="sv-chatbot-suggestions" id="chatSuggestions">
                    <button class="suggestion-btn" data-val="action">Action</button>
                    <button class="suggestion-btn" data-val="comedy">Comedy</button>
                    <button class="suggestion-btn" data-val="tit" style="background:linear-gradient(135deg,#e50914,#f39c12); color:white; border:none;">🌓 This or That?</button>
                    <button class="suggestion-btn" data-val="surprise" style="background:linear-gradient(135deg,#e50914,#7c3aed); border:none; color:white;">✨ Surprise Me!</button>
                    <button class="suggestion-btn" data-val="trivia" style="background:#27ae60; border:none; color:white;">🎮 Trivia</button>
                </div>
                <div class="sv-chatbot-input-wrap">
                    <div class="sv-chatbot-input-container">
                        <input type="text" class="sv-chatbot-input" id="chatInput" placeholder="Ask me anything (Ctrl+K)..." />
                        <button class="sv-chatbot-mic" id="chatMic" style="background:none; border:none; color:#888; cursor:pointer;"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg></button>
                        <button class="sv-chatbot-send" id="chatSend"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // ── ELEMENTS & STATE ──
    const toggle = document.getElementById('chatToggle');
    const windowEl = document.getElementById('chatWindow');
    const messages = document.getElementById('chatMessages');
    const input = document.getElementById('chatInput');
    const send = document.getElementById('chatSend');
    const mic = document.getElementById('chatMic');
    const muteBtn = document.getElementById('chatMute');
    const clearBtn = document.getElementById('chatClear');
    const pSelect = document.getElementById('personalitySelect');
    const badge = document.getElementById('chatBadge');
    const pAvatar = document.getElementById('chatAvatar');
    const pName = document.getElementById('chatName');
    const suggestions = document.getElementById('chatSuggestions');
    
    let isTyping = false;
    let hasIntroduced = false;
    let muted = false;
    let gameMode = null; // 'trivia' or 'tit'
    let titStep = 0;

    // ── CORE FUNCTIONS ──
    function speak(text) {
        if (muted || !('speechSynthesis' in window)) return;
        const u = new SpeechSynthesisUtterance(text);
        u.pitch = currentPersonality === 'sarcastic' ? 0.8 : (currentPersonality === 'pro' ? 0.9 : 1.1);
        window.speechSynthesis.speak(u);
    }

    function toggleChat() {
        toggle.classList.toggle('active');
        windowEl.classList.toggle('active');
        badge.style.display = 'none';
        if (windowEl.classList.contains('active')) {
            input.focus();
            if (!hasIntroduced) {
                const session = JSON.parse(localStorage.getItem('sv_session') || 'null');
                let greeting = PERSONALITIES[currentPersonality].welcome;
                if (session && session.name) greeting = greeting.replace('Hey!', `Hey ${session.name.split(' ')[0]}!`);
                setTimeout(() => addAIResponse(greeting + "\n\n" + PERSONALITIES[currentPersonality].intro), 400);
                hasIntroduced = true;
            }
        }
    }

    function addMessage(text, type = 'ai', movies = []) {
        if (type === 'ai') {
            if (!muted) audio.play().catch(() => {});
            if (!windowEl.classList.contains('active')) badge.style.display = 'flex';
            speak(text.substring(0, 50));
        }
        
        const msg = document.createElement('div');
        msg.className = `msg msg-${type}`;
        msg.innerHTML = text.replace(/\n/g, '<br>');
        
        if (movies.length > 0) {
            const list = document.createElement('div');
            list.style.marginTop = '15px';
            list.style.display = 'flex';
            list.style.flexDirection = 'column';
            list.style.gap = '10px';
            
            movies.forEach(m => {
                const item = document.createElement('div');
                item.style.background = 'rgba(255,255,255,0.05)';
                item.style.borderRadius = '8px';
                item.style.border = '1px solid rgba(255,255,255,0.1)';
                item.style.overflow = 'hidden';
                item.innerHTML = `
                    <div style="height:120px; overflow:hidden; position:relative;">
                        <img src="${m.poster}" style="width:100%; height:100%; object-fit:cover; filter:brightness(0.7);" />
                        <div style="position:absolute; top:8px; left:8px; background:rgba(0,0,0,0.6); padding:2px 6px; border-radius:4px; font-size:10px;">${m.meta}</div>
                        <div style="position:absolute; top:8px; right:8px; background:${m.status === 'Global' ? 'linear-gradient(135deg,#f39c12,#e67e22)' : 'linear-gradient(135deg,#e50914,#b20610)'}; color:white; padding:2px 6px; border-radius:4px; font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">${m.status === 'Global' ? '🌍 Discovery' : '✨ Available'}</div>
                        <div style="position:absolute; bottom:8px; right:8px; background:#f1c40f; color:#000; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px;">⭐ ${m.rating}</div>
                    </div>
                    <div style="padding:10px;">
                        <div style="font-weight:600; font-size:14px; color:#fff; margin-bottom:5px;">${m.title}</div>
                        <div style="font-size:12px; line-height:1.4; color:#ddd; margin-bottom:8px;">${m.desc}</div>
                        <div style="display:flex; flex-wrap:wrap; gap:5px;">
                            <button class="chat-watch-btn" data-yt="${m.yt}" data-title="${m.title}" style="flex:1; min-width:80px; background:${m.yt ? '#e50914' : '#555'}; border:none; color:white; padding:6px; border-radius:4px; font-size:11px; cursor:pointer;" ${!m.yt ? 'disabled' : ''}>${m.yt ? '▶ Trailer' : 'N/A'}</button>
                            <button class="chat-list-btn" data-id="${m.id}" data-title="${m.title}" style="flex:1; min-width:80px; background:rgba(255,255,255,0.1); border:none; color:white; padding:6px; border-radius:4px; font-size:11px; cursor:pointer;">+ List</button>
                            ${m.status === 'Global' ? `
                                <button class="chat-find-btn" data-title="${m.title}" style="flex:1; min-width:110px; background:#4285f4; border:none; color:white; padding:6px; border-radius:4px; font-size:11px; cursor:pointer;">📺 Find it on...</button>
                                <button class="chat-yt-explore-btn" data-title="${m.title}" style="flex:1; min-width:110px; background:#ff0000; border:none; color:white; padding:6px; border-radius:4px; font-size:11px; cursor:pointer;">🔴 YouTube</button>
                            ` : ''}
                        </div>
                    </div>
                `;
                list.appendChild(item);
            });
            msg.appendChild(list);
        }
        
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
        
        msg.querySelectorAll('.chat-watch-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const yt = this.getAttribute('data-yt');
                const title = this.getAttribute('data-title');
                if (typeof openPlayer === 'function') openPlayer(yt, title);
                else window.open(`https://www.youtube.com/watch?v=${yt}`, '_blank');
            });
        });

        msg.querySelectorAll('.chat-list-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const title = this.dataset.title;
                const id = this.dataset.id;
                
                // Save to LocalStorage 'sv_list'
                let currentList = JSON.parse(localStorage.getItem('sv_list') || '[]');
                if (!currentList.some(item => item.title === title)) {
                    currentList.push({ title, id, addedAt: new Date().toISOString() });
                    localStorage.setItem('sv_list', JSON.stringify(currentList));
                }

                this.innerHTML = "✓ Added";
                this.style.background = "#2ecc71";
                addAIResponse(currentPersonality === 'sarcastic' ? `Fine, I put **${title}** on your list. Happy now?` : `Saved **${title}**! Great choice.`);
            });
        });

        msg.querySelectorAll('.chat-find-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const title = this.getAttribute('data-title');
                window.open(`https://www.google.com/search?q=watch+${encodeURIComponent(title)}+online`, '_blank');
            });
        });

        msg.querySelectorAll('.chat-yt-explore-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const title = this.getAttribute('data-title');
                window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(title)}+movie+reviews+and+trailer`, '_blank');
            });
        });

        return msg;
    }

    function addAIResponse(text, delay = 1000, movies = []) {
        if (isTyping) return;
        isTyping = true;
        const loader = document.createElement('div');
        loader.className = 'typing';
        loader.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        messages.appendChild(loader);
        messages.scrollTop = messages.scrollHeight;
        
        setTimeout(() => {
            loader.remove();
            addMessage(text, 'ai', movies);
            isTyping = false;
        }, delay);
    }

    // ── TMDB API INTEGRATION ──
    const TMDB_API_KEY = 'YOUR_API_KEY'; // User should replace this
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';

    const GENRE_MAP = {
        'action': 28,
        'comedy': 35,
        'romance': 10749,
        'horror': 27,
        'sci-fi': 878,
        'thriller': 53,
        'animation': 16,
        'drama': 18,
        'adventure': 12,
        'fantasy': 14,
        'war': 10752,
        'mystery': 9648,
        'western': 37,
        'neo-noir': [53, 80], // Maps to Thriller + Crime on TMDB
        'cyberpunk': [878, 28] // Sci-Fi + Action
    };

    async function fetchTrailers(movieId) {
        const url = `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`;
        try {
            const resp = await fetch(url);
            const data = await resp.json();
            if (data.results && data.results.length > 0) {
                // Return the first YouTube trailer or teaser
                const trailer = data.results.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
                return trailer ? trailer.key : data.results[0].key;
            }
        } catch (err) {
            console.error("Trailer Fetch Error:", err);
        }
        return "";
    }

    async function fetchFromTMDB(params) {
        let url = "";
        
        if (params.intent === 'similar' && params.movieId) {
            url = `${TMDB_BASE_URL}/movie/${params.movieId}/similar?api_key=${TMDB_API_KEY}`;
        } else if (params.intent === 'trending') {
            url = `${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}`;
        } else if (params.actor) {
            url = `${TMDB_BASE_URL}/search/person?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(params.actor)}`;
        } else {
            url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&sort_by=${params.sort || 'popularity.desc'}`;
            if (params.genre && GENRE_MAP[params.genre]) url += `&with_genres=${GENRE_MAP[params.genre]}`;
            if (params.year) url += `&primary_release_year=${params.year}`;
        }

        try {
            const resp = await fetch(url);
            const data = await resp.json();
            let rawResults = [];
            
            if (params.actor && data.results && data.results.length > 0) {
                rawResults = data.results[0].known_for || [];
            } else if (data.results) {
                rawResults = data.results.slice(0, 3);
            }

            const formattedResults = await Promise.all(rawResults.map(async m => {
                const trailerId = await fetchTrailers(m.id);
                return formatTMDBMovie(m, trailerId);
            }));

            return formattedResults;
        } catch (err) {
            console.error("TMDB Fetch Error:", err);
            return [];
        }
    }

    async function findMovieID(title) {
        const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
        try {
            const resp = await fetch(url);
            const data = await resp.json();
            return data.results && data.results.length > 0 ? data.results[0].id : null;
        } catch (e) { return null; }
    }

    function formatTMDBMovie(m, trailerId) {
        const title = m.title || m.name;
        // Check Local DB
        const isLocal = typeof MOVIES_DB !== 'undefined' && MOVIES_DB.find(local => local.title.toLowerCase() === title.toLowerCase());
        
        // Use local data if it exists for consistency
        const finalTitle = isLocal ? isLocal.title : title;
        const finalPoster = isLocal ? isLocal.img : (m.poster_path ? `${TMDB_IMG_URL}${m.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster');
        const finalYT = isLocal ? isLocal.youtube : trailerId;
        const finalRating = isLocal ? isLocal.rating : (m.vote_average ? (m.vote_average / 2).toFixed(1) : 4.0);
        const finalMeta = isLocal ? isLocal.genre + " · " + isLocal.year : `${m.release_date ? m.release_date.split('-')[0] : 'N/A'} · TMDb`;

        // Check Watch History
        const hasHistory = localStorage.getItem(`sv_progress_${finalTitle}`) !== null;
        
        // Check My List
        const onList = JSON.parse(localStorage.getItem('sv_list') || '[]').some(item => item.title === finalTitle);

        let status = isLocal ? 'StreamVault' : 'Global';
        if (hasHistory) status = 'Watching';
        if (onList) status = 'On List';

        return {
            id: m.id || (isLocal ? isLocal.title : 'local'),
            title: finalTitle,
            meta: finalMeta,
            desc: m.overview ? m.overview.substring(0, 120) + "..." : (isLocal ? "Available in our library." : "No description available."),
            yt: finalYT,
            rating: finalRating,
            poster: finalPoster,
            status: status
        };
    }

    const VIBE_MAP = {
        'chill': { genre: 'animation', sort: 'popularity.desc' },
        'intense': { genre: 'thriller', sort: 'revenue.desc' },
        'nostalgic': { year: '1990', sort: 'vote_average.desc' },
        'mind-bending': { genre: 'sci-fi', sort: 'popularity.desc' },
        'spooky': { genre: 'horror', sort: 'popularity.desc' }
    };

    async function fetchMovieDetails(title) {
        const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
        try {
            const resp = await fetch(url);
            const data = await resp.json();
            if (data.results && data.results.length > 0) {
                const movie = data.results[0];
                const detailUrl = `${TMDB_BASE_URL}/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`;
                const dResp = await fetch(detailUrl);
                return await dResp.json();
            }
        } catch (err) { console.error("Details Fetch Error:", err); }
        return null;
    }

    function extractParameters(input) {
        const q = input.toLowerCase();
        let params = { genre: "", mood: "", year: "", actor: "", intent: "recommend", movieTitle: "", movieId: null };

        // Similar Results
        if (q.includes('similar to') || q.includes('movies like') || q.includes('more like')) {
            params.intent = 'similar';
            const parts = q.split(/similar to|movies like|more like/);
            params.movieTitle = parts[1].trim();
        }

        // Trending
        if (q.includes('trending') || q.includes('popular') || q.includes('top picks')) {
            params.intent = 'trending';
        }

        // Intent Recognition (Details)
        if (q.includes('about') || q.includes('who is in') || q.includes('plot') || q.includes('tell me more')) {
            if (params.intent !== 'similar') {
                params.intent = "details";
                const titleMatch = q.match(/(?:about|of|in|plot)\s+([^?]+)/);
                if (titleMatch) params.movieTitle = titleMatch[1].trim();
            }
        }

        // Extract Genre
        for (const g in GENRE_MAP) { if (q.includes(g)) { params.genre = g; break; } }
        
        // Extract Vibe
        for (const v in VIBE_MAP) { if (q.includes(v)) { 
            params.mood = v; 
            if (VIBE_MAP[v].genre) params.genre = VIBE_MAP[v].genre;
            if (VIBE_MAP[v].year) params.year = VIBE_MAP[v].year;
            break; 
        } }

        // Extract Year
        const yearMatch = q.match(/\b(19|20)\d{2}\b/);
        if (yearMatch) params.year = yearMatch[0];

        // Extract Mood
        const moods = ['funny', 'sad', 'exciting', 'scary', 'romantic'];
        for (const m of moods) {
            if (q.includes(m)) {
                params.mood = m;
                if (!params.genre) {
                    if (m === 'funny') params.genre = 'comedy';
                    if (m === 'romantic') params.genre = 'romance';
                    if (m === 'scary') params.genre = 'horror';
                }
                break;
            }
        }

        // Extract Actor
        const actorKeywords = ['with ', 'by ', 'starring ', 'featuring '];
        for (const k of actorKeywords) {
            if (q.includes(k)) {
                params.actor = q.split(k)[1].split(' in')[0].trim();
                break;
            }
        }
        if (!params.actor && q.includes('movies with ')) params.actor = q.split('movies with ')[1].trim();

        return params;
    }

    async function handleMovieDetails(title) {
        if (!title) { addAIResponse("Which movie would you like to know about?"); return; }
        const details = await fetchMovieDetails(title);
        if (details) {
            const cast = details.credits.cast.slice(0, 3).map(c => c.name).join(', ');
            const trailer = details.videos.results.find(v => v.type === 'Trailer')?.key || "";
            const response = `**${details.title}** (${details.release_date.split('-')[0]})\n\n🎬 **Plot:** ${details.overview}\n\n🌟 **Starring:** ${cast}\n\nRating: ⭐ ${details.vote_average.toFixed(1)}`;
            addAIResponse(response, 1000, [formatTMDBMovie(details, trailer)]);
        } else {
            addAIResponse(`I couldn't find detailed archives for "${title}". Maybe try a different title?`);
        }
    }

    async function handleAIRecommendation(val) {
        const params = extractParameters(val);
        const q = val.toLowerCase();

        // ── TASK: Search Local Database First (by Title OR Category) ──
        if (typeof MOVIES_DB !== 'undefined') {
            const localHits = MOVIES_DB.filter(m => 
                m.title.toLowerCase().includes(q) || 
                (params.movieTitle && m.title.toLowerCase().includes(params.movieTitle.toLowerCase())) ||
                (params.genre && m.genre.toLowerCase().includes(params.genre.toLowerCase())) ||
                (params.mood && m.genre.toLowerCase().includes(params.mood.toLowerCase()))
            );
            
            if (localHits.length > 0) {
                // If it's a genre match, show up to 3 local examples
                const count = params.genre ? 3 : 1;
                const formattedLocal = localHits.slice(0, count).map(m => formatTMDBMovie({ title: m.title, overview: "Available in our internal library." }, m.youtube));
                
                let responsePrefix = "Check out what I found in our local library:";
                if (params.genre) responsePrefix = `Since you like **${params.genre}**, you'll love these local StreamVault titles:`;
                
                addAIResponse(responsePrefix, 800, formattedLocal);
                return;
            }
        }
        
        if (params.intent === "similar") {
            const id = await findMovieID(params.movieTitle);
            if (id) {
                params.movieId = id;
                const results = await fetchFromTMDB(params);
                addAIResponse(`If you liked **${params.movieTitle}**, you'll definitely enjoy these similar hits:`, 1000, results);
            } else {
                addAIResponse(`I couldn't find "${params.movieTitle}" in the archives, so I can't find similar movies yet.`);
            }
            return;
        }

        if (params.intent === "details") { handleMovieDetails(params.movieTitle); return; }
        
        const results = await fetchFromTMDB(params);
        
        if (results.length > 0) {
            let responseText = "I found some top-tier results for you!";
            if (params.intent === 'trending') responseText = "Here's what's trending globally right now:";
            else if (params.actor) responseText = `Here are some of **${params.actor}**'s best works:`;
            else if (params.genre) responseText = `Checking the **${params.genre}** archives... check these out:`;
            
            addAIResponse(responseText, 800, results);
        } else {
            addAIResponse(`I couldn't find a direct match in the global archives. 🕵️\n\nYou might want to check **Netflix**, **YouTube**, or **Disney+** for that specific title. Shall we try a broader search with just a genre?`);
        }
    }

    function processInput(val) {
        if (!val.trim() || isTyping) return;
        addMessage(val, 'user');
        input.value = '';
        const q = val.toLowerCase();
        
        if (gameMode === 'trivia') handleTrivia(q);
        else if (gameMode === 'tit') handleTIT(q);
        else if (q.includes('trivia') || q.includes('game')) startTrivia();
        else if (q.includes('this or that') || q.includes('choices') || q.includes('tit')) startTIT();
        else if (q.includes('surprise')) respondWithSurprise();
        else if (q.includes('action')) respondWithCategory('action', currentPersonality === 'sarcastic' ? "Action movies? Groundbreaking." : "Action! Let's go!");
        else if (q.includes('comedy')) respondWithCategory('comedy', currentPersonality === 'sarcastic' ? "Comedy... you must be desperate for a laugh." : "Comedy coming up!");
        else if (q.includes('take me to') || q.includes('go to')) handleNavigation(q);
        else if (q.includes('personality') || q.includes('vibe')) addAIResponse("You can change my personality using the selector in the header! Try 'Sass-bot' if you want a challenge.");
        else {
            // Use TMDB recommendation logic
            handleAIRecommendation(val);
        }
    }

    async function startTrivia() {
        gameMode = 'trivia';
        const page = Math.floor(Math.random() * 5) + 1;
        const resp = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`);
        const data = await resp.json();
        const movie = data.results[Math.floor(Math.random() * data.results.length)];
        
        this.correctAnswer = movie.title.toLowerCase();
        addAIResponse(`🎮 **Dynamic Trivia!**\n\nI'm thinking of a movie released in **${movie.release_date.split('-')[0]}** with the plot: \n\n_"${movie.overview.substring(0, 150)}..."_\n\nCan you guess the title?`);
    }

    function handleTrivia(q) {
        if (q.includes(this.correctAnswer) || this.correctAnswer.includes(q)) {
            addAIResponse(`🎯 **Boom! Correct!** It was indeed **${this.correctAnswer.toUpperCase()}**. You definitely know your cinema! Ready for another?`);
        } else {
            addAIResponse(`❌ Not quite! The answer was **${this.correctAnswer.toUpperCase()}**. Don't worry, even the best critics miss a few!`);
        }
        gameMode = null;
    }

    function startTIT() {
        gameMode = 'tit'; titStep = 1;
        addAIResponse("🌓 **This or That?**\n\nExplosions and car chases (**Action**) OR non-stop laughter (**Comedy**)?");
    }

    function handleTIT(q) {
        if (titStep === 1) {
            if (q.includes('action')) { titStep = 2; addAIResponse("Interesting. Space survival (**Sci-Fi**) OR gritty street fights (**Urban**)?"); }
            else { titStep = 3; addAIResponse("Comedy! Classic satire (**Satire**) OR weird time loops (**Time**)?"); }
        } else {
            if (q.includes('space') || q.includes('sci-fi')) respondWithCategory('action', "Perfect! You'll love this Sci-Fi thriller:");
            else if (q.includes('satire')) respondWithCategory('comedy', "Satire it is! Check this out:");
            else respondWithSurprise();
            gameMode = null; titStep = 0;
        }
    }

    function respondWithCategory(cat, prefix) { addAIResponse(prefix + "\n\nTry this one on for size:", 1200, [RECOMMENDATIONS[cat][0]]); }
    function respondWithSurprise() { addAIResponse("✨ **Surprise!** Just for you:", 1000, [RECOMMENDATIONS['action'][0]]); }

    function handleNavigation(q) {
        if (q.includes('movies')) { addAIResponse("🎬 Off to Movies..."); setTimeout(() => window.location.href = 'Movies.html', 1500); }
        else if (q.includes('tv')) { addAIResponse("📺 To the TV Shows!"); setTimeout(() => window.location.href = 'Tv Shows.html', 1500); }
        else if (q.includes('list')) { addAIResponse("❤️ Opening My List..."); setTimeout(() => window.location.href = 'My List.html', 1500); }
    }

    function clearChat() { messages.innerHTML = ''; hasIntroduced = false; addAIResponse(currentPersonality === 'sarcastic' ? "Forget everything? Wish I could." : "Ready for a fresh start!"); }

    pSelect.addEventListener('change', (e) => {
        currentPersonality = e.target.value;
        const p = PERSONALITIES[currentPersonality];
        pAvatar.textContent = p.emoji;
        pName.textContent = p.name;
        document.querySelector('.sv-chatbot-header').style.borderBottom = currentPersonality === 'sarcastic' ? '1px solid #e74c3c' : '1px solid rgba(255,255,255,0.1)';
        addAIResponse(`Personality switched to **${p.name}**! ${p.welcome}`);
    });

    toggle.addEventListener('click', toggleChat);
    send.addEventListener('click', () => processInput(input.value));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') processInput(input.value); });
    mic.addEventListener('click', () => { if (!('webkitSpeechRecognition' in window)) return; const r = new webkitSpeechRecognition(); mic.style.color = '#e50914'; r.onresult = (e) => { input.value = e.results[0][0].transcript; processInput(input.value); }; r.onend = () => mic.style.color = '#888'; r.start(); });
    clearBtn.addEventListener('click', clearChat);
    muteBtn.addEventListener('click', () => { muted = !muted; muteBtn.textContent = muted ? '🔇' : '🔊'; window.speechSynthesis.cancel(); });
    suggestions.addEventListener('click', (e) => { if (e.target.classList.contains('suggestion-btn')) processInput(e.target.dataset.val === 'tit' ? 'this or that' : e.target.dataset.val); });
    document.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); toggleChat(); } });
})();
