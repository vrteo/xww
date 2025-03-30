"use client";

import {useEffect, useState} from "react";

export default function Page() {
    const imageData = [
        {src: '/img/A.jpeg', credit: 'from @yujunsmile', link: 'https://x.com/yujunsmile '},
        {src: '/img/B.jpg', credit: 'from Skrrsty', link: 'https://x.com/KirstiCats'},
        {src: '/img/C.jpg', credit: 'from andre', link: 'https://x.com/starrijae'},
        {src: '/img/D.png', credit: 'from 별 🌟', link: 'https://x.com/shiningbyeol'},
        {src: '/img/E.jpeg', credit: '', link: 'https://x.com/e'},
        {src: '/img/F.jpeg', credit: '', link: 'https://x.com/f'},
        {src: '/img/G.jpeg', credit: 'from desa', link: 'https://x.com/prettyxikies'},
        {src: '/img/H.JPG', credit: 'from jaylin', link: 'https://x.com/dreamyseeun'},
        {src: '/img/I.jpeg', credit: '', link: 'https://x.com/i'},
        {src: '/img/J.jpeg', credit: '', link: 'https://x.com/j'},
        {src: '/img/K.jpeg', credit: '', link: 'https://x.com/k'},
        {src: '/img/L.jpeg', credit: '', link: 'https://x.com/l'},
        {src: '/img/M.png', credit: 'from DANI', link: 'https://x.com/New_wpegu'},
        {src: '/img/N.jpeg', credit: '', link: 'https://x.com/'},
        {src: '/img/O.png', credit: 'from Zenthi1', link: 'https://x.com/Zenthi'},
        {src: '/img/P.jpg', credit: 'from Siana', link: 'https://x.com/_sixnx_'},
        {src: '/img/Z.jpg', credit: 'from teo', link: 'https://x.com/fixontricky'},
    ];

    const [images, setImages] = useState<{ src: string; width: number; height: number }[]>([]);
    const [selectedImage, setSelectedImage] = useState<{ src: string; credit: string; link: string } | null>(null);
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
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const fetchImageSizes = async () => {
            const loadedImages = await Promise.all(
                imageData.map((data) => {
                    return new Promise<{ src: string; width: number; height: number }>((resolve) => {
                        const img = new Image();
                        img.src = data.src;
                        img.onload = () => {
                            resolve({
                                src: data.src,
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

        // Determine the start drag position
        const clientX = (event as React.MouseEvent).clientX || (event as React.TouchEvent).touches[0].clientX;
        const clientY = (event as React.MouseEvent).clientY || (event as React.TouchEvent).touches[0].clientY;

        setDragStart({x: clientX, y: clientY, rectX: rect.left, rectY: rect.top});
        setDraggingIndex(index);
        setIsDragging(false);
    };

    const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (draggingIndex === null) return;

        const clientX = (event as React.MouseEvent).clientX || (event as React.TouchEvent).touches[0].clientX;
        const clientY = (event as React.MouseEvent).clientY || (event as React.TouchEvent).touches[0].clientY;

        const deltaX = clientX - dragStart.x;
        const deltaY = clientY - dragStart.y;

        setRectangles((prevRectangles) =>
            prevRectangles.map((rect, i) =>
                i === draggingIndex
                    ? {
                        ...rect,
                        left: dragStart.rectX + deltaX,
                        top: dragStart.rectY + deltaY,
                    }
                    : rect
            )
        );

        setIsDragging(true);
    };

    const handleEnd = () => {
        setDraggingIndex(null);
    };

    const handleImageClick = (index: number, event: React.MouseEvent) => {
        if (isDragging) {
            // Prevent the click from opening the popup if dragging occurred
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        const {src, credit, link} = imageData[index];
        setSelectedImage({src, credit, link});
        setIsDragging(false);
    };

    const closePopup = () => setSelectedImage(null);

    return (
        <div
            className="w-screen h-screen bg-cover bg-[url(img/x2kers_bg.jpg)] relative overflow-hidden"
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
        >
            {/* Add the static background text here */}
            <div style={{
                position: "absolute",
                zIndex: 0, // Ensures it stays behind the images
                top: "50%", // Center vertically
                left: "50%", // Center horizontally
                transform: "translate(-50%, -50%)", // Correct centering>
            }}>
                <div
                    style={{
                        fontSize: "1.5rem", // Adjust as needed
                        color: "white", // Semi-transparent white text
                        pointerEvents: "none" // Prevents interaction
                    }}
                >
                    Thank you for the happiest memories we have made together.
                    <br/> Let&#39;s walk together for many more years ❤️
                </div>

                {/*<button*/}
                {/*    onClick={() => alert('Button clicked!')}*/}
                {/*    className="px-4 py-2 text-white font-semibold rounded shadow-md outline-1 hover:outline-2"*/}
                {/*>*/}
                {/*    Click Me*/}
                {/*</button>*/}
            </div>

            <div style={{zIndex: 0}}>

            </div>


            {/* Render draggable images */}
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
                    onClick={(event) => handleImageClick(index, event)}
                />
            ))}

            {/* Image Pop-up */}
            {selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                    onClick={closePopup}
                >
                    <img
                        src={selectedImage.src}
                        alt="Enlarged Preview"
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                            borderRadius: "8px",
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing pop-up when clicking the image
                    />
                    <div
                        className="absolute bottom-0 left-0 right-0 p-2"
                        style={{
                            background: "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
                            color: "white",
                            textAlign: "center",
                            position: "absolute",
                            width: "100%",
                        }}
                    >
                        <a
                            href={selectedImage.link}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                color: "#ffffff",
                                textDecoration: "none",
                                fontWeight: "bold",
                            }}
                        >
                            {selectedImage.credit}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}