// @ts-check
import { RouterContext } from 'next/dist/shared/lib/router-context';
import * as NextImage from 'next/image';
import React from 'react';
import '../styles/globals.css';
// import { AuthProvider } from '../context/AuthContext';

const BREAKPOINTS_INT = {
  xsm: '400px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINTS_INT).map(([key, val], idx) => {
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `${(idx + 5) * 10}vh`,
        },
      },
    ];
  })
);

// Allow Storybook to handle Next's <Image> component
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

/*
  The decorators is used for adding the AuthContext Provider
*/
// export const decorators = [
//   (Story) => (
//     <AuthProvider>
//       <Story />
//     </AuthProvider>
//   ),
// ];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#E1E1E1',
      },
      {
        name: 'dark',
        value: '#1A1B1F',
      },
    ],
  },
};
