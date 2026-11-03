/* DigiMe Ads – Web Development Portfolio
   Loads every slide from /slides in the order below and wires up the
   scroll animations + side navigation.

   To add, remove or reorder a slide, edit this list. */
const SLIDES = [
  "01-cover.html",
  "02-who-we-are.html",
  "03-what-we-offer.html",
  "04-process.html",
  "05-featured-projects.html",
  "06-projects-digimeads-bee-natural.html",
  "07-projects-fun-holidays-mansello.html",
  "08-projects-interwoven-stayloop.html",
  "09-projects-edge-kickerz-cup.html",
  "10-projects-tourneykit-magyar.html",
  "11-projects-kickerz-girls-victory.html",
  "12-contact.html",
];

const deck = document.getElementById("deck");
const nav = document.getElementById("deck-nav");

async function loadSlides() {
  const parts = await Promise.all(
    SLIDES.map((file) =>
      fetch(`slides/${file}`).then((res) => {
        if (!res.ok) throw new Error(`${file}: ${res.status}`);
        return res.text();
      })
    )
  );
  deck.innerHTML = parts.join("\n");
}

function setupReveal(slides) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add("is-in");
      }
    },
    { threshold: 0.18 }
  );
  slides.forEach((s) => io.observe(s));
}

function setupNav(slides) {
  slides.forEach((slide, i) => {
    if (!slide.id) slide.id = `slide-${i + 1}`;
    const a = document.createElement("a");
    a.href = `#${slide.id}`;
    a.setAttribute("aria-label", slide.dataset.title || `Slide ${i + 1}`);
    a.title = slide.dataset.title || `Slide ${i + 1}`;
    nav.appendChild(a);
  });
  const links = [...nav.children];

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const i = slides.indexOf(entry.target);
        links.forEach((l, j) => l.setAttribute("aria-current", String(i === j)));
        nav.classList.toggle("on-green", entry.target.classList.contains("slide--green"));
      }
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );
  slides.forEach((s) => io.observe(s));
}

function currentIndex(slides) {
  const mid = window.innerHeight / 2;
  const i = slides.findIndex((s) => {
    const r = s.getBoundingClientRect();
    return r.top <= mid && r.bottom > mid;
  });
  return Math.max(0, i);
}

function setupKeys(slides) {
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea, select")) return;
    const next = ["ArrowDown", "PageDown", "ArrowRight", " "].includes(e.key);
    const prev = ["ArrowUp", "PageUp", "ArrowLeft"].includes(e.key);
    if (!next && !prev) return;
    e.preventDefault();
    const i = currentIndex(slides) + (next ? 1 : -1);
    slides[Math.min(slides.length - 1, Math.max(0, i))].scrollIntoView({ behavior: "smooth" });
  });
}

// Slight parallax on elements marked with data-parallax="<strength>"
function setupParallax() {
  const items = [...document.querySelectorAll("[data-parallax]")];
  if (!items.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    for (const el of items) {
      const r = el.parentElement.getBoundingClientRect();
      const progress = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1 around the centre
      el.style.transform = `translate3d(0, ${(progress * Number(el.dataset.parallax)).toFixed(1)}px, 0)`;
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

loadSlides()
  .then(() => {
    const slides = [...deck.querySelectorAll(".slide")];
    setupReveal(slides);
    setupNav(slides);
    setupKeys(slides);
    setupParallax();
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
  })
  .catch((err) => {
    console.error(err);
    deck.innerHTML =
      '<p class="deck-msg">Could not load the slides. If you opened index.html directly, ' +
      "run a local server instead (see README.md).</p>";
  });
