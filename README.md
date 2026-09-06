# 🎮 Game Zone

A modern game discovery platform built with **React, TypeScript, Vite, and the RAWG Video Games Database API**.

Game Zone allows users to discover games, search through a large game catalog, filter games by genre and platform, sort results, save favorites, and explore personalized game recommendations through a clean and responsive interface.



\

---

## 🌐 Live Demo

🚀 **[Open Game Zone](https://game-zone .vercel.app/)**

---

## ✨ Features

### 🎮 Game Discovery

* Browse a large collection of video games powered by the RAWG API
* Game cards with cover artwork and game information
* Metacritic scores and platform information
* Loading skeletons for a smoother experience

### 🔎 Search & Filtering

* Search games by name
* Filter games by genre
* Filter games by platform
* Sort games based on different criteria
* Reset filters when needed

### ❤️ Favorites

* Add and remove games from favorites
* Dedicated favorites panel
* Favorites are persisted using `localStorage`
* Quickly access saved games from the navigation

### 🎯 Recommendations

The sidebar provides several curated sections:

* 🔥 Popular Games
* ⭐ Top Rated Games
* 🎯 Recommended Games

Each section can be expanded to explore more games.

### 📄 Pagination

Game results are divided into pages to keep the interface clean and manageable while browsing a large catalog.

### 🌓 Theme Support

* Light mode
* Dark mode
* Theme switching through Chakra UI

### 📱 Responsive Interface

The layout adapts across desktop, tablet, and mobile screen sizes with dedicated mobile navigation and controls.

---

## 🛠️ Tech Stack

| Technology        | Purpose                              |
| ----------------- | ------------------------------------ |
| **React**         | UI development                       |
| **TypeScript**    | Type-safe development                |
| **Vite**          | Development server and build tooling |
| **Chakra UI**     | Component library and styling        |
| **Axios**         | API requests                         |
| **RAWG API**      | Video game data                      |
| **Framer Motion** | UI animations                        |
| **React Icons**   | Interface icons                      |
| **localStorage**  | Persistent favorites                 |

---

## 🏗️ Project Structure

```text
Game-Zone/
├── public/
│
├── src/
│   ├── components/
│   │   ├── CriticScore.tsx
│   │   ├── ColorModeSwitch.tsx
│   │   ├── Emoji.tsx
│   │   ├── FavoriteButton.tsx
│   │   ├── FavoritesButton.tsx
│   │   ├── FavoritesPanel.tsx
│   │   ├── GameCard.tsx
│   │   ├── GameCardContainer.tsx
│   │   ├── GameCardSkeleton.tsx
│   │   ├── GameGrid.tsx
│   │   ├── GenreList.tsx
│   │   ├── MobileGenreSelector.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── NavBar.tsx
│   │   ├── Pagination.tsx
│   │   ├── PlatformIconList.tsx
│   │   ├── PlatformSelector.tsx
│   │   ├── ResetFilters.tsx
│   │   ├── SearchInput.tsx
│   │   ├── SidebarRecommendations.tsx
│   │   └── SortSelector.tsx
│   │
│   ├── data/
│   ├── hooks/
│   ├── services/
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── theme.ts
│
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NimaTaghavi7/Game-Zone.git
```

### 2. Navigate to the project

```bash
cd Game-Zone/Game-Zone
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available through the local development URL provided by Vite.

---

## 🔑 RAWG API

Game Zone uses the **RAWG Video Games Database API** to retrieve game information.

API-powered data includes:

* Game titles
* Cover images
* Genres
* Platforms
* Ratings
* Metacritic scores
* Game recommendations
* Popular and top-rated games

> **Note:** API credentials should be stored securely using environment variables rather than being exposed directly in client-side source code.

---

## 📦 Available Scripts

```bash
npm run dev
```

Start the development server.

```bash
npm run build
```

Create a production build.

```bash
npm run lint
```

Run ESLint.

```bash
npm run preview
```

Preview the production build locally.

---

## 📸 Screenshots

> Screenshots will be added here.

### Home

*Add homepage screenshot here.*

### Game Discovery

*Add game grid screenshot here.*

### Favorites

*Add favorites panel screenshot here.*

### Mobile

*Add mobile layout screenshot here.*

---

## 🧠 What I Learned

Building Game Zone helped me work with several important frontend concepts:

* Building reusable React components
* Managing application state with React hooks
* Creating custom data-fetching hooks
* Working with REST APIs
* Handling loading and error states
* TypeScript interfaces and type-safe props
* Client-side filtering and sorting
* Persistent state with `localStorage`
* Responsive layouts with Chakra UI
* Pagination and API-based data fetching
* Component composition
* Git and GitHub workflow
* Production deployment with Vercel

---

## 🚀 Future Improvements

Some ideas planned for future versions:

* [ ] Game details page
* [ ] Advanced game filtering
* [ ] Infinite scrolling option
* [ ] Better recommendation algorithm
* [ ] Improved mobile navigation
* [ ] More detailed game information
* [ ] Authentication and cloud-synced favorites
* [ ] Performance optimizations
* [ ] Improved accessibility
* [ ] Secure API configuration with environment variables

---

## 👨‍💻 Author

**Nima Taghavi**

Frontend Developer in progress 🚀

Building projects, learning modern frontend development, and improving one commit at a time.

---

## ⭐ Support

If you like the project, consider giving the repository a ⭐ on GitHub.

Built with **React + TypeScript + Vite + RAWG API** 🎮
