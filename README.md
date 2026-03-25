<div align="center">

<img src="src/assets/icon.png" alt="Christmas Countdown" width="100" />

# 🎄 Christmas Countdown

### How long until Santa arrives? Find out in real time.

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-christmas--countdown--omega.vercel.app-brightgreen?style=flat-square)](https://christmas-countdown-omega.vercel.app/) 
[![Angular](https://img.shields.io/badge/Angular-21-dd0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org) [![SCSS](https://img.shields.io/badge/SCSS-styling-cc6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com) [![Prettier](https://img.shields.io/badge/Prettier-formatted-f7b93e?style=flat-square&logo=prettier&logoColor=black)](https://prettier.io) [![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

---

## ✨ Features

- 🕐 **Real-time countdown** — weeks, days, hours, minutes, and seconds ticking live
- 🎅 **Christmas Day message** — a special greeting when the big day arrives
- ❄️ **Animated snowflakes** — falling snow on every visit
- 🌗 **Two themes** — *Dark* (midnight blue + gold) and *Festive* (holly green + Santa red + snow white), toggled with a button fixed in the top-right corner
- 💾 **Persistent theme** — preference saved to `localStorage`
- 📱 **Fully responsive** — works on all screen sizes

---

## 🛠️ Tech Stack

| | |
|---|---|
| **Framework** | Angular 21 — standalone components, signals, no Zone.js |
| **Language** | TypeScript 5.9 |
| **Styling** | SCSS + CSS custom properties for theming |
| **Icons** | Bootstrap Icons |
| **Formatting** | Prettier |
| **Hosting** | Vercel |

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+, npm 10+

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
```

Then open **http://localhost:4200/** in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start local dev server |
| `npm run build` | Production build → `dist/` |
| `npm run watch` | Build in watch mode |

---

## 📁 Project Structure

```
src/
├── app/                        # App shell (routing, config)
├── libs/
│   ├── components/
│   │   └── snowflakes/         # ❄️ Snowflake animation component
│   ├── constants/              # App-wide constants
│   ├── models/                 # TypeScript interfaces
│   ├── pages/
│   │   └── home/               # 🏠 Main countdown page
│   └── services/
│       ├── countdown.service   # ⏱️ Timer logic (signals)
│       └── theme.service       # 🎨 Dark / Festive theme toggle
└── styles/
    └── tokens.scss             # CSS custom properties for both themes
```

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">
  Built with ❤️ and a little Christmas magic 🎁
</div>
