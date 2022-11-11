import { ImageProps } from 'next/image';
import image1 from './images/1.png';
import image10 from './images/10.png';
import image11 from './images/11.png';
import image12 from './images/12.png';
import image13 from './images/13.png';
import image14 from './images/14.png';
import image15 from './images/15.png';
import image16 from './images/16.png';
import image17 from './images/17.png';
import image18 from './images/18.png';
import image19 from './images/19.png';
import image2 from './images/2.png';
import image20 from './images/20.png';
import image21 from './images/21.png';
import image22 from './images/22.png';
import image23 from './images/23.png';
import image24 from './images/24.png';
import image25 from './images/25.png';
import image26 from './images/26.png';
import image27 from './images/27.png';
import image28 from './images/28.png';
import image29 from './images/29.png';
import image3 from './images/3.png';
import image30 from './images/30.png';
import image31 from './images/31.png';
import image32 from './images/32.png';
import image33 from './images/33.png';
import image34 from './images/34.png';
import image35 from './images/35.png';
import image36 from './images/36.png';
import image37 from './images/37.png';
import image38 from './images/38.png';
import image39 from './images/39.png';
import image4 from './images/4.png';
import image40 from './images/40.png';
import image5 from './images/5.png';
import image6 from './images/6.png';
import image7 from './images/7.png';
import image8 from './images/8.png';
import image9 from './images/9.png';

interface IData {
  id: number;
  merchant: string;
  amount: string;
  imageSrc: ImageProps['src'];
  spawn: 'top' | 'bottom' | 'left' | 'right';
}

const data: IData[] = [
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
    id: 6,
    merchant: 'Spotify',
    amount: '51.000',
    imageSrc: image6,
    spawn: 'top',
  },
  {
    id: 7,
    merchant: 'Netflix',
    amount: '60.000',
    imageSrc: image7,
    spawn: 'top',
  },
  {
    id: 8,
    merchant: 'YouTube Premium',
    amount: '49.000',
    imageSrc: image8,
    spawn: 'top',
  },
  {
    id: 9,
    merchant: 'Steam Wallet',
    amount: '67.000',
    imageSrc: image9,
    spawn: 'top',
  },
  {
    id: 10,
    merchant: 'Airbnb',
    amount: '458.000',
    imageSrc: image10,
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
  {
    id: 16,
    merchant: 'Zara',
    amount: '321.743',
    imageSrc: image16,
    spawn: 'bottom',
  },
  {
    id: 17,
    merchant: 'Docmart',
    amount: '1.400.000',
    imageSrc: image17,
    spawn: 'bottom',
  },
  {
    id: 18,
    merchant: 'Uniqlo',
    amount: '251.780',
    imageSrc: image18,
    spawn: 'bottom',
  },
  {
    id: 19,
    merchant: 'Tokopedia',
    amount: '200.100',
    imageSrc: image19,
    spawn: 'bottom',
  },
  {
    id: 20,
    merchant: 'Shopee',
    amount: '45.890',
    imageSrc: image20,
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
    id: 26,
    merchant: 'Dunkin Donut',
    amount: '70.890',
    imageSrc: image26,
    spawn: 'right',
  },
  {
    id: 27,
    merchant: 'Taco Bell',
    amount: '632.000',
    imageSrc: image27,
    spawn: 'right',
  },
  {
    id: 28,
    merchant: 'Yoshinoya',
    amount: '73.927',
    imageSrc: image28,
    spawn: 'right',
  },
  {
    id: 29,
    merchant: "Domino's Pizza",
    amount: '120.823',
    imageSrc: image29,
    spawn: 'right',
  },
  {
    id: 30,
    merchant: 'Hokben',
    amount: '64.882',
    imageSrc: image30,
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
  {
    id: 36,
    merchant: 'Tech in Asia',
    amount: '65.000',
    imageSrc: image36,
    spawn: 'left',
  },
  {
    id: 37,
    merchant: 'Notion',
    amount: '120.923',
    imageSrc: image37,
    spawn: 'left',
  },
  {
    id: 38,
    merchant: 'Bibit',
    amount: '1.000.000',
    imageSrc: image38,
    spawn: 'left',
  },
  {
    id: 39,
    merchant: 'Stockbit',
    amount: '5.000.000',
    imageSrc: image39,
    spawn: 'left',
  },
  {
    id: 40,
    merchant: 'OVO TOPUP',
    amount: '100.000',
    imageSrc: image40,
    spawn: 'left',
  },
];

export default data;
