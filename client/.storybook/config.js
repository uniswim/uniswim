import { configure } from '@storybook/react';
import { addParameters, addDecorator  } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { setConsoleOptions, withConsole  } from '@storybook/addon-console';
//addDecorator((storyFn, context) => withConsole()(storyFn)(context));

/*setConsoleOptions({
    panelExclude: [],
});*/

addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS,
        defaultViewport: 'responsive',
    },
});

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.tsx$/), module);
