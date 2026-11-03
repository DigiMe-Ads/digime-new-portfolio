# DigiMe Ads – Web Development Portfolio

A web version of the DigiMe Ads web development portfolio deck. It's plain HTML, CSS and JavaScript with **no build step**, so it can be hosted on GitHub Pages, Vercel, Netlify or any static host as it is.

## Structure

```
index.html            page shell (fonts, nav, loads js/main.js)
css/main.css          shared styles: slide canvas, laptop mock-up, decorations, animations
js/main.js            slide order + scroll animations + side navigation
slides/               ONE FILE PER SLIDE (markup + that slide's own <style>)
  01-cover.html
  02-who-we-are.html
  03-what-we-offer.html
  04-process.html
  05-featured-projects.html
  06 … 11-projects-*.html   two projects per slide
  12-contact.html
assets/img/           logos, 3D illustrations, icons
assets/img/projects/  website screenshots shown inside the laptops
```

## Editing

- **Change text or links:** open the slide file in `slides/` and edit it.
- **Change a project screenshot:** put a new image in `assets/img/projects/` (about 1280 px wide, 16:10 works best) and update the `<img src>`. Add `style="--pos: center top"` on the `<img>` to choose which part of the screenshot shows.
- **Add, remove or reorder slides:** edit the `SLIDES` list at the top of `js/main.js`. A new project slide is easiest to make by copying an existing `slides/1x-projects-*.html` file.
- **Positions on desktop:** each slide is a 1440 × 810 canvas, the same size as the original PDF. `--x`, `--y`, `--w` and `--fs` values are in PDF pixels, so `style="--x:120; --y:80"` puts an element 120 px from the left and 80 px from the top of the slide. Everything scales with the screen width.
- **Mobile layout:** each slide's `@media (max-width: 860px), (max-aspect-ratio: 4/5)` block controls how it stacks on phones and portrait tablets.

## Run locally

The slides are loaded with `fetch()`, so opening `index.html` straight from disk won't work. Serve the folder instead:

```bash
npx serve .
```

or

```bash
python -m http.server 8000
```

## Deploy

**GitHub Pages:** push this folder to a repository, then go to *Settings → Pages* and choose *Deploy from a branch* with `main` and `/ (root)`. The `.nojekyll` file is already included.

**Vercel:** import the repository, set *Framework Preset* to **Other**, leave the build command empty and keep the output directory as the root.
