import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

addons.setConfig({
    theme: create({
        base: 'light',
        brandTitle: 'Kudoku React Component',
        brandUrl: 'https://kudoku.id',
        brandImage:
            'https://drive.google.com/uc?id=1pJH21GQufDoJu88E4TfrPu5GyjAh3X-l',
        brandTarget: '_self',
    }),
})
