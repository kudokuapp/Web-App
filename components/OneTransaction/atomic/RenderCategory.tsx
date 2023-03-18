import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBicycle,
  faBlender,
  faCar,
  faCat,
  faChartLine,
  faCheckSquare,
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

export const RenderCategory = ({ category }: { category: string }) => {
  switch (category) {
    /**
     * Good Life
     */
    case 'Apps, Games & Software':
      return <GoodLife category={category} icon={faGamepad} />;
    case 'Booze':
      return <GoodLife category={category} icon={faWineBottle} />;
    case 'Events & Gigs':
      return <GoodLife category={category} icon={faTicketAlt} />;
    case 'Hobbies':
      return <GoodLife category={category} icon={faSnowboarding} />;
    case 'Holidays & Travel':
      return <GoodLife category={category} icon={faPlaneDeparture} />;
    case 'Lottery & Gambling':
      return <GoodLife category={category} icon={faDice} />;
    case 'Pubs & Bars':
      return <GoodLife category={category} icon={faGlassCheers} />;
    case 'Restaurants & Cafes':
      return <GoodLife category={category} icon={faUtensils} />;
    case 'Takeaway':
      return <GoodLife category={category} icon={faPizzaSlice} />;
    case 'Tobacco & Vaping':
      return <GoodLife category={category} icon={faSmoking} />;
    case 'TV, Music & Streaming':
      return <GoodLife category={category} icon={faPlayCircle} />;
    case 'Adult':
      return <GoodLife category={category} icon={faMarsStrokeH} />;

    /**
     * Personal
     */
    case 'Children & Family':
      return <Personal category={category} icon={faUsers} />;
    case 'Clothing & Accessories':
      return <Personal category={category} icon={faTShirt} />;
    case 'Education & Student Loans':
      return <Personal category={category} icon={faGraduationCap} />;
    case 'Fitness & Wellbeing':
      return <Personal category={category} icon={faHeartbeat} />;
    case 'Gifts & Charity':
      return <Personal category={category} icon={faGift} />;
    case 'Hair & Beauty':
      return <Personal category={category} icon={faGrinBeam} />;
    case 'Health & Medical':
      return <Personal category={category} icon={faStethoscope} />;
    case 'Investments':
      return <Personal category={category} icon={faChartLine} />;
    case 'Life Admin':
      return <Personal category={category} icon={faCheckSquare} />;
    case 'Mobile Phone':
      return <Personal category={category} icon={faMobileAlt} />;
    case 'News, Magazines & Books':
      return <Personal category={category} icon={faNewspaper} />;
    case 'Technology':
      return <Personal category={category} icon={faLaptopCode} />;

    /**
     * Home
     */
    case 'Groceries':
      return <Home category={category} icon={faShoppingCart} />;
    case 'Homeware & Appliances':
      return <Home category={category} icon={faBlender} />;
    case 'Internet':
      return <Home category={category} icon={faWifi} />;
    case 'Perawatan & Perbaikan Rumah':
      return <Home category={category} icon={faPaintRoller} />;
    case 'Pets':
      return <Home category={category} icon={faCat} />;
    case 'Pajak & Asuransi Rumah':
      return <Home category={category} icon={faHouseDamage} />;
    case 'Sewa & Kredit Rumah':
      return <Home category={category} icon={faHouseUser} />;
    case 'Pembayaran Utilitas':
      return <Home category={category} icon={faLightbulb} />;

    /**
     * Transport
     */
    case 'Asuransi, Pajak & Perawatan Mobil':
      return <Transport category={category} icon={faCar} />;
    case 'Asuransi, Pajak & Perawatan Motor':
      return <Transport category={category} icon={faMotorcycle} />;
    case 'Cycling':
      return <Transport category={category} icon={faBicycle} />;
    case 'Bensin':
      return <Transport category={category} icon={faGasPump} />;
    case 'Parking':
      return <Transport category={category} icon={faParking} />;
    case 'Public Transport':
      return <Transport category={category} icon={faTrain} />;
    case 'Angsuran Kendaraan':
      return <Transport category={category} icon={faHandHoldingUsd} />;
    case 'Ojeks, Taxis & Share Cars':
      return <Transport category={category} icon={faTaxi} />;
    case 'Tolls':
      return <Transport category={category} icon={faRoad} />;

    default:
      return <></>;
  }
};

const GoodLife = ({ category, icon }: { category: string; icon: IconProp }) => {
  return (
    <p className="flex gap-2 bg-yellow-600 dark:bg-yellow-300 sm:px-2.5 sm:py-0.5 sm:text-base sm:rounded-xl text-xs px-1 py-0 rounded-md  items-center justify-start w-fit h-fit text-onPrimaryContainer sm:max-w-fit max-w-[80px] truncate">
      <FontAwesomeIcon icon={icon} />
      {category}
    </p>
  );
};

const Personal = ({ category, icon }: { category: string; icon: IconProp }) => {
  return (
    <p>
      <FontAwesomeIcon icon={icon} />
      {category}
    </p>
  );
};

const Home = ({ category, icon }: { category: string; icon: IconProp }) => {
  return (
    <p>
      <FontAwesomeIcon icon={icon} />
      {category}
    </p>
  );
};

const Transport = ({
  category,
  icon,
}: {
  category: string;
  icon: IconProp;
}) => {
  return (
    <p>
      <FontAwesomeIcon icon={icon} />
      {category}
    </p>
  );
};
