//@ts-check
import { addons, types } from '@storybook/addons';
import { IconButton, Icons } from '@storybook/components';
import { create } from '@storybook/theming';
import React, { useEffect, useState } from 'react';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Kudoku React Component',
    brandUrl: 'https://kudoku.id',
    brandImage:
      'https://drive.google.com/uc?id=1pJH21GQufDoJu88E4TfrPu5GyjAh3X-l',
    brandTarget: '_self',
  }),
});

addons.register('Component Dark Theme Toggler', () => {
  addons.add('Component Dark Theme Toggler', {
    title: 'Component Dark Theme Toggler',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => {
      const [active, setActive] = useState(false);

      useEffect(() => {
        const iframe = document.querySelector('iframe');
        const bodyElement =
          iframe?.contentWindow?.document.querySelector('body');
        const observer = new MutationObserver((mutationsList) => {
          mutationsList.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
              const dark = bodyElement?.classList.contains('dark');
              setActive(dark ?? false);
            }
          });
        });
        // @ts-ignore
        observer.observe(bodyElement, { attributes: true });
        return () => observer.disconnect();
      }, []);

      return (
        <IconButton
          active={active}
          title="Toggle dark theme component"
          onClick={() => {
            const iframe = document.querySelector('iframe');
            const bodyElement =
              iframe?.contentWindow?.document.querySelector('body');
            bodyElement?.classList.toggle('dark');
          }}
        >
          <Icons icon="contrast" />
        </IconButton>
      );
    },
  });
});
