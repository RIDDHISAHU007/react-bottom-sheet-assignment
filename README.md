# React Spring Bottom Sheet UI

> Developed by **Riddhi** for the **Flam** frontend assignment 🚀

## 📱 Features

- 📦 Fully custom React bottom sheet — no third-party sheet libraries used
- 🧭 Drag & Snap to multiple snap points (Closed, Half, Full)
- 💫 Smooth spring-like animations using only CSS and JS
- 💡 Light/Dark mode toggle
- 🧊 Backdrop blur when sheet is open
- 🎯 Responsive across mobile and desktop

## 🧪 Technologies Used

- React with Hooks
- Plain CSS (No Tailwind/Bootstrap)
- `useRef`, `useEffect`, and event handlers for gesture support

## 📷 Preview

![screenshot](./preview.png) <!-- optional: add screenshot here if you take one -->

## 🖱️ How to Interact

- **Drag** the handle to move the bottom sheet
- Or click the **Open**, **Half**, or **Close** buttons on screen
- Switch between **Light/Dark mode** using the top-right toggle

## 🛠️ Setup & Run Locally

```bash
git clone https://github.com/your-username/react-bottom-sheet-assignment.git
cd react-bottom-sheet-assignment
npm install
npm start
src/
├── BottomSheet.js
├── BottomSheet.css
└── App.js
## key snippets of code
 Smooth Transition with useEffect
js
Copy code
useEffect(() => {
  if (!dragging) {
    sheetRef.current.style.transition = 'transform 0.3s ease-out';
    sheetRef.current.style.transform = `translateY(${100 - position}vh)`;
  }
}, [position, dragging]);

const handleMouseMove = (e) => {
      if (!dragging) return;
      const deltaY = e.clientY - startY;
      const vhChange = (deltaY / window.innerHeight) * 100;
      const currentVh = position - vhChange;
      const newTranslate = Math.min(100, Math.max(0, 100 - currentVh));
      sheetRef.current.style.transform = `translateY(${newTranslate}vh)`;
    };
