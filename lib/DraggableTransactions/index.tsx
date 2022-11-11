'use client';
import ClientOnly from '$hooks/ClientOnly';
import { motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

export interface IDraggableTransactions
  extends React.ComponentPropsWithRef<'div'> {
  merchant: string;
  amount: string;
  imageSrc: ImageProps['src'];
  spawn: 'top' | 'bottom' | 'left' | 'right';
  customRef: React.RefObject<HTMLDivElement>;
}

interface ICoordinates {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const DraggableTransactions: React.FC<IDraggableTransactions> = ({
  merchant,
  amount,
  imageSrc,
  spawn,
  customRef,
}) => {
  const getWindowDimensions = () => {
    let height = 0,
      width = 0;
    if (typeof window !== 'undefined') {
      const { innerWidth, innerHeight } = window;
      width = innerWidth;
      height = innerHeight;
    }
    return {
      height,
      width,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const upperBound = -45;
    const lowerBound = 45;
    setDegree(Math.random() * (upperBound - lowerBound) + lowerBound);
  }, []);

  const renderSpawnCoor = (): ICoordinates => {
    const randomHeight = Math.random() * windowDimensions.height;
    const randomWidth = Math.random() * windowDimensions.width;
    switch (spawn) {
      case 'top':
        return {
          top: `0px`,
          left: `${randomWidth}px`,
        };

      case 'bottom':
        return {
          bottom: `0px`,
          left: `${randomWidth}px`,
        };

      case 'left':
        return {
          left: `0px`,
          top: `${randomHeight}px`,
        };

      case 'right':
        return {
          right: `0px`,
          top: `${randomHeight}px`,
        };
    }
  };

  return (
    <ClientOnly>
      <motion.div
        drag={true}
        dragConstraints={customRef}
        style={{
          transform: `rotate(${degree}deg)`,
          ...renderSpawnCoor(),
          position: 'absolute',
          width: 'fit-content',
        }}
        animate={{ rotate: degree }}
        initial={false}
        key={JSON.stringify(windowDimensions)}
        className={styles.container}
      >
        <Image
          src={imageSrc}
          width={30}
          height={30}
          quality={100}
          alt=""
          className={styles.imageContainer}
          draggable={false}
        />
        <div className={styles.containerText}>
          <p className={styles.label}>{merchant}</p>
          <p className={styles.text}>
            <b>Rp.</b> {amount}
          </p>
        </div>
      </motion.div>
    </ClientOnly>
  );
};

export default DraggableTransactions;
