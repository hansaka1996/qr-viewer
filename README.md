# Tree Information QR Viewer 🌳

A fast, beautiful, and mobile-optimized web application for displaying information about trees in Sri Lanka. Designed to be linked from physical QR codes placed near trees.

## 🚀 Live Demo

**[https://hansaka1996.github.io/qr-viewer/](https://hansaka1996.github.io/qr-viewer/)**

## ✨ Features

### Core Features
* **Static & Fast:** Built as a single-page React app, hosted for free on GitHub Pages
* **Dynamic Data:** All tree information managed through a simple `data.json` file
* **Direct QR Code Linking:** Uses HashRouter so URLs like `.../#/item/1` work perfectly from QR codes
* **No Backend Required:** Simple file-based management, no database needed

### New Improvements ✨
* **🔍 Search Functionality:** Search by Sinhala name, common name, or scientific name
* **🏷️ Filter by Type:** Filter trees by Native, Exotic, or Endemic
* **📊 Statistics Dashboard:** See counts of different tree types at a glance
* **🖼️ Image Thumbnails:** Beautiful card-based layout with tree images
* **📱 Mobile Optimized:** Touch-friendly interface perfect for outdoor use
* **💾 Progressive Web App (PWA):** Install on your phone for offline access
* **⚡ Loading States:** Smooth loading animations and skeleton screens
* **🎨 Modern UI:** Clean, professional design with smooth animations
* **♿ Accessibility:** Keyboard navigation and screen reader support
* **📤 Share Button:** Easy sharing via native share or copy link
* **⭐ Favorites:** Save your favorite trees (stored locally)
* **🖨️ Print Support:** Print-friendly tree information pages
* **🔗 Related Trees:** Discover similar trees automatically
* **🌓 Image Zoom:** Click images for full-screen view
* **404 Page:** Friendly error page for invalid URLs

## 📱 Mobile Features

* Large touch targets for easy tapping
* Optimized for outdoor reading with high contrast
* Fast image loading with lazy loading
* Works offline after first visit (PWA)
* Add to home screen capability
* Responsive design for all screen sizes

## 🛠️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hansaka1996/qr-viewer.git
   ```

2. **Navigate to the folder:**
   ```bash
   cd qr-viewer
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open in browser:**
   - The app will open at `http://localhost:3000`

## 🌳 Adding New Trees (Admin Workflow)

### Step 1: Prepare Your Image
1. Add your tree image to the `public/images` folder
2. Recommended: Use `.webp` format for best performance
3. Recommended size: 800x600px or similar aspect ratio

### Step 2: Update data.json
Open `public/data.json` and add a new entry:

```json
{
  "id": "26",
  "sinhalaName": "Your Tree Name in Sinhala",
  "commonName": "Common English Name",
  "scientificName": "Scientific Name",
  "family": "Family Name",
  "type": "Native",
  "edibility": "Edible",
  "ediblePart": "Fruit",
  "uses": "Description of uses",
  "ecologicalImportance": "Ecological benefits",
  "imageUrl": "images/your-image.webp"
}
```

### Step 3: Deploy
```bash
npm run deploy
```

### Step 4: Generate QR Code
Your new tree will be accessible at:
```
https://hansaka1996.github.io/qr-viewer/#/item/26
```

Use this URL in any QR code generator to create your QR code.

## 📝 Data Structure

Each tree in `data.json` should have these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| sinhalaName | string | Yes | Name in Sinhala |
| commonName | string | Yes | Common English name |
| scientificName | string | Yes | Scientific name |
| family | string | Yes | Botanical family |
| type | string | Yes | "Native", "Exotic", or "Endemic" |
| edibility | string | Yes | "Edible" or "Non-edible" |
| ediblePart | string | Yes | Which part is edible (or "–") |
| uses | string | Yes | Description of uses |
| ecologicalImportance | string | Yes | Ecological benefits |
| imageUrl | string | Yes | Path to image (e.g., "images/tree.webp") |

## 🎨 Customization

### Change Colors
Edit the color scheme in `Home.js` and `ItemView.js`:
- Primary color: `#667eea` (purple)
- Secondary color: `#764ba2` (dark purple)

### Modify Layout
Grid layouts and card styles are defined inline in the components for easy customization.

## 🚀 Deployment

The app is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This will:
1. Build the production version
2. Deploy to the `gh-pages` branch
3. Make it live at your GitHub Pages URL

## 📦 Technologies Used

* **React 19** - UI framework
* **React Router** - Navigation
* **GitHub Pages** - Free hosting
* **PWA** - Offline support

## 🔧 Browser Support

* Chrome (recommended)
* Safari
* Firefox
* Edge
* Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 💡 Tips

* **Image optimization:** Use WebP format for smaller file sizes
* **QR codes:** Generate high-quality QR codes for better scanning
* **Testing:** Always test QR codes before printing
* **Backup:** Keep a backup of your `data.json` file
* **Updates:** Pull latest changes before adding new trees

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

Made with 🌳 for Sri Lankan trees