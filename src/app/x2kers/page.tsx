"use client";

import { useEffect, useState } from "react";

export default function Page() {
    const imagePaths = [
        '/img/A.jpeg',
        '/img/B.jpg',
        '/img/C.jpg',
        '/img/D.png',
        '/img/E.jpeg',
        '/img/F.jpeg',
        '/img/G.jpeg',
        '/img/H.JPG',
        '/img/I.jpeg',
        '/img/J.jpeg',
        '/img/K.jpeg',
        '/img/L.jpeg',
        '/img/M.png',
        '/img/N.jpeg',
        '/img/O.png',
        '/img/P.jpg',
    ];

    const [images, setImages] = useState<{ src: string; width: number; height: number }[]>([]);
    const [rectangles, setRectangles] = useState<Array<{
        backgroundImage: string;
        backgroundSize: string;
        backgroundPosition: string;
        width: number;
        height: number;
        top: number;
        left: number;
        zIndex: number;
        border: string;
        transform: string;
        boxShadow: string;
    }>>([]);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [dragStart, setDragStart] = useState<{ x: number; y: number; rectX: number; rectY: number }>({
        x: 0,
        y: 0,
        rectX: 0,
        rectY: 0,
    });

    useEffect(() => {
        const fetchImageSizes = async () => {
            const loadedImages = await Promise.all(
                imagePaths.map((path) => {
                    return new Promise<{ src: string; width: number; height: number }>((resolve) => {
                        const img = new Image();
                        img.src = path;
                        img.onload = () => {
                            resolve({
                                src: path,
                                width: img.naturalWidth,
                                height: img.naturalHeight,
                            });
                        };
                    });
                })
            );
            setImages(loadedImages);
        };

        fetchImageSizes();
    }, []);

    useEffect(() => {
        if (!images.length) return;

        const generateRectangles = () => {
            const newRectangles = [];
            for (let i = 0; i < images.length; i++) {

                const baseMultiplier = window.innerWidth > 768 ? 0.1 : 0.2;
                const sizeMultiplier = baseMultiplier + 0.05;

                const image = images[i % images.length];

                const randomWidth = window.innerWidth * sizeMultiplier;
                const aspectRatio = image.height / image.width;
                const randomHeight = randomWidth * aspectRatio;
                const randomRotation = Math.random() * 20 - 10; // Rotation between -10deg and 10deg

                const randomTop = Math.random() * (window.innerHeight - randomHeight);
                const randomLeft = Math.random() * (window.innerWidth - randomWidth);

                const borderWidth = window.innerWidth > 768 ? "6px" : "4px"; // Thicker border for larger screens

                newRectangles.push({
                    backgroundImage: `url(${image.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: randomWidth,
                    height: randomHeight,
                    top: randomTop,
                    left: randomLeft,
                    zIndex: i,
                    border: `${borderWidth} solid white`,
                    transform: `rotate(${randomRotation}deg)`,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)"
                });
            }

            setRectangles(newRectangles);
        };

        generateRectangles();
    }, [images]);

    const handleStart = (index: number, event: React.MouseEvent | React.TouchEvent) => {
        const rect = rectangles[index];

        // Check if the event is a touch or mouse event
        const clientX = (event as React.TouchEvent).touches
            ? (event as React.TouchEvent).touches[0].clientX
            : (event as React.MouseEvent).clientX;

        const clientY = (event as React.TouchEvent).touches
            ? (event as React.TouchEvent).touches[0].clientY
            : (event as React.MouseEvent).clientY;

        setDraggingIndex(index);
        setDragStart({
            x: clientX,
            y: clientY,
            rectX: rect.left,
            rectY: rect.top,
        });
    };

    const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (draggingIndex === null) return;

        const { x, y, rectX, rectY } = dragStart;

        const clientX = (event as React.TouchEvent).touches
            ? (event as React.TouchEvent).touches[0].clientX
            : (event as React.MouseEvent).clientX;

        const clientY = (event as React.TouchEvent).touches
            ? (event as React.TouchEvent).touches[0].clientY
            : (event as React.MouseEvent).clientY;

        const deltaX = clientX - x;
        const deltaY = clientY - y;

        setRectangles((prev) =>
            prev.map((rect, i) =>
                i === draggingIndex
                    ? {
                        ...rect,
                        top: rectY + deltaY,
                        left: rectX + deltaX,
                    }
                    : rect
            )
        );
    };

    const handleEnd = () => {
        setDraggingIndex(null);
    };

    return (
        <div
            className="w-screen h-screen bg-cover bg-[url(img/x2kers_bg.jpg)] relative overflow-hidden"
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
        >
            {rectangles.map((style, index) => (
                <div
                    key={index}
                    style={{
                        ...style,
                        position: "absolute",
                        top: style.top,
                        left: style.left,
                        width: `${style.width}px`,
                        height: `${style.height}px`,
                    }}
                    onMouseDown={(event) => handleStart(index, event)}
                    onTouchStart={(event) => handleStart(index, event)}
                />
            ))}
        </div>
    );
}