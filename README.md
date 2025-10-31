# Tree Information QR Viewer 🌳

This is a simple, fast, and free web application that displays information about trees in Sri Lanka. It is designed to be linked from a physical QR code placed near a tree.

When a user scans the QR code, their phone opens a web page showing that specific tree's details, including its name, scientific name, and uses.

## 🚀 Live Demo

You can view the live project here:
**[https://hansaka1996.github.io/qr-viewer/](https://hansaka1996.github.io/qr-viewer/)**

*(You can add a screenshot of your app's homepage or an item page here!)*

## ✨ Features

* **Static & Fast:** Built as a single-page React app and hosted for free on GitHub Pages.
* **Dynamic Data:** Reads all tree information from a simple `data.json` file.
* **Direct Linking:** Uses `HashRouter` so that direct URLs (like `.../#/item/1`) work perfectly from a QR code.
* **Simple Admin:** No backend or database is needed. All data is managed by editing one file.

## 🧑‍💻 How to Add or Change Items (Your "Admin" Workflow)

This project is managed by updating the files in the `public` folder.

1.  **Add Your Image:** Place your new image file (e.g., `newItem.jpg`) into the `public/images` folder.
2.  **Add Your Data:** Open the `public/data.json` file and add a new JSON object for your item. Remember to give it a new `id` and the correct `imageUrl`.
3.  **Deploy:** From your local computer terminal, run the deploy command:
    ```bash
    npm run deploy
    ```
4.  **Create QR Code:** Your new item's URL will be `https://hansaka1996.github.io/qr-viewer/#/item/YOUR-NEW-ID`. Paste this link into a QR code generator to get your new code.

## 🛠️ How to Run This Project Locally

1.  **Clone the repo:** `git clone https://github.com/hansaka1996/qr-viewer.git`
2.  **Go into the folder:** `cd qr-viewer`
3.  **Install packages:** `npm install`
4.  **Run the app:** `npm start`