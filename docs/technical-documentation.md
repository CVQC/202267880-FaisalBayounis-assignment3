# Technical Documentation
## Faisal Bayounis – Web Developer Portfolio

---

## 1. Project Overview

This is a personal portfolio website built entirely with HTML5, CSS3, and vanilla JavaScript (no frameworks or libraries). The website showcases my skills, projects, and contact information, while demonstrating dynamic and interactive web development features.

---

## 2. File Structure
├── index.html → Main HTML structure of the website
├── README.md → Project overview and setup instructions
├── css/
│ └── styles.css → All styling, dark mode, animations, responsive design
├── js/
│ └── script.js → All JavaScript logic and interactivity
├── assets/
│ └── images/ → Project images and icons
└── docs/
├── ai-usage-report.md → AI tools usage documentation
└── technical-documentation.md → This file




---

## 3. HTML Structure (`index.html`)

The HTML file is divided into the following sections:

| Section | ID / Class | Description |
|---|---|---|
| Greeting Banner | `#greeting-banner` | Displays a dynamic time-based greeting at the top |
| Header | `.header` | Contains the name, tagline, navigation links, and dark mode toggle |
| About | `#about` | A short personal introduction paragraph |
| Skills | `#skills` | Four skill cards with expand/collapse functionality |
| Projects | `#projects` | Project cards with filter buttons (All / COE / CS) |
| Music | `#music` | iTunes music search with 30-second audio preview |
| Contact | `#contact` | A validated contact form with success/error feedback |
| Footer | `.footer` | Copyright information |

---

## 4. CSS Details (`styles.css`)

### 4.1 CSS Variables
All colors, spacing, shadows, and transitions are defined as CSS variables inside `:root` for easy maintainability:
```css
--primary: #3498db      → Main blue color
--secondary: #2ecc71    → Green color
--purple: #9b59b6       → Purple accent
--accent: #e74c3c       → Red for errors
--orange: #f39c12       → Orange accent
```

### 4.2 Layout
- **Flexbox** is used for the header and navigation layout
- **CSS Grid** is used for the skills grid and projects grid with `auto-fit` and `minmax()` for automatic responsiveness

### 4.3 Dark Mode
- Triggered by adding the `.dark` class to `<body>`
- All dark mode styles are scoped under `body.dark` selectors
- Preference is saved in `localStorage` and restored on page load

### 4.4 Responsive Design
- **768px breakpoint** → stacks header vertically, single column grids
- **480px breakpoint** → reduces padding, stacks nav links vertically

### 4.5 Animations
| Animation | Used On | Effect |
|---|---|---|
| `fadeInUp` | Cards, sections | Slides up from below while fading in |
| `slideInLeft` | About section, odd skill cards | Slides in from the left |
| `slideInRight` | Music section, even skill cards | Slides in from the right |
| `fadeInDown` | Header, greeting banner | Drops in from above |
| `popIn` | Project cards, filter buttons | Scales up with a slight bounce |
| `bounceIn` | Success form message | Bounces into view |
| `shakeX` | Error form message | Shakes horizontally to signal an error |

---

## 5. JavaScript Details (`script.js`)

All JavaScript runs inside `DOMContentLoaded` to ensure the HTML is fully loaded before any logic executes.

### 5.1 Dark Mode Toggle
```js
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', 'dark' or 'light');
});
```
- Toggles the `.dark` class on `<body>`
- Saves the user's choice in `localStorage`
- Restores the saved preference when the page loads

### 5.2 Dynamic Greeting
```js
const hour = new Date().getHours();
```
- Reads the current hour from the user's system clock
- Displays "Good Morning", "Good Afternoon", or "Good Evening" with a matching emoji
- Updates automatically every time the page loads

### 5.3 Active Navigation Highlight
```js
window.addEventListener('scroll', highlightActiveSection);
```
- Listens to the scroll position
- Compares it to the `offsetTop` of each section
- Adds the `.active` class to the matching nav link

### 5.4 Project Filter
```js
allProjectCards.forEach(card => {
    const match = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hidden', !match);
});
```
- Each project card has a `data-category` attribute (`coe` or `cs`)
- Clicking a filter button shows only matching cards
- Non-matching cards get the `.hidden` class (`display: none`)
- Shows a "No projects found" message if zero results

### 5.5 Expand / Collapse Skills
```js
extra.classList.toggle('open');
```
- Each skill card has a hidden `.skill-extra` div
- Clicking "Show more" toggles the `.open` class which sets `display: block`
- Button text changes between "Show more ▼" and "Show less ▲"

### 5.6 Form Validation
Validates three things before submission:
1. **Empty fields** → shows error if name, email, or message is missing
2. **Email format** → checks using regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
3. **Message length** → must be at least 10 characters

On success, shows a green confirmation message with the user's name.

### 5.7 Music Search API
```js
fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=8`)
```
- Uses the **iTunes Search API** (free, no API key required)
- Fetches up to 8 tracks matching the search query
- Displays album art, track name, and artist name for each result
- If a `previewUrl` exists, a **▶ Play Preview** button is shown
- Only one song can play at a time — others pause automatically
- Shows friendly error messages if the API fails or returns no results

### 5.8 Scroll Animations (IntersectionObserver)
```js
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});
```
- Watches skill cards and project cards
- Triggers a fade-in + slide-up animation when they enter the viewport
- More performant than scroll event listeners

---

## 6. APIs Used

| API | URL | Purpose | Auth Required |
|---|---|---|---|
| iTunes Search API | `https://itunes.apple.com/search` | Fetch music tracks with artwork and preview | ❌ No |

---

## 7. Browser Compatibility

The website uses only standard Web APIs and CSS features supported by all modern browsers:

- ✅ Google Chrome
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Android Chrome)

---

## 8. Performance Considerations

- No external libraries or frameworks — faster load time
- API calls only happen when the user clicks Search — no unnecessary requests
- `IntersectionObserver` is used instead of scroll events for better performance
- CSS animations use `transform` and `opacity` — GPU-accelerated properties
- `localStorage` is used instead of cookies for lightweight preference storage

---

## 9. Known Limitations

- The contact form does not actually send emails — it simulates submission (no backend)
- iTunes API previews are limited to 30 seconds per track
- Some tracks may not have a preview URL available
- The website requires an internet connection for the music search feature
