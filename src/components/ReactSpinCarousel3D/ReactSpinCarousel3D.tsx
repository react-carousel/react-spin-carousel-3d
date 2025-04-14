import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./ReactSpinCarousel3D.module.css";

export interface BaseCarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  width?: string | number;
  height?: string | number;
  itemWidth?: string | number;
  accentColor?: string;
  backgroundColor?: string;
  initialActiveIndex?: number;
  isAutoPlay?: boolean;
  autoPlayInterval?: number;
  showRadioButtons?: boolean;
  customRadioButtons?: (
    index: number,
    isActive: boolean,
    setActiveIndex: (index: number) => void
  ) => React.ReactNode;
  radioButtonStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  onItemClick?: (item: T, index: number) => void;
  displayMode?: "image" | "card";
  imageFit?: "cover" | "contain" | "fill";
  imagePosition?: string;
}

export interface CardModeProps<T> extends BaseCarouselProps<T> {
  displayMode?: "card";
}

export interface ImageModeProps<T> extends BaseCarouselProps<T> {
  displayMode: "image";
  imageFit?: "cover" | "contain" | "fill";
  imagePosition?: string;
}

export type CarouselProps<T> = CardModeProps<T> | ImageModeProps<T>;

const DEFAULT_ITEM_WIDTH_VALUE = 300;

const ReactSpinCarousel3D = <T,>({
  data,
  renderItem,
  width = "100vw",
  height = 300,
  itemWidth = DEFAULT_ITEM_WIDTH_VALUE,
  accentColor = "hsl(204, 5%, 38%)",
  backgroundColor = "#F5F5F5",
  initialActiveIndex = Math.floor(data.length / 2),
  isAutoPlay = false,
  autoPlayInterval = 5000,
  showRadioButtons = true,
  customRadioButtons,
  radioButtonStyle = {},
  containerStyle = {},
  itemStyle = {},
  onItemClick,
  displayMode = "card",
  imageFit = "cover",
  imagePosition = "center",
}: CarouselProps<T>) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleItemClick = useCallback(
    (item: T, index: number) => {
      if (onItemClick) {
        onItemClick(item, index);
      }
    },
    [onItemClick]
  );

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && !isPaused && !isDragging) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isPaused, isAutoPlay, data.length, autoPlayInterval, isDragging]);

  // Touch and mouse event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      setCurrentX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      const dragDistance = startX - currentX;
      if (Math.abs(dragDistance) > 50) {
        if (dragDistance > 0) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
        } else {
          setActiveIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
          );
        }
      }
      setIsDragging(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setCurrentX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsPaused(false);
    if (isDragging) {
      const dragDistance = startX - currentX;
      if (Math.abs(dragDistance) > 50) {
        if (dragDistance > 0) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
        } else {
          setActiveIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
          );
        }
      }
      setIsDragging(false);
    }
  };

  return (
    <section
      className={styles.carouselContainer}
      style={
        {
          width: typeof width === "number" ? `${width}px` : width,
          "--accent-color": accentColor,
          "--background-color": backgroundColor,
          "--image-fit": imageFit,
          "--image-position": imagePosition,

          ...containerStyle,
        } as React.CSSProperties
      }
    >
      <div
        className={styles.itemsContainer}
        style={
          {
            height: typeof height === "number" ? `${height}px` : height,
            "--item-width":
              typeof itemWidth === "number"
                ? itemWidth
                : parseFloat(itemWidth) || 0,
          } as React.CSSProperties
        }
      >
        {data.map((item, index) => {
          const rotation = activeIndex - index;
          const itemTransformValue =
            typeof itemWidth === "number"
              ? itemWidth
              : parseFloat(itemWidth) || 0;

          return (
            <div
              key={index}
              className={`${styles.carouselItem} ${
                displayMode === "image" ? styles.imageMode : styles.cardMode
              }`}
              style={
                {
                  "--item-width": itemTransformValue,
                  transform: `
                      translateX(-50%) 
                      rotateY(${rotation * -10}deg) 
                      translateX(${rotation * -itemTransformValue}px)
                    `,
                  zIndex: data.length - Math.abs(rotation),
                  backgroundColor:
                    displayMode === "card" ? backgroundColor : "transparent",
                  transition: isDragging
                    ? "none"
                    : "transform 0.5s ease-in-out",
                  ...itemStyle,
                } as React.CSSProperties
              }
              onClick={() => handleItemClick(item, index)}
              onMouseEnter={() => setIsPaused(true)}
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {renderItem(item, index)}
            </div>
          );
        })}
      </div>

      {customRadioButtons ? (
        <div className={styles.radioButtonsContainer}>
          {data.map((_, index) => (
            <React.Fragment key={index}>
              {customRadioButtons(index, activeIndex === index, setActiveIndex)}
            </React.Fragment>
          ))}
        </div>
      ) : showRadioButtons ? (
        <div className={styles.radioButtonsContainer}>
          {data.map((_, index) => (
            <input
              type="radio"
              name={`carousel-${Math.random().toString(36).substring(2, 9)}`}
              className={styles.radioButton}
              checked={activeIndex === index}
              onChange={() => setActiveIndex(index)}
              style={{
                ...radioButtonStyle,
                borderColor: accentColor,
              }}
              key={index}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ReactSpinCarousel3D;
