# 🎯 YouTube Thumbnail Downloader

A fast, free, and SEO-friendly web tool to download YouTube video thumbnails in HD, SD, MQ, and default sizes. Works in any modern browser, no API key required.

## 🚀 Features
- Instant thumbnail extraction from any valid YouTube URL
- HD / SD / MQ / Default image sizes
- One-click Download and Copy Link options
- Light/Dark theme toggle with persistence
- Copy YouTube Video ID
- Fetches video title via YouTube oEmbed
- Share buttons (Facebook, Twitter, WhatsApp)
- Recent URLs saved locally (privacy-friendly)
- 100% client-side, no server required

## 🔧 How to Use
1. Paste your YouTube video link.
2. Click “Get Thumbnail”.
3. Choose a size and click “Download” or “Copy Link”.

## ✅ Supported URL Formats
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`

## 🧠 Tech Stack
- HTML5 + CSS3 + Vanilla JavaScript
- Responsive layout (max width 600px), Poppins font
- SEO-friendly metadata and Open Graph tags

## 🌍 Live Demo
Add your live link: GitHub Pages / Vercel

## 🖥️ Use Locally
- Option 1 — Open directly:
  - Navigate to your project folder and double-click `index.html`.
- Option 2 — Simple local server (recommended):
  - Open terminal in the project folder and run: `python -m http.server 8080`
  - Open `http://localhost:8080/` in your browser.
  - Stop with `Ctrl + C`.
- Option 3 — VS Code Live Server:
  - Open the folder in VS Code, install “Live Server”, then right-click `index.html` → “Open with Live Server”.

## 🌐 About Hashtag Web Solutions 

Hashtag Web Solutions is a professional web development, SEO, and digital marketing agency based in . We build scalable websites, custom web tools, and AI-driven digital products that help businesses grow globally. Our mission is to make the web faster, smarter, and more human-centered.

> Empowering ’s digital future through innovation, creativity, and technology.

### 🏢 Company Information
- Company Name: Hashtag Web Solutions  
- Location: Hetauda, Makwanpur,  
- Email: info@hashtagweb.com.np .com  
- Website: https://hashtagweb.com.np  
- Phone: +977-9823405140

### 🔗 Connect With Us

| Platform | Link | Status |
|-----------|------|--------|
| 🌐 Website | https://hashtagweb.com.np | Official business site |
| 🧑‍💼 LinkedIn | https://www.linkedin.com/company/hashtagwebsolution | Verified company profile |
| 💻 GitHub | https://github.com/hashtagsolution215-source | Open-source projects |
| 📸 Instagram | https://www.instagram.com/hashtagwebsolutions | Portfolio & updates |
| 📘 Facebook | https://www.facebook.com/hashtagwebsolutions| Active business page |
| 🧠 Quora | https://www.quora.com/profile/Hashtag-Solution | Q&A contributions |
| ✍️ Medium | https://medium.com/@hashtagsolution | Articles & tech blogs |
| 📌 Pinterest | https://www.pinterest.com/HashtagWebSolution/ | Design inspirations |

### ⚙️ Repository Information
© 2025 Hashtag Web Solutions  
This repository is maintained by https://github.com/hashtagsolution215-source.  
For collaboration, PRs, or open-source contributions, feel free to connect or submit a pull request.

**Keywords:**  
Hashtag Web Solutions • Web Development • Digital Marketing • SEO Agency • Web Tools • AI Development • Hashtag Solution

### ❤️ Support Our Mission
If you find our projects helpful, consider giving us a ⭐ on GitHub and following our socials.  
Together, let’s build a smarter and more connected digital .

> 🚀 Developed with 💻 by https://hashtagweb.com.np  
> “Where innovation meets digital excellence.”

## 🛠 Deployment
- GitHub Pages:
  - Push this folder to a GitHub repo, enable Pages for the root of `main`.
  - Your site will be available at `https://<username>.github.io/<repo>/`.
- Vercel:
  - Import the repo in Vercel, choose “Static Site”.
  - No build step required; deploy directly.

## 🔎 SEO Metadata
- Title: `YouTube Thumbnail Downloader | Free Online Tool`
- Description: `Download YouTube video thumbnails instantly in HD, SD, and more.`
- Keywords: `YouTube thumbnail downloader, HD thumbnail saver, free YouTube image tool`
- Social: `og:title`, `og:description`, `og:image`, `og:url` included.

## 📈 SEO Keywords
- youtube thumbnail downloader
- youtube image saver
- hd thumbnail downloader
- youtube thumbnail grabber
- download youtube thumbnail hd
- get youtube thumbnail url
- free youtube thumbnail extractor
- save youtube thumbnail

## ❓ FAQ
- Is it free? Yes, 100% free and browser-based.
- Do I need an API key? No, video ID is extracted via regex.
- Why does HD sometimes not load? Some videos don’t have `maxresdefault.jpg`; try `sddefault` or `mqdefault`.
- Will images always auto-download? Cross-origin restrictions may affect the `download` attribute; we use a blob-based fallback and native save dialog (where available).

## 🧑‍💻 Developer
Built by **Abhishek Adhikari**  
🔗 https://github.com/WHOISABHISHEKADHIKARI
🔗 https://www.adhikariavishek.com.np/

## ⚠️ Notes
- oEmbed for titles may have rate limits.
- No data leaves your browser; recent URLs are stored locally.
