# Repository Social Preview (Open Graph) Template

This folder provides a ready-to-edit Open Graph (OG) image template to improve your repository’s visibility on GitHub and social media.

## Why this matters
- GitHub uses the social preview image for sharing cards.
- A clear, keyword-rich preview boosts SEO and click-through rates.

## Files
- `repository-open-graph-template.svg` – Edit text/colors, then export to PNG.

## Recommended size
- 1200 x 630 (standard OG)
- GitHub accepts PNG/JPG.

## How to Export to PNG (Windows options)
1. Inkscape (GUI):
   - Open the SVG → File → Export PNG → set size to 1200 x 630 → Export.
2. ImageMagick (CLI):
   - Install ImageMagick, then run:
   - `magick convert -background none -density 300 assets/repository-open-graph-template.svg -resize 1200x630 assets/repository-open-graph.png`
3. Browser snapshot:
   - Open the SVG in your browser, zoom to fit, and take a high-resolution screenshot. Crop to 1200 x 630.

## Upload to GitHub
- Repo → Settings → Social preview → Upload the exported PNG/JPG → Save.

## Customize
- Replace the placeholder URL with your actual repository or live demo link.
- Update colors and text lines to match your branding.

## Tip
- Keep text large and concise; avoid overcrowding.
- Include the project name, key features, and a short tagline.