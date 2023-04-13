'use client';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBicycle,
  faBlender,
  faCar,
  faCat,
  faChartLine,
  faCheckSquare,
  faChevronDown,
  faDice,
  faGamepad,
  faGasPump,
  faGift,
  faGlassCheers,
  faGraduationCap,
  faGrinBeam,
  faHandHoldingUsd,
  faHeartbeat,
  faHouseDamage,
  faHouseUser,
  faLaptopCode,
  faLightbulb,
  faMarsStrokeH,
  faMobileAlt,
  faMotorcycle,
  faNewspaper,
  faPaintRoller,
  faParking,
  faPizzaSlice,
  faPlaneDeparture,
  faPlayCircle,
  faQuestion,
  faRoad,
  faShoppingCart,
  faSmoking,
  faSnowboarding,
  faStethoscope,
  faTaxi,
  faTicketAlt,
  faTrain,
  faTShirt,
  faUsers,
  faUtensils,
  faWifi,
  faWineBottle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import type { IRenderCategory } from './index.d';

const RenderCategory: React.FC<IRenderCategory> = ({ category, select }) => {
  switch (category) {
    /**
     * Good Life
     */
    case 'Apps, Games & Software':
      return (
        <Category
          category={category}
          icon={faGamepad}
          type="Good Life"
          select={select}
        />
      );
    case 'Booze':
      return (
        <Category
          category={category}
          icon={faWineBottle}
          type="Good Life"
          select={select}
        />
      );
    case 'Events & Gigs':
      return (
        <Category
          category={category}
          icon={faTicketAlt}
          type="Good Life"
          select={select}
        />
      );
    case 'Hobbies':
      return (
        <Category
          category={category}
          icon={faSnowboarding}
          type="Good Life"
          select={select}
        />
      );
    case 'Holidays & Travel':
      return (
        <Category
          category={category}
          icon={faPlaneDeparture}
          type="Good Life"
          select={select}
        />
      );
    case 'Lottery & Gambling':
      return (
        <Category
          category={category}
          icon={faDice}
          type="Good Life"
          select={select}
        />
      );
    case 'Pubs & Bars':
      return (
        <Category
          category={category}
          icon={faGlassCheers}
          type="Good Life"
          select={select}
        />
      );
    case 'Restaurants & Cafes':
      return (
        <Category
          category={category}
          icon={faUtensils}
          type="Good Life"
          select={select}
        />
      );
    case 'Takeaway':
      return (
        <Category
          category={category}
          icon={faPizzaSlice}
          type="Good Life"
          select={select}
        />
      );
    case 'Tobacco & Vaping':
      return (
        <Category
          category={category}
          icon={faSmoking}
          type="Good Life"
          select={select}
        />
      );
    case 'TV, Music & Streaming':
      return (
        <Category
          category={category}
          icon={faPlayCircle}
          type="Good Life"
          select={select}
        />
      );
    case 'Adult':
      return (
        <Category
          category={category}
          icon={faMarsStrokeH}
          type="Good Life"
          select={select}
        />
      );

    /**
     * Personal
     */
    case 'Children & Family':
      return (
        <Category
          category={category}
          icon={faUsers}
          type="Personal"
          select={select}
        />
      );
    case 'Clothing & Accessories':
      return (
        <Category
          category={category}
          icon={faTShirt}
          type="Personal"
          select={select}
        />
      );
    case 'Education & Student Loans':
      return (
        <Category
          category={category}
          icon={faGraduationCap}
          type="Personal"
          select={select}
        />
      );
    case 'Fitness & Wellbeing':
      return (
        <Category
          category={category}
          icon={faHeartbeat}
          type="Personal"
          select={select}
        />
      );
    case 'Gifts & Charity':
      return (
        <Category
          category={category}
          icon={faGift}
          type="Personal"
          select={select}
        />
      );
    case 'Hair & Beauty':
      return (
        <Category
          category={category}
          icon={faGrinBeam}
          type="Personal"
          select={select}
        />
      );
    case 'Health & Medical':
      return (
        <Category
          category={category}
          icon={faStethoscope}
          type="Personal"
          select={select}
        />
      );
    case 'Investments':
      return (
        <Category
          category={category}
          icon={faChartLine}
          type="Personal"
          select={select}
        />
      );
    case 'Life Admin':
      return (
        <Category
          category={category}
          icon={faCheckSquare}
          type="Personal"
          select={select}
        />
      );
    case 'Mobile Phone':
      return (
        <Category
          category={category}
          icon={faMobileAlt}
          type="Personal"
          select={select}
        />
      );
    case 'News, Magazines & Books':
      return (
        <Category
          category={category}
          icon={faNewspaper}
          type="Personal"
          select={select}
        />
      );
    case 'Technology':
      return (
        <Category
          category={category}
          icon={faLaptopCode}
          type="Personal"
          select={select}
        />
      );

    /**
     * Home
     */
    case 'Groceries':
      return (
        <Category
          category={category}
          icon={faShoppingCart}
          type="Home"
          select={select}
        />
      );
    case 'Homeware & Appliances':
      return (
        <Category
          category={category}
          icon={faBlender}
          type="Home"
          select={select}
        />
      );
    case 'Internet':
      return (
        <Category
          category={category}
          icon={faWifi}
          type="Home"
          select={select}
        />
      );
    case 'Perawatan & Perbaikan Rumah':
      return (
        <Category
          category={category}
          icon={faPaintRoller}
          type="Home"
          select={select}
        />
      );
    case 'Pets':
      return (
        <Category
          category={category}
          icon={faCat}
          type="Home"
          select={select}
        />
      );
    case 'Pajak & Asuransi Rumah':
      return (
        <Category
          category={category}
          icon={faHouseDamage}
          type="Home"
          select={select}
        />
      );
    case 'Sewa & Kredit Rumah':
      return (
        <Category
          category={category}
          icon={faHouseUser}
          type="Home"
          select={select}
        />
      );
    case 'Pembayaran Utilitas':
      return (
        <Category
          category={category}
          icon={faLightbulb}
          type="Home"
          select={select}
        />
      );

    /**
     * Transport
     */
    case 'Asuransi, Pajak & Perawatan Mobil':
      return (
        <Category
          category={category}
          icon={faCar}
          type="Transport"
          select={select}
        />
      );
    case 'Asuransi, Pajak & Perawatan Motor':
      return (
        <Category
          category={category}
          icon={faMotorcycle}
          type="Transport"
          select={select}
        />
      );
    case 'Cycling':
      return (
        <Category
          category={category}
          icon={faBicycle}
          type="Transport"
          select={select}
        />
      );
    case 'Bensin':
      return (
        <Category
          category={category}
          icon={faGasPump}
          type="Transport"
          select={select}
        />
      );
    case 'Parking':
      return (
        <Category
          category={category}
          icon={faParking}
          type="Transport"
          select={select}
        />
      );
    case 'Public Transport':
      return (
        <Category
          category={category}
          icon={faTrain}
          type="Transport"
          select={select}
        />
      );
    case 'Angsuran Kendaraan':
      return (
        <Category
          category={category}
          icon={faHandHoldingUsd}
          type="Transport"
          select={select}
        />
      );
    case 'Ojeks, Taxis & Share Cars':
      return (
        <Category
          category={category}
          icon={faTaxi}
          type="Transport"
          select={select}
        />
      );
    case 'Tolls':
      return (
        <Category
          category={category}
          icon={faRoad}
          type="Transport"
          select={select}
        />
      );

    /**
     * Belum ada kategory
     */

    case 'UNDEFINED':
      return (
        <Category
          category="Belum ada category"
          icon={faQuestion}
          type="UNDEFINED"
          select={select}
        />
      );

    default:
      return <></>;
  }
};

const Category = ({
  category,
  icon,
  select,
  type,
}: {
  category: string;
  icon: IconProp;
  select: boolean;
  type: 'Home' | 'Good Life' | 'Personal' | 'Transport' | string;
}) => {
  const renderColor = () => {
    switch (type) {
      case 'Good Life':
        return 'bg-yellow-600 dark:bg-yellow-300';

      case 'Personal':
        return 'bg-orange-600 dark:bg-orange-300';

      case 'Transport':
        return 'bg-blue-600 dark:bg-blue-300';

      case 'Home':
        return 'bg-purple-600 dark:bg-purple-300';

      default:
        return 'bg-gray-600 dark:bg-gray-300';
    }
  };

  return (
    <motion.p
      className={`flex gap-2 ${renderColor()} sm:px-2.5 sm:py-0.5 sm:text-base sm:rounded-xl text-xs px-1 py-0 rounded-md items-center justify-start w-fit h-fit text-onPrimaryContainer sm:max-w-fit max-w-[80px] truncate`}
      whileHover={{ scale: select ? 1.05 : 1 }}
    >
      <div className="flex gap-2 items-center justify-start">
        <FontAwesomeIcon icon={icon} />
        {category}
      </div>
      {select && <FontAwesomeIcon icon={faChevronDown} />}
    </motion.p>
  );
};

export default RenderCategory;
