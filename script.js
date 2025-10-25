/*
  YouTube Thumbnail Downloader - Script
  - Validates URL and extracts Video ID
  - Generates HD/SD/MQ/Default thumbnail URLs
  - Download and Copy Link for each thumbnail
  - Optional features: Dark mode, Copy Video ID, oEmbed title, share buttons, recent URLs
*/

// Regex per requirements
const YT_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;

// Additional patterns for robustness (shorts, youtu.be, query-only v)
const SHORTS_REGEX = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{5,})/;

const els = {
  input: document.getElementById('videoUrl'),
  btn: document.getElementById('getThumbnailBtn'),
  error: document.getElementById('errorMsg'),
  resultSection: document.getElementById('resultSection'),
  container: document.getElementById('thumbnailContainer'),
  copyVideoIdBtn: document.getElementById('copyVideoIdBtn'),
  shareFacebook: document.getElementById('shareFacebook'),
  shareTwitter: document.getElementById('shareTwitter'),
  shareWhatsApp: document.getElementById('shareWhatsApp'),
  title: document.getElementById('videoTitle'),
  themeToggle: document.getElementById('themeToggle'),
  recentUrlsWrap: document.getElementById('recentUrls'),
  recentList: document.getElementById('recentList'),
};

let lastVideoId = '';
let lastUrl = '';

function setError(msg) {
  els.error.textContent = msg || '';
}

function cleanVideoId(candidate) {
  if (!candidate) return '';
  // Strip query params and invalid chars
  const base = candidate.split(/[?&]/)[0];
  const cleaned = base.replace(/[^a-zA-Z0-9_-]/g, '');
  return cleaned;
}

function extractVideoId(url) {
  if (!url) return '';
  try {
    // Use provided regex first
    const m = url.match(YT_REGEX);
    if (m && m[1]) {
      return cleanVideoId(m[1]);
    }
    // Shorts fallback
    const s = url.match(SHORTS_REGEX);
    if (s && s[1]) {
      return cleanVideoId(s[1]);
    }
    // Query param fallback
    const u = new URL(url);
    const vParam = u.searchParams.get('v');
    if (vParam) return cleanVideoId(vParam);
    // youtu.be fallback without regex
    const host = (u.hostname || '').replace(/^www\./, '');
    if (host === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '');
      return cleanVideoId(id);
    }
  } catch (_) {
    // If URL constructor fails, we still rely on regex already attempted.
  }
  return '';
}

function isValidUrl(url) {
  return !!extractVideoId(url);
}

function buildThumbnailUrls(id) {
  const base = `https://img.youtube.com/vi/${id}`;
  return [
    { name: 'maxresdefault', url: `${base}/maxresdefault.jpg` },
    { name: 'sddefault', url: `${base}/sddefault.jpg` },
    { name: 'mqdefault', url: `${base}/mqdefault.jpg` },
    { name: 'default', url: `${base}/default.jpg` },
  ];
}

function renderThumbnails(id) {
  const thumbs = buildThumbnailUrls(id);
  els.container.innerHTML = '';
  thumbs.forEach(({ name, url }) => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = url;
    img.alt = `YouTube thumbnail (${name}) for video ${id}`;
    img.loading = 'lazy';

    const body = document.createElement('div');
    body.className = 'card-body';

    const label = document.createElement('span');
    label.className = 'name';
    label.textContent = name;

    const dlBtn = document.createElement('button');
    dlBtn.className = 'primary';
    dlBtn.textContent = 'Download';
    dlBtn.addEventListener('click', () => downloadImage(url, `${id}-${name}.jpg`));

    const copyBtn = document.createElement('button');
    copyBtn.className = 'secondary';
    copyBtn.textContent = 'Copy Link';
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy Link'), 1200);
      } catch (e) {
        alert('Failed to copy link. Please copy manually.');
      }
    });

    card.appendChild(img);
    body.appendChild(label);
    body.appendChild(dlBtn);
    body.appendChild(copyBtn);
    card.appendChild(body);
    els.container.appendChild(card);
  });
}

// Note: download attribute may be ignored cross-origin; we attempt anchor download, then fallback to opening in a new tab.
async function downloadImage(url, filename) {
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error('Fetch failed');
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);

    // Prefer native save dialog if supported
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [{ description: 'JPEG Image', accept: { 'image/jpeg': ['.jpg', '.jpeg'] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        URL.revokeObjectURL(objectUrl);
        return;
      } catch (_) {
        // If user cancels or API fails, continue with anchor download
      }
    }

    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
  } catch (err) {
    // Fallback: open the image in a new tab to allow manual save
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

async function fetchVideoTitleByOEmbed(url) {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const res = await fetch(oembedUrl, { method: 'GET' });
    if (!res.ok) return '';
    const data = await res.json();
    return data && data.title ? String(data.title) : '';
  } catch (_) {
    return '';
  }
}

function updateOgImage(id) {
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    ogImage.setAttribute('content', `https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
  }
}

function setShareLinks(url, id, title) {
  const pageTitle = title || 'YouTube Thumbnail';
  const text = encodeURIComponent(`${pageTitle} · Thumbnail Downloader`);
  const u = encodeURIComponent(url);

  els.shareFacebook.onclick = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, '_blank');
  els.shareTwitter.onclick = () => window.open(`https://twitter.com/intent/tweet?url=${u}&text=${text}`, '_blank');
  els.shareWhatsApp.onclick = () => window.open(`https://api.whatsapp.com/send?text=${text}%20${u}`, '_blank');
}

function saveRecentUrl(url) {
  try {
    const key = 'recentUrls';
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    const filtered = arr.filter((u) => u !== url);
    filtered.unshift(url);
    const capped = filtered.slice(0, 5);
    localStorage.setItem(key, JSON.stringify(capped));
    renderRecentUrls();
  } catch (_) {}
}

function renderRecentUrls() {
  try {
    const raw = localStorage.getItem('recentUrls');
    const arr = raw ? JSON.parse(raw) : [];
    els.recentList.innerHTML = '';
    els.recentUrlsWrap.hidden = arr.length === 0;
    arr.forEach((u) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = 'recent-item';
      btn.textContent = u;
      btn.title = 'Use this URL';
      btn.onclick = () => {
        els.input.value = u;
      };
      const rm = document.createElement('button');
      rm.className = 'remove-item';
      rm.textContent = '×';
      rm.title = 'Remove';
      rm.onclick = () => {
        const filtered = arr.filter((x) => x !== u);
        localStorage.setItem('recentUrls', JSON.stringify(filtered));
        renderRecentUrls();
      };
      li.appendChild(btn);
      li.appendChild(rm);
      els.recentList.appendChild(li);
    });
  } catch (_) {}
}

function applySavedTheme() {
  try {
    const saved = localStorage.getItem('theme');
    const isDark = saved === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    els.themeToggle.checked = isDark;
  } catch (_) {}
}

function handleThemeToggle() {
  const dark = els.themeToggle.checked;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) {}
}

async function handleGetThumbnail() {
  setError('');
  const url = (els.input.value || '').trim();
  if (!url) {
    setError('Please paste a YouTube video URL.');
    alert('Please paste a YouTube video URL.');
    return;
  }
  const id = extractVideoId(url);
  if (!id) {
    setError('Invalid YouTube URL. Please check and try again.');
    alert('Invalid YouTube URL.');
    return;
  }

  lastVideoId = id;
  lastUrl = url;

  // Update page with results
  els.resultSection.hidden = false;
  renderThumbnails(id);
  updateOgImage(id);
  saveRecentUrl(url);

  const title = await fetchVideoTitleByOEmbed(url);
  els.title.textContent = title ? `Title: ${title}` : `Video ID: ${id}`;
  setShareLinks(url, id, title);
}

function init() {
  applySavedTheme();
  renderRecentUrls();

  els.btn.addEventListener('click', handleGetThumbnail);
  els.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleGetThumbnail();
  });

  els.copyVideoIdBtn.addEventListener('click', async () => {
    if (!lastVideoId) return;
    try {
      await navigator.clipboard.writeText(lastVideoId);
      els.copyVideoIdBtn.textContent = 'Copied!';
      setTimeout(() => (els.copyVideoIdBtn.textContent = 'Copy Video ID'), 1200);
    } catch (e) {
      alert('Failed to copy video ID.');
    }
  });

  els.themeToggle.addEventListener('change', handleThemeToggle);

  // Prefer HTTPS location for og:url if running on a deployed site
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl && location) {
    ogUrl.setAttribute('content', location.href);
  }
}

document.addEventListener('DOMContentLoaded', init);