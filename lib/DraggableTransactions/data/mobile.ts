import { ImageProps } from 'next/image';
import image1 from './images/1.png';
import image11 from './images/11.png';
import image12 from './images/12.png';
import image13 from './images/13.png';
import image14 from './images/14.png';
import image15 from './images/15.png';
import image2 from './images/2.png';
import image21 from './images/21.png';
import image22 from './images/22.png';
import image23 from './images/23.png';
import image24 from './images/24.png';
import image25 from './images/25.png';
import image3 from './images/3.png';
import image31 from './images/31.png';
import image32 from './images/32.png';
import image33 from './images/33.png';
import image34 from './images/34.png';
import image35 from './images/35.png';
import image4 from './images/4.png';
import image5 from './images/5.png';

interface IData {
  id: number;
  merchant: string;
  amount: string;
  imageSrc: ImageProps['src'];
  spawn: 'top' | 'bottom' | 'left' | 'right';
}

const mobiledata: IData[] = [
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
    merchant: "McDonald's Indonesia",
    amount: '46.000',
    imageSrc: image5,
    spawn: 'top',
  },
  {
    id: 11,
    merchant: 'Apple',
    amount: '159.000',
    imageSrc: image11,
    spawn: 'bottom',
  },
  {
    id: 12,
    merchant: 'KFC Indonesia',
    amount: '72.500',
    imageSrc: image12,
    spawn: 'bottom',
  },
  {
    id: 13,
    merchant: 'Alfamart Indonesia',
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
  {
    id: 21,
    merchant: 'Lazada',
    amount: '159.928',
    imageSrc: image21,
    spawn: 'right',
  },
  {
    id: 22,
    merchant: 'Coffee Bean',
    amount: '67.312',
    imageSrc: image22,
    spawn: 'right',
  },
  {
    id: 23,
    merchant: 'Nike',
    amount: '890.831',
    imageSrc: image23,
    spawn: 'right',
  },
  {
    id: 24,
    merchant: 'Pizza Hut',
    amount: '150.000',
    imageSrc: image24,
    spawn: 'right',
  },
  {
    id: 25,
    merchant: 'Sushi Tei',
    amount: '203.201',
    imageSrc: image25,
    spawn: 'right',
  },
  {
    id: 31,
    merchant: 'Adidas',
    amount: '750.000',
    imageSrc: image31,
    spawn: 'left',
  },
  {
    id: 32,
    merchant: 'Subway',
    amount: '43.270',
    imageSrc: image32,
    spawn: 'left',
  },
  {
    id: 33,
    merchant: "Auntie Anne's",
    amount: '42.122',
    imageSrc: image33,
    spawn: 'left',
  },
  {
    id: 34,
    merchant: 'Baskin Robin',
    amount: '92.122',
    imageSrc: image34,
    spawn: 'left',
  },
  {
    id: 35,
    merchant: 'Marugame Udon',
    amount: '77.842',
    imageSrc: image35,
    spawn: 'left',
  },
];

export default mobiledata;
