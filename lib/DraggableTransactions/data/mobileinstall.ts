import { ImageProps } from 'next/image';
import image1 from './images/1.png';
import image11 from './images/11.png';
import image12 from './images/12.png';
import image13 from './images/13.png';
import image14 from './images/14.png';
import image15 from './images/15.png';
import image2 from './images/2.png';
import image3 from './images/3.png';
import image4 from './images/4.png';
import image5 from './images/5.png';

interface IData {
  id: number;
  merchant: string;
  amount: string;
  imageSrc: ImageProps['src'];
  spawn: 'top' | 'bottom' | 'left' | 'right';
}

const mobileinstall: IData[] = [
  {
    id: 1,
    merchant: 'Family Mart',
    amount: '20.000',
    imageSrc: image1,
    spawn: 'top',
  },
  {
    id: 2,
    merchant: 'TOPUP Gopay',
    amount: '150.000',
    imageSrc: image2,
    spawn: 'top',
  },
  {
    id: 3,
    merchant: 'Ayam Pak Gembus',
    amount: '25.200',
    imageSrc: image3,
    spawn: 'top',
  },
  {
    id: 4,
    merchant: 'Daily Bento, BSD',
    amount: '35.175',
    imageSrc: image4,
    spawn: 'top',
  },
  {
    id: 5,
    merchant: "McDonald's",
    amount: '46.000',
    imageSrc: image5,
    spawn: 'top',
  },
  {
    id: 11,
    merchant: 'Apple App Store',
    amount: '159.000',
    imageSrc: image11,
    spawn: 'bottom',
  },
  {
    id: 12,
    merchant: 'KFC',
    amount: '72.500',
    imageSrc: image12,
    spawn: 'bottom',
  },
  {
    id: 13,
    merchant: 'Alfamart',
    amount: '43.700',
    imageSrc: image13,
    spawn: 'bottom',
  },
  {
    id: 14,
    merchant: 'Ranchmarket',
    amount: '69.400',
    imageSrc: image14,
    spawn: 'bottom',
  },
  {
    id: 15,
    merchant: 'Starbucks',
    amount: '70.800',
    imageSrc: image15,
    spawn: 'bottom',
  },
];

export default mobileinstall;
