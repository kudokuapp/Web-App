import {
  faCalendar,
  faChartLine,
  faEllipsis,
  faHouse,
  faList,
} from '@fortawesome/free-solid-svg-icons';

const menuItem = [
  {
    id: 1,
    name: 'Home',
    icon: faHouse,
    url: '/kudoku/home',
    regex: /\/kudoku\/home(.*)/,
    disabled: true,
  },
  {
    id: 2,
    name: 'Monthly',
    icon: faCalendar,
    url: '/kudoku/monthly',
    regex: /\/kudoku\/monthly(.*)/,
    disabled: true,
  },
  {
    id: 3,
    name: 'Transaction',
    icon: faList,
    url: '/kudoku/transaction',
    regex: /\/kudoku\/transaction(.*)/,
    disabled: false,
  },
  {
    id: 4,
    name: 'Budgeting',
    icon: faChartLine,
    url: '/kudoku/budgeting',
    regex: /\/kudoku\/budgeting(.*)/,
    disabled: false,
  },
  // {
  //   id: 4,
  //   name: 'Asset',
  //   icon: faChartLine,
  //   url: '/kudoku/asset',
  //   regex: /\/kudoku\/asset(.*)/,
  //   disabled: true,
  // },
  {
    id: 5,
    name: 'More',
    icon: faEllipsis,
    url: '/kudoku/more',
    regex: /\/kudoku\/more(.*)/,
    disabled: true,
  },
];

export default menuItem;
