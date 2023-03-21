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

export const RenderMerchant = ({
  merchantId,
  direction,
  merchantName,
}: {
  merchantId: string;
  direction: 'IN' | 'OUT';
  merchantName: string;
}) => {
  const fontAwesomeSize: SizeProp = 'xl';

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
        size={30}
      />
    );
  }
};

export const RenderActualMerchant = ({
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
      const image = await import(`$public/merchant/${merchantId}.png`);
      setImageSrc(image.default);
    };
    importImage();
  }, [merchantId]);

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
};
