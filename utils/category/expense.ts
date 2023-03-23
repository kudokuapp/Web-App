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
  faHandHoldingDollar,
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
  faTshirt,
  faUsers,
  faUtensils,
  faWifi,
  faWineBottle,
} from '@fortawesome/free-solid-svg-icons';

const expenseCategory = {
  'Good Life': [
    {
      name: 'Apps, Games & Software',
      icon: faGamepad,
    },
    {
      name: 'Booze',
      icon: faWineBottle,
    },
    {
      name: 'Events & Gigs',
      icon: faTicketAlt,
    },
    {
      name: 'Hobbies',
      icon: faSnowboarding,
    },
    {
      name: 'Holidays & Travel',
      icon: faPlaneDeparture,
    },
    {
      name: 'Lottery & Gambling',
      icon: faDice,
    },
    {
      name: 'Pubs & Bars',
      icon: faGlassCheers,
    },

    {
      name: 'Restaurants & Cafes',
      icon: faUtensils,
    },
    {
      name: 'Takeaway',
      icon: faPizzaSlice,
    },
    {
      name: 'Tobacco & Vaping',
      icon: faSmoking,
    },
    {
      name: 'TV, Music & Streaming',
      icon: faPlayCircle,
    },
    {
      name: 'Adult',
      icon: faMarsStrokeH,
    },
  ],

  Personal: [
    {
      name: 'Children & Family',
      icon: faUsers,
    },
    {
      name: 'Clothing & Accessories',
      icon: faTshirt,
    },
    {
      name: 'Education & Student Loans',
      icon: faGraduationCap,
    },
    {
      name: 'Fitness & Wellbeing',
      icon: faHeartbeat,
    },
    {
      name: 'Gifts & Charity',
      icon: faGift,
    },
    {
      name: 'Hair & Beauty',
      icon: faGrinBeam,
    },
    {
      name: 'Health & Medical',
      icon: faStethoscope,
    },

    {
      name: 'Investments',
      icon: faChartLine,
    },
    {
      name: 'Life Admin',
      icon: faCheckSquare,
    },
    {
      name: 'Mobile Phone',
      icon: faMobileAlt,
    },
    {
      name: 'News, Magazines & Books',
      icon: faNewspaper,
    },
    {
      name: 'Technology',
      icon: faLaptopCode,
    },
  ],

  Home: [
    {
      name: 'Groceries',
      icon: faShoppingCart,
    },
    {
      name: 'Homeware & Appliances',
      icon: faBlender,
    },
    {
      name: 'Internet',
      icon: faWifi,
    },
    {
      name: 'Perawatan & Perbaikan Rumah',
      icon: faPaintRoller,
    },
    {
      name: 'Pets',
      icon: faCat,
    },
    {
      name: 'Pajak & Asuransi Rumah',
      icon: faHouseDamage,
    },
    {
      name: 'Sewa & Kredit Rumah',
      icon: faHouseUser,
    },

    {
      name: 'Pembayaran Utilitas',
      icon: faLightbulb,
    },
  ],

  Transport: [
    {
      name: 'Asuransi, Pajak & Perawatan Mobil',
      icon: faCar,
    },
    {
      name: 'Asuransi, Pajak & Perawatan Motor',
      icon: faMotorcycle,
    },
    {
      name: 'Cycling',
      icon: faBicycle,
    },
    {
      name: 'Bensin',
      icon: faGasPump,
    },
    {
      name: 'Parking',
      icon: faParking,
    },
    {
      name: 'Pajak & Asuransi Rumah',
      icon: faHouseDamage,
    },
    {
      name: 'Public Transport',
      icon: faTrain,
    },

    {
      name: 'Angsuran Kendaraan',
      icon: faHandHoldingDollar,
    },

    {
      name: 'Ojeks, Taxis & Share Cars',
      icon: faTaxi,
    },

    {
      name: 'Tolls',
      icon: faRoad,
    },
  ],
};

export default expenseCategory;
