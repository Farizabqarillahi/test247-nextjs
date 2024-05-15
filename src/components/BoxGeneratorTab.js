"use client";
import { useState, useRef, useEffect } from "react";

export default function BoxGeneratorTab() {
  const [count, setCount] = useState(0);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const boxContainerRef = useRef(null);
  const [boxes, setBoxes] = useState([]);

  const boxCount = Math.min(count, 10000); // membatasi box agar tidak lebih dari 10000

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // menetapkan ukuran awal layar

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const inputCount = Math.min(Math.max(e.target.value, 0), 10000);
    setCount(inputCount);
  };

  const handleButtonClick = () => {
    const boxContainer = boxContainerRef.current;
    const padding = 20;
    const gap = 2;
    const panelWidth = 800;
    const panelHeight = 400;
    const maxBoxSize = Math.floor(Math.min(panelWidth, panelHeight) / Math.sqrt(boxCount)); // menghitung ukuran maksimal ukuran box agar fit pada boxcontainer
    const boxSize = Math.max(maxBoxSize - gap, 1); // Pastikan ukuran kotak minimal 1 dan kurangi gapnya
    const boxesPerRow = Math.floor((panelWidth - padding * 2 + gap) / (boxSize + gap)); // Hitung jumlah kotak per baris, dengan memperhitungkan gap dan pad
    const boxesPerCol = Math.floor((panelHeight - padding * 2 + gap) / (boxSize + gap)); // Hitung jumlah kotak per kolom, dengan memperhitungkan gap dan pad
    const actualBoxCount = Math.min(boxCount, boxesPerRow * boxesPerCol); // Hitung jumlah sebenarnya kotak yang dapat fit dalam panel

    boxContainer.style.gridTemplateColumns = `repeat(${boxesPerRow}, ${boxSize}px)`;
    boxContainer.style.gridAutoRows = `${boxSize}px`;
    boxContainer.style.width = `${panelWidth}px`;
    boxContainer.style.height = `${panelHeight}px`;
    boxContainer.style.padding = `${padding}px`;
    boxContainer.style.gap = `${gap}px`;
  
    // mengenerate angka yang hanya dapat ditampung panel
    setBoxes(Array.from({ length: actualBoxCount }, (_, i) => (
      <div
        key={i}
        className="bg-blue-500"
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
        }}
      />
    )));
  };

  useEffect(() => {
    handleButtonClick();
  }, [count, screenSize]);

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center mb-4">
        <input
          type="number"
          className="border p-2"
          value={count}
          onChange={handleInputChange}
          min="0"
          max="10000"
        />
        <button
          className="ml-2 p-2 bg-blue-800 text-white"
          onClick={handleButtonClick}
        >
          Generate Boxes
        </button>
      </div>
      <div
        id="box-container"
        ref={boxContainerRef}
        className="grid gap-0.5 bg-blue-30 box-border"
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {boxes}
      </div>
    </div>
  );
}
