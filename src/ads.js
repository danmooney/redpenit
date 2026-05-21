import canvas from './lib/elements/canvas.js';

const FOURTHWALL_URL = 'https://raisin-pains-shop.fourthwall.com/products/raisin-pains-supersoft-sycophancy-tee';

const DISMISS_KEY = 'tshirt-ad-dismissed-at';
const DISMISS_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const TSHIRT_ALT = "Programmer's t-shirt — Shop on Fourthwall";

const IMAGE_POOLS = {
    '160x600': [
        'unisex-staple-t-shirt-black-front-6a0df0764472a.png',
        'unisex-staple-t-shirt-black-left-front-6a0df07642e27.png',
        'unisex-staple-t-shirt-black-right-front-6a0df0763f3d0.png',
        'unisex-staple-t-shirt-black-right-front-6a0df07641fa5.png',
    ],
    '728x90': ['horizontal.jpg'],
    '320x50': ['horizontal-mobile.jpg'],
};

const SIZES = {
    '160x600': { width: 160, height: 600 },
    '728x90': { width: 728, height: 90 },
    '320x50': { width: 320, height: 50 },
};

const SLOTS = [
    { position: 'left', size: '160x600' },
    { position: 'right', size: '160x600' },
    { position: 'bottom', size: '728x90' },
    { position: 'bottom-mobile', size: '320x50' },
];

// 160 ad width + 16 gutter + 8 breathing room on each side
const SIDE_AD_CLEARANCE = 184;
// 90 ad height + 16 bottom gutter + ~50 of breathing/button-bar overlap
const BOTTOM_AD_CLEARANCE = 156;
// Approx hero + button-container chrome above the canvas
const CHROME_ABOVE_CANVAS = 150;

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function assignImages() {
    const shuffled = {};
    const cursor = {};
    for (const size of Object.keys(IMAGE_POOLS)) {
        shuffled[size] = shuffle(IMAGE_POOLS[size]);
        cursor[size] = 0;
    }
    return SLOTS.map((slot) => {
        const pool = shuffled[slot.size];
        const filename = pool[cursor[slot.size] % pool.length];
        cursor[slot.size] += 1;
        return { ...slot, ...SIZES[slot.size], filename };
    });
}

function fireEvent(name, position) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', name, { ad_position: position });
    }
}

function isDismissed() {
    try {
        const raw = window.localStorage.getItem(DISMISS_KEY);
        const ts = raw ? parseInt(raw, 10) : 0;
        return Boolean(ts && Date.now() - ts < DISMISS_TTL_MS);
    } catch (e) {
        return false;
    }
}

function createAdSlot(slot, adRoot) {
    const wrap = document.createElement('div');
    wrap.className = `tshirt-ad tshirt-ad--${slot.position}`;

    const a = document.createElement('a');
    a.href = FOURTHWALL_URL;
    a.target = '_blank';
    a.rel = 'noopener sponsored';
    a.setAttribute('aria-label', TSHIRT_ALT);
    a.addEventListener('click', () => fireEvent('tshirt_ad_click', slot.position));

    const img = document.createElement('img');
    img.className = 'tshirt-ad__image';
    img.src = `/ads/${slot.filename}`;
    img.alt = TSHIRT_ALT;
    img.width = slot.width;
    img.height = slot.height;
    a.appendChild(img);
    wrap.appendChild(a);

    const dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.className = 'tshirt-ad__dismiss';
    dismiss.setAttribute('aria-label', 'Dismiss ad');
    dismiss.textContent = '×';
    dismiss.addEventListener('click', () => {
        try {
            window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
        } catch (e) {}
        fireEvent('tshirt_ad_dismissed', slot.position);
        adRoot.remove();
    });
    wrap.appendChild(dismiss);

    const label = document.createElement('span');
    label.className = 'tshirt-ad__label';
    label.textContent = 'Ad';
    wrap.appendChild(label);

    return wrap;
}

// When the centered canvas grows wide enough to slide under the side rails,
// or tall enough to slide under the bottom banner, hide the impacted ads.
function updateOverlapVisibility() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const canvasW = canvas.width;
    const canvasH = canvas.height;

    const hideSide = canvasW > w - 2 * SIDE_AD_CLEARANCE;
    const hideBottom = canvasH > h - BOTTOM_AD_CLEARANCE - CHROME_ABOVE_CANVAS;

    document.body.classList.toggle('hide-side-ads', hideSide);
    document.body.classList.toggle('hide-bottom-ad', hideBottom);
}

function initAds() {
    if (isDismissed()) return;

    const adRoot = document.createElement('div');
    adRoot.id = 'tshirt-ads-root';

    for (const slot of assignImages()) {
        adRoot.appendChild(createAdSlot(slot, adRoot));
    }

    document.body.appendChild(adRoot);

    updateOverlapVisibility();
    window.addEventListener('resize', updateOverlapVisibility);
    if (typeof ResizeObserver === 'function') {
        new ResizeObserver(updateOverlapVisibility).observe(canvas);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
} else {
    initAds();
}
