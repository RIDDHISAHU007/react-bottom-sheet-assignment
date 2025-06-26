import React, { useRef, useState, useEffect } from 'react';
import './BottomSheet.css';

const snapPoints = {
  closed: 15,
  half: 50,
  full: 90,
};

export default function BottomSheet() {
  const sheetRef = useRef(null);
  const [position, setPosition] = useState(snapPoints.closed);
  const [dragging, setDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startTranslate, setStartTranslate] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!dragging) {
      sheetRef.current.style.transition = 'transform 0.3s ease-out';
      sheetRef.current.style.transform = `translateY(${100 - position}vh)`;
    }
  }, [position, dragging]);

  const handleStart = (clientY) => {
    setDragging(true);
    setStartY(clientY);
    setStartTranslate(100 - position);
    sheetRef.current.style.transition = 'none';
  };

  const handleMove = (clientY) => {
    if (!dragging) return;
    const deltaY = clientY - startY;
    const vhDelta = (deltaY / window.innerHeight) * 100;
    let newTranslate = startTranslate + vhDelta;
    newTranslate = Math.min(80, Math.max(10, newTranslate));
    sheetRef.current.style.transform = `translateY(${newTranslate}vh)`;
  };

  const handleEnd = () => {
    if (!dragging) return;
    setDragging(false);
    const currentVh = 100 - parseFloat(sheetRef.current.style.transform.match(/translateY\(([^)]+)vh\)/)[1]);
    const snapTo = getClosestSnapPoint(currentVh);
    setPosition(snapTo);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    handleStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientY);

    const handleMouseMove = (e) => {
      if (!dragging) return;
      const deltaY = e.clientY - startY;
      const vhChange = (deltaY / window.innerHeight) * 100;
      const currentVh = position - vhChange;
      const newTranslate = Math.min(100, Math.max(0, 100 - currentVh));
      sheetRef.current.style.transform = `translateY(${newTranslate}vh)`;
    };

    const handleMouseUp = () => {
      handleEnd();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getClosestSnapPoint = (vh) => {
    const points = Object.values(snapPoints);
    return points.reduce((prev, curr) =>
      Math.abs(curr - vh) < Math.abs(prev - vh) ? curr : prev
    );
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="theme-toggle">
        <label>
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <span>{darkMode ? '🌙 Dark' : '☀️ Light'} Mode</span>
        </label>
      </div>

      <div className="buttons">
        <button onClick={() => setPosition(snapPoints.closed)}>Close</button>
        <button onClick={() => setPosition(snapPoints.half)}>Half</button>
        <button onClick={() => setPosition(snapPoints.full)}>Open</button>
      </div>
{position !== snapPoints.closed && <div className="backdrop"></div>}
      <div
        ref={sheetRef}
        className="bottom-sheet"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="handle" onMouseDown={handleMouseDown} style={{ cursor: 'grab' }} />
        <div className="sheet-content">
          <h2 className="sheet-title">Assignment by Riddhi ✨</h2>
          <p className="sheet-description">
            This bottom sheet UI was developed from scratch using React for the Flam company assignment.
            You can interact with the sheet by dragging the handle with your mouse or using the buttons provided.
          </p>

          <div className="card">
            <h3>📱 Responsive Design</h3>
            <p>Works on all screen sizes with smooth gestures.</p>
          </div>

          <div className="card">
            <h3>🧭 Drag & Snap</h3>
            <p>Drag the handle or use buttons to snap to closed, half, or full view.</p>
          </div>

          <div className="card">
            <h3>🎨 Light/Dark Theme</h3>
            <p>Switch easily between light and dark modes.</p>
          </div>
        </div>
      </div>

      <div className="intro-content">
        <h1>React Bottom Sheet UI</h1>
        <p>This project demonstrates manual implementation of a smooth, draggable bottom sheet using React Hooks and spring-like snapping animations.</p>
        <p>Built for the Flam frontend assignment.</p>
      </div>
    </div>
  );
}
