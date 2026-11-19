// The Bite Chapter - Apple Enterprise Frontend Engine
// Optimized for iOS, Android, and Instagram In-App Browser Webview

let currentChapter = 'all';
let searchQuery = '';
let currentSort = 'popular';
let currentServingsMultiplier = 1;
let bookmarkedIds = new Set(JSON.parse(localStorage.getItem('tbc_bookmarks') || '[]'));
let activeReel = null;
let visibleRecipeCount = 6;
let particles = [];

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderHeroCover();
    renderBentoGrid();
    renderLookbookStrip();
    renderSegmentedPills();
    renderRecipeGrid();
    setupEventListeners();
    setupFxCanvas();
    setupLookbookScrollButtons();
}

// 1. Hero Feature (Apple Keynote Style - Compact Widescreen)
function renderHeroCover() {
    const heroContainer = document.getElementById('hero-feature-container');
    if (!heroContainer) return;

    // Feature channel's #1 most popular viral hit: Virat Kohli's Steamed Veggie Bowl (163K+ views)
    const heroReel = window.REELS_DATA.find(r => r.id === 'go0TJoanK1g') || window.REELS_DATA[0];

    heroContainer.innerHTML = `
        <div class="royal-card p-3 sm:p-5 group cursor-pointer" onclick="openRecipeModal('${heroReel.id}')">
            <div class="royal-thumb relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-neutral-900 shadow-md">
                <img src="${heroReel.thumbnail}" alt="${heroReel.title}" loading="eager" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

                <!-- Top Floating Apple Glass Pill -->
                <div class="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-10">
                    <span class="apple-glass px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-neutral-900 flex items-center gap-1.5 shadow-sm">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        #1 Viral Cover Story
                    </span>
                    <span class="apple-glass-dark px-2.5 py-1 rounded-full text-white text-[10px] sm:text-[11px] font-medium">
                        ⏱️ ${heroReel.prepTime}
                    </span>
                </div>

                <!-- Center Floating Play Button -->
                <div class="absolute inset-0 flex items-center justify-center z-10">
                    <div class="royal-play-btn w-12 h-12 sm:w-14 sm:h-14">
                        <svg class="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                </div>

                <!-- Bottom Typography Overlay -->
                <div class="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 text-white z-10">
                    <span class="royal-crown-badge mb-1 text-[10px]">
                        👑 #1 Most Viral • 163K+ Views • Clean Fuel
                    </span>
                    <h3 class="font-display text-lg sm:text-2xl font-bold leading-tight">
                        ${heroReel.title}
                    </h3>
                    <p class="text-[11px] sm:text-xs text-neutral-300 mt-1 line-clamp-1 max-w-xl font-normal hidden sm:block">
                        ${heroReel.description}
                    </p>
                </div>
            </div>
        </div>
    `;
}

// 2. Signature Highlights (Compact Royal 4-Item Showcase)
function renderBentoGrid() {
    const bentoContainer = document.getElementById('bento-grid-container');
    if (!bentoContainer) return;

    const aglioOlio = window.REELS_DATA.find(r => r.id === 'HjIfjPZh3Ac') || window.REELS_DATA[0];
    const chutneys = window.REELS_DATA.find(r => r.id === 'rTWw5yVLwnk') || window.REELS_DATA[1];
    const mushroomPasta = window.REELS_DATA.find(r => r.id === 'yjmDrOIkaG0') || window.REELS_DATA[2];
    const cheela = window.REELS_DATA.find(r => r.id === 'ArtUYX17hjM') || window.REELS_DATA[3];

    const highlights = [
        {
            ...aglioOlio,
            badge: "👑 700K+ Viral Mega Hit",
            badgeClass: "royal-crown-badge",
            categorySubtitle: "10-Min Roman Silk"
        },
        {
            ...chutneys,
            badge: "🌶️ 95K+ Cult Tadka",
            badgeClass: "apple-badge bg-rose-50 text-rose-700 border-rose-200",
            categorySubtitle: "Charcoal Smoke"
        },
        {
            ...mushroomPasta,
            badge: "🍄 Facebook Viral Favorite",
            badgeClass: "apple-badge bg-amber-50 text-amber-700 border-amber-200",
            categorySubtitle: "Pan-Seared Umami"
        },
        {
            ...cheela,
            badge: "🌱 18g Clean Protein",
            badgeClass: "apple-badge bg-emerald-50 text-emerald-700 border-emerald-100",
            categorySubtitle: "Golden Stuffed Crepe"
        }
    ];

    bentoContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            ${highlights.map(item => `
                <div class="royal-card p-4 sm:p-5 flex flex-col justify-between group cursor-pointer" onclick="openRecipeModal('${item.id}')">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="${item.badgeClass}">${item.badge}</span>
                            <span class="text-[11px] font-semibold text-neutral-400">⏱️ ${item.prepTime}</span>
                        </div>
                        <div class="royal-thumb relative aspect-[16/10] rounded-xl mb-3 shadow-inner overflow-hidden">
                            <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div class="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition z-10">
                                <div class="royal-play-btn w-9 h-9 text-xs">
                                    <svg class="w-4 h-4 ml-0.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                            </div>
                            <div class="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-semibold z-10">
                                <span class="apple-glass-dark px-2 py-0.5 rounded-full">${item.categorySubtitle}</span>
                                <span class="apple-glass-dark px-2 py-0.5 rounded-full">${item.platform === 'facebook' ? 'FB' : 'YT'} • ${item.views}</span>
                            </div>
                        </div>
                        <h4 class="font-serif-headline text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#E15A3E] transition leading-snug line-clamp-2">
                            ${item.title}
                        </h4>
                        <p class="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed font-normal">
                            ${item.description}
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs">
                        <span class="text-neutral-400 text-[11px] font-medium">${item.platform === 'facebook' ? 'Facebook Reel' : 'YouTube Short'}</span>
                        <span class="font-bold text-[#E15A3E] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            <span>Cook</span>
                            <span>→</span>
                        </span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 3. Apple Music / App Store Style Horizontal Reel Strip
function renderLookbookStrip() {
    const lookbookContainer = document.getElementById('lookbook-strip-container');
    if (!lookbookContainer) return;

    // Pick 10 most visually appetizing reels
    const stripList = window.REELS_DATA.slice(0, 10);

    lookbookContainer.innerHTML = stripList.map(reel => `
        <div class="apple-lookbook-card group cursor-pointer" onclick="openRecipeModal('${reel.id}')">
            <div class="royal-thumb relative rounded-[22px] overflow-hidden bg-neutral-900 border border-black/[0.08] shadow-sm aspect-[9/15] flex flex-col justify-end">
                <img src="${reel.thumbnail}" alt="${reel.title}" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

                <!-- Top Glass Badges -->
                <div class="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span class="apple-glass px-2.5 py-1 rounded-full text-[10px] font-bold text-neutral-900 shadow-sm">
                        ${reel.tags[0] || 'FEATURED'}
                    </span>
                    <button onclick="event.stopPropagation(); toggleBookmark('${reel.id}')" class="w-8 h-8 rounded-full apple-glass-dark text-white flex items-center justify-center transition hover:scale-105" title="Save">
                        <svg class="w-4 h-4 ${bookmarkedIds.has(reel.id) ? 'text-red-500 fill-red-500' : 'text-white'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                    </button>
                </div>

                <!-- Center Floating Play -->
                <div class="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition z-10">
                    <div class="royal-play-btn w-12 h-12">
                        <svg class="w-5 h-5 ml-0.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                </div>

                <!-- Bottom Title Overlay -->
                <div class="p-4 z-10 text-white">
                    <h4 class="font-serif-headline text-lg font-bold leading-tight line-clamp-2">${reel.title}</h4>
                    <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs text-neutral-300">
                        <span>⏱️ ${reel.prepTime}</span>
                        <span class="text-amber-300 font-semibold group-hover:underline flex items-center gap-1">
                            Cook Reel →
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 4. Apple Segmented Control Pills (with Visual Dish Previews)
function renderSegmentedPills() {
    const container = document.getElementById('segmented-pills-container');
    if (!container) return;

    container.innerHTML = window.CHAPTERS.map(chap => {
        const isActive = chap.id === currentChapter;
        return `
            <button onclick="setChapter('${chap.id}')" class="segmented-pill flex items-center gap-1.5 ${isActive ? 'active' : ''}">
                <span class="text-xs">${chap.icon || '✨'}</span>
                <span>${chap.name}</span>
            </button>
        `;
    }).join('');
}

function setChapter(chapId) {
    currentChapter = chapId;
    visibleRecipeCount = 6;
    renderSegmentedPills();
    renderRecipeGrid();
}

// 5. Recipe Chapters Grid (Progressive Reveal & Royal Animations)
function renderRecipeGrid() {
    const grid = document.getElementById('recipe-grid');
    const countEl = document.getElementById('results-count');
    const loadMoreContainer = document.getElementById('recipe-load-more-container');
    if (!grid) return;

    let list = [...window.REELS_DATA];

    if (currentChapter !== 'all') {
        if (currentChapter === 'viral') {
            list = list.filter(r => r.category === 'viral' || (r.view_count && r.view_count >= 10000));
        } else {
            list = list.filter(r => r.chapter === currentChapter || r.category === currentChapter);
        }
    }

    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(r => 
            r.title.toLowerCase().includes(q) ||
            r.tags.some(t => t.toLowerCase().includes(q)) ||
            r.ingredients.some(i => i.toLowerCase().includes(q)) ||
            (r.chapter && r.chapter.toLowerCase().includes(q)) ||
            (r.platform && r.platform.toLowerCase().includes(q))
        );
    }

    if (countEl) {
        countEl.textContent = `${list.length} recipes in this chapter`;
    }

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-16 text-center text-neutral-400">
                <span class="text-4xl block mb-2 font-handwriting">No recipes found</span>
                <p class="text-sm text-neutral-500">Try searching for garlic, pasta, or cheela.</p>
                <button onclick="resetFilters()" class="mt-4 px-6 py-2 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-black transition">
                    Reset Filter
                </button>
            </div>
        `;
        if (loadMoreContainer) loadMoreContainer.innerHTML = '';
        return;
    }

    // Progressive Reveal: Show initial batch (6 items) so page is compact & easy to scroll
    const displayList = list.slice(0, visibleRecipeCount);

    grid.innerHTML = displayList.map(reel => {
        const isBookmarked = bookmarkedIds.has(reel.id);
        const tag1 = reel.tags[0] || `⏱️ ${reel.prepTime}`;
        const tag2 = reel.tags[1] || reel.difficulty;
        const isFB = reel.platform === 'facebook';

        return `
            <div class="royal-card overflow-hidden flex flex-col group cursor-pointer animate-fade-in-up" onclick="openRecipeModal('${reel.id}')">
                <div class="royal-thumb relative aspect-[16/11] overflow-hidden">
                    <img src="${reel.thumbnail}" alt="${reel.title}" loading="lazy" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                    
                    <div class="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start z-10">
                        <span class="apple-glass px-2.5 py-1 rounded-full text-[10px] font-bold text-neutral-900 shadow-sm flex items-center gap-1">
                            ${reel.id === 'HjIfjPZh3Ac' 
                                ? '<span class="text-blue-600 font-extrabold">👑 700K+ Viral</span>' 
                                : '<span class="text-red-600 font-extrabold">▶</span> ' + reel.views}
                        </span>
                        <button onclick="event.stopPropagation(); toggleBookmark('${reel.id}')" class="w-7 h-7 rounded-full apple-glass text-neutral-800 flex items-center justify-center transition shadow-sm hover:scale-105" title="Save">
                            <svg class="w-3.5 h-3.5 ${isBookmarked ? 'text-red-500 fill-red-500' : 'text-neutral-700'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                        </button>
                    </div>

                    <div class="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition z-10">
                        <div class="royal-play-btn w-10 h-10">
                            <svg class="w-4 h-4 ml-0.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    </div>

                    <div class="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] z-10">
                        <span class="apple-glass-dark px-2 py-0.5 rounded-full">${tag1}</span>
                        <span class="font-semibold text-neutral-200">⏱️ ${reel.prepTime}</span>
                    </div>
                </div>

                <div class="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
                    <div>
                        <h4 class="font-serif-headline text-lg font-bold text-neutral-900 leading-snug group-hover:text-[#E15A3E] transition line-clamp-2">
                            ${reel.title}
                        </h4>
                        <p class="text-xs text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                            ${reel.description}
                        </p>
                    </div>

                    <div class="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between">
                        <span class="text-[11px] text-neutral-400 font-medium">
                            ${reel.ingredients.length} ingredients • ${reel.difficulty}
                        </span>
                        <span class="text-xs font-bold text-[#E15A3E] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            <span>Cook</span>
                            <span>→</span>
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Load More / Progressive Reveal Controls
    if (loadMoreContainer) {
        if (list.length > visibleRecipeCount) {
            const remaining = list.length - visibleRecipeCount;
            loadMoreContainer.innerHTML = `
                <div class="flex flex-col items-center gap-3">
                    <button onclick="loadMoreRecipes()" class="royal-load-more-btn group">
                        <span>Discover More Recipes (${remaining} Remaining)</span>
                        <svg class="w-4 h-4 text-[#E15A3E] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <p class="text-[11px] text-neutral-400">Showing ${visibleRecipeCount} of ${list.length} curated recipes</p>
                </div>
            `;
        } else if (list.length > 6 && visibleRecipeCount >= list.length) {
            loadMoreContainer.innerHTML = `
                <div class="flex flex-col items-center gap-3">
                    <button onclick="collapseRecipes()" class="royal-load-more-btn">
                        <span>Showing All ${list.length} Recipes • Collapse to Top ↑</span>
                    </button>
                </div>
            `;
        } else {
            loadMoreContainer.innerHTML = '';
        }
    }
}

function loadMoreRecipes() {
    visibleRecipeCount += 6;
    renderRecipeGrid();
}

function collapseRecipes() {
    visibleRecipeCount = 6;
    renderRecipeGrid();
    const section = document.getElementById('recipes');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// 6. iOS Bottom Sheet / Recipe Modal
function openRecipeModal(reelId) {
    const reel = window.REELS_DATA.find(r => r.id === reelId);
    if (!reel) return;
    activeReel = reel;
    currentServingsMultiplier = 1;

    const modal = document.getElementById('recipe-modal');
    if (!modal) return;

    renderRecipeModalContent(reel);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Reset scroll positions to top
    const scrollableAreas = modal.querySelectorAll('.overflow-y-auto');
    scrollableAreas.forEach(el => el.scrollTop = 0);
}

function closeRecipeModal() {
    const modal = document.getElementById('recipe-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    
    const iframeContainer = document.getElementById('modal-iframe-container');
    if (iframeContainer) iframeContainer.innerHTML = '';
}

function renderRecipeModalContent(reel) {
    const iframeContainer = document.getElementById('modal-iframe-container');
    if (iframeContainer) {
        iframeContainer.innerHTML = `
            <div class="relative w-full h-full bg-black rounded-2xl overflow-hidden flex flex-col justify-between">
                <iframe 
                    src="https://www.youtube.com/embed/${reel.id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1" 
                    title="${reel.title}" 
                    class="w-full h-full rounded-2xl"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
                <div class="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10 pointer-events-auto">
                    <a href="${reel.youtubeUrl || `https://www.youtube.com/shorts/${reel.id}`}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-full bg-red-600/95 hover:bg-red-600 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-md transition">
                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        <span>Watch on YouTube ↗</span>
                    </a>
                    ${reel.id === 'HjIfjPZh3Ac' ? `
                    <a href="https://www.facebook.com/thebitechapter/" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-blue-600/95 hover:bg-blue-600 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-md transition">
                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        <span>Facebook Page ↗</span>
                    </a>` : ''}
                </div>
            </div>
        `;
    }

    document.getElementById('modal-title').textContent = reel.title;
    document.getElementById('modal-preptime').textContent = reel.prepTime;
    document.getElementById('modal-difficulty').textContent = reel.difficulty;
    document.getElementById('modal-description').textContent = reel.description;

    const tagsContainer = document.getElementById('modal-tags');
    if (tagsContainer) {
        const platformBadge = reel.id === 'HjIfjPZh3Ac'
            ? `<span class="apple-badge bg-blue-50 text-blue-700 border-blue-200 font-bold">👑 700K+ Viral Mega Hit</span>`
            : `<span class="apple-badge bg-red-50 text-red-700 border-red-200 font-bold">▶️ ${reel.views}</span>`;

        tagsContainer.innerHTML = platformBadge + reel.tags.map(t => `
            <span class="apple-badge">
                ${t}
            </span>
        `).join('');
    }

    renderIngredients(reel);
    renderSteps(reel);
}

function updateServings(mult) {
    currentServingsMultiplier = mult;
    ['serv-1', 'serv-2', 'serv-4'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.classList.remove('bg-neutral-900', 'text-white');
            btn.classList.add('bg-neutral-100', 'text-neutral-600');
        }
    });

    const activeBtn = document.getElementById(`serv-${mult}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-neutral-100', 'text-neutral-600');
        activeBtn.classList.add('bg-neutral-900', 'text-white');
    }

    if (activeReel) {
        renderIngredients(activeReel);
    }
}

function renderIngredients(reel) {
    const listEl = document.getElementById('modal-ingredients-list');
    if (!listEl) return;

    listEl.innerHTML = reel.ingredients.map((ing, idx) => {
        let displayIng = ing;
        if (currentServingsMultiplier !== 1) {
            displayIng = scaleIngredientString(ing, currentServingsMultiplier);
        }

        return `
            <div class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition">
                <input type="checkbox" id="ing-${idx}" class="ingredient-check w-4 h-4 rounded text-[#E15A3E] focus:ring-[#E15A3E] border-neutral-300 bg-white cursor-pointer" />
                <label for="ing-${idx}" class="text-sm text-neutral-700 cursor-pointer select-none">
                    ${displayIng}
                </label>
            </div>
        `;
    }).join('');
}

function scaleIngredientString(str, multiplier) {
    return str.replace(/^([\d\.\/]+)/, (match) => {
        let val = 1;
        if (match.includes('/')) {
            const [num, den] = match.split('/');
            val = parseFloat(num) / parseFloat(den);
        } else {
            val = parseFloat(match);
        }
        if (isNaN(val)) return match;
        const total = val * multiplier;
        return Number.isInteger(total) ? total : total.toFixed(1);
    });
}

function renderSteps(reel) {
    const stepsEl = document.getElementById('modal-steps-list');
    if (!stepsEl) return;

    stepsEl.innerHTML = reel.steps.map((st, i) => `
        <li class="flex gap-4 text-sm text-neutral-600">
            <span class="w-6 h-6 rounded-full bg-neutral-100 border border-black/[0.06] text-neutral-900 font-bold flex items-center justify-center shrink-0 text-xs">
                ${i + 1}
            </span>
            <span class="pt-0.5">${st}</span>
        </li>
    `).join('');
}

// 7. Lookbook Scroll Arrows
function setupLookbookScrollButtons() {
    const scrollContainer = document.getElementById('lookbook-strip-container');
    const prevBtn = document.getElementById('lookbook-prev-btn');
    const nextBtn = document.getElementById('lookbook-next-btn');

    if (!scrollContainer) return;

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }
}

// 8. Bookmarks
function toggleBookmark(reelId) {
    if (bookmarkedIds.has(reelId)) {
        bookmarkedIds.delete(reelId);
        showToast("Removed from saved recipes");
    } else {
        bookmarkedIds.add(reelId);
        showToast("Saved to your favorites ❤️");
        triggerEmojiBurst(window.innerWidth / 2, window.innerHeight / 2, ['❤️', '✨', '🥐']);
    }
    localStorage.setItem('tbc_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
    renderLookbookStrip();
    renderRecipeGrid();
}

// 9. eBook Modal
function openEbookModal() {
    const modal = document.getElementById('ebook-preview-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeEbookModal() {
    const modal = document.getElementById('ebook-preview-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

// 10. Form Submissions
async function handleEbookSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending preview...</span>`;

    try {
        const res = await fetch('/api/ebook-waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();

        submitBtn.innerHTML = `<span>✓ Sent to your inbox!</span>`;
        showToast("📖 Sample Chapter ready! Download starting...");
        triggerEmojiBurst(window.innerWidth / 2, window.innerHeight / 2, ['📖', '✨', '🥐']);

        setTimeout(() => {
            const a = document.createElement('a');
            a.href = data.download_url || 'static/downloads/thebitechapter_sample_ebook.pdf';
            a.download = 'TheBiteChapter_Sample_Cookbook.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }, 800);

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            form.reset();
        }, 3500);
    } catch (err) {
        showToast("Thank you for joining our cookbook list!");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
    }
}

async function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    try {
        await fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        showToast("Welcome to Sunday Secret Bites! 💌");
        triggerEmojiBurst(window.innerWidth / 2, window.innerHeight / 2, ['💌', '☕', '✨']);
        form.reset();
    } catch (err) {
        showToast("Thanks for subscribing!");
        form.reset();
    }
}

// 11. Event Listeners
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            visibleRecipeCount = 6;
            renderRecipeGrid();
        });
    }

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            visibleRecipeCount = 6;
            if (currentSort === 'quick') {
                window.REELS_DATA.sort((a, b) => (parseInt(a.prepTime) || 15) - (parseInt(b.prepTime) || 15));
            } else {
                window.REELS_DATA.sort((a, b) => b.view_count - a.view_count);
            }
            renderRecipeGrid();
        });
    }

    const ebookForm = document.getElementById('ebook-form');
    if (ebookForm) ebookForm.addEventListener('submit', handleEbookSubmit);

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) newsletterForm.addEventListener('submit', handleNewsletterSubmit);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeRecipeModal();
            closeEbookModal();
        }
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function resetFilters() {
    currentChapter = 'all';
    searchQuery = '';
    visibleRecipeCount = 6;
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    renderSegmentedPills();
    renderRecipeGrid();
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        toast.classList.remove('opacity-100', 'translate-y-0');
    }, 3000);
}

// 12. Floating Particle Canvas
function setupFxCanvas() {
    const canvas = document.getElementById('fx-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2;
            p.opacity -= 0.015;
            p.rotation += p.rotSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.font = `${p.size}px sans-serif`;
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillText(p.char, -p.size / 2, p.size / 2);
            ctx.restore();

            if (p.opacity <= 0 || p.y > canvas.height) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(loop);
    }
    loop();
}

function triggerEmojiBurst(x, y, emojis = ['✨', '🥐', '🍓', '☕', '❤️']) {
    for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 5;
        particles.push({
            x: x || window.innerWidth / 2,
            y: y || window.innerHeight / 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 2.5,
            char: emojis[Math.floor(Math.random() * emojis.length)],
            size: 18 + Math.random() * 14,
            opacity: 1,
            rotation: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.2
        });
    }
}

// Global window methods
window.openRecipeModal = openRecipeModal;
window.closeRecipeModal = closeRecipeModal;
window.updateServings = updateServings;
window.toggleBookmark = toggleBookmark;
window.openEbookModal = openEbookModal;
window.closeEbookModal = closeEbookModal;
window.setChapter = setChapter;
window.resetFilters = resetFilters;
window.triggerEmojiBurst = triggerEmojiBurst;
