// OneLib.js - Copy from main library
const OneLib = {
    // DOM Utilities
    select: (selector) => document.querySelector(selector),
    selectall: (selector) => document.querySelectorAll(selector),
    html: (selector, content) => {
        const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (content === undefined) return el ? el.innerHTML : '';
        if (el) el.innerHTML = content;
        return el;
    },
    css: (selector, styles) => {
        const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (el && styles) Object.assign(el.style, styles);
        return el;
    },
    cls: (selector, className) => {
        const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (el) el.classList.toggle(className);
        return el;
    },
    show: (selector) => {
        const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (el) el.style.display = 'block';
        return el;
    },
    hide: (selector) => {
        const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (el) el.style.display = 'none';
        return el;
    },

    // Math Helpers
    sum: (arr) => arr.reduce((a, b) => a + b, 0),
    avg: (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0,
    max: (arr) => Math.max(...arr),
    min: (arr) => Math.min(...arr),
    rand: (min = 0, max = 1) => Math.random() * (max - min) + min,
    randint: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    round: (num, decimals = 0) => Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals),
    clamp: (value, min, max) => Math.min(Math.max(value, min), max),

    // Text Processing
    trim: (text) => text.trim(),
    upper: (text) => text.toUpperCase(),
    lower: (text) => text.toLowerCase(),
    capitalize: (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
    slug: (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    words: (text) => text.split(/\s+/).filter(Boolean),
    truncate: (text, length = 100) => text.length > length ? text.slice(0, length) + '...' : text,
    reverse: (text) => text.split('').reverse().join(''),

    // Array & Object Helpers
    unique: (arr) => [...new Set(arr)],
    chunk: (arr, size) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    },
    shuffle: (arr) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    merge: (obj1, obj2) => ({ ...obj1, ...obj2 }),
    clone: (obj) => JSON.parse(JSON.stringify(obj)),

    // Storage & Data
    save: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    load: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    },
    copy: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            return false;
        }
    },
    clear: () => localStorage.clear(),

    // Date Helpers
    now: () => new Date(),
    timestamp: () => Date.now(),
    since: (date) => {
        const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
        return Math.floor(seconds / 86400) + ' days ago';
    },
    format: (date, style = 'YYYY-MM-DD') => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        
        return style
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes);
    },

    // Type Checking
    isnum: (val) => typeof val === 'number' && !isNaN(val),
    isstr: (val) => typeof val === 'string',
    isarr: (val) => Array.isArray(val),
    isobj: (val) => val !== null && typeof val === 'object' && !Array.isArray(val),
    isbool: (val) => typeof val === 'boolean',
    isfunc: (val) => typeof val === 'function',
    isempty: (val) => val == null || val === '' || (Array.isArray(val) && val.length === 0) || (typeof val === 'object' && Object.keys(val).length === 0),

    // Utilities
    wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    uuid: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    }),
    log: (...args) => console.log(...args),
    debounce: (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    },
    throttle: (func, limit) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(null, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Make OneLib available globally
if (typeof window !== 'undefined') {
    window.OneLib = OneLib;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = OneLib;
}