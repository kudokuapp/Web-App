'use client';

import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleQuestion,
  faHandHoldingDollar,
  faMoneyBillTransfer,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { IRenderMerchantImage } from './index.d';

const RenderMerchantImage: React.FC<IRenderMerchantImage> = ({
  merchantId,
  direction = 'OUT',
  merchantName,
  size = 30,
}) => {
  const renderFontAwesomeSize = () => {
    if (size === 20) {
      return 'lg';
    } else if (size === 30) {
      return 'xl';
    } else if (size === 40) {
      return '2xl';
    } else {
      return 'sm';
    }
  };
  const fontAwesomeSize: SizeProp = renderFontAwesomeSize();

  if (merchantId === '640ff9670ce7b9e3754d332d') {
    // INTERNAL TRANSFER
    if (direction === 'IN') {
      return (
        <FontAwesomeIcon
          icon={faMoneyBillTransfer}
          className="text-green-500"
          size={fontAwesomeSize}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faMoneyBillTransfer}
          className="text-red-500"
          size={fontAwesomeSize}
        />
      );
    }
  } else if (merchantId === '640ff9450ce7b9e3754d332c') {
    // RECONCILE
    if (direction === 'IN') {
      return (
        <FontAwesomeIcon
          icon={faHandHoldingDollar}
          className="text-green-500"
          size={fontAwesomeSize}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faHandHoldingDollar}
          className="text-red-500"
          size={fontAwesomeSize}
        />
      );
    }
  } else if (merchantId === '63d8b775d3e050940af0caf1') {
    // UNDEFINED
    return (
      <FontAwesomeIcon
        icon={faCircleQuestion}
        className="text-gray-500"
        size={fontAwesomeSize}
      />
    );
  } else {
    // MERCHANT
    return (
      <RenderActualMerchant
        merchantId={merchantId}
        merchantName={merchantName}
        size={size}
      />
    );
  }
};

export default RenderMerchantImage;

const RenderActualMerchant = ({
  merchantId,
  merchantName,
  size,
}: {
  merchantId: string;
  merchantName: string;
  size: number;
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const importImage = async () => {
      try {
        const image = await import(`$public/merchant/${merchantId}.png`);
        setImageSrc(image.default);
      } catch (error) {
        // Handle the error here, e.g. by logging it or setting a default image
        setImageSrc(null);
        console.error(
          `Failed to import image for merchant ${merchantName}: ${error}`
        );
      }
    };
    importImage();
  }, [merchantId, merchantName]);

  try {
    if (imageSrc) {
      return (
        <Image
          src={imageSrc}
          alt={`${merchantName} logo`}
          width={size}
          height={size}
          draggable={false}
          quality={100}
        />
      );
    } else {
      // Logo is not yet available
      return (
        <FontAwesomeIcon
          icon={faCircleQuestion}
          className="text-gray-500"
          size={'xl'}
        />
      );
    }
  } catch (error) {
    console.error(`Failed to render merchant image: ${error}`);
    return null;
  }
};
