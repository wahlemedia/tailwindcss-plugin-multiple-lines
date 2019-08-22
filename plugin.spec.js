const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss/lib/postcss');
const tailwindcss = require('tailwindcss');
const multipleLinesPlugin = require('./index.js');


const generatePluginCss = (config, pluginOptions = {}) => {
    return postcss(
        tailwindcss(
            _.merge({
                theme: {
                    screens: {
                        // 'sm': '640px',
                    },
                },
                corePlugins: false,
                plugins: [
                    multipleLinesPlugin(pluginOptions),
                ],
            }, config),
        ),
    )
        .process('@tailwind utilities', {
            from: undefined,
        })
        .then(result => {
            return result.css;
        });
};

expect.extend({
    toMatchCss: cssMatcher,
});

test('autogenerate default values', () => {
    return generatePluginCss().then(css => {

        expect(css).toMatchCss(
            `
    .clamp-0 {
         -webkit-line-clamp: unset
    }
           
    .clamp-1 {
      -webkit-line-clamp: 1
    }
    
    .clamp-2 {
      -webkit-line-clamp: 2
    }
    
    .clamp-3 {
      -webkit-line-clamp: 3
    }
    
    .clamp-4 {
      -webkit-line-clamp: 4
    }
    
    .clamp-5 {
      -webkit-line-clamp: 5
    }
    
    .clamp-6 {
      -webkit-line-clamp: 6
    }
    
    .clamp-7 {
      -webkit-line-clamp: 7
    }
    
    .clamp-8 {
      -webkit-line-clamp: 8
    }
    
    .clamp-9 {
      -webkit-line-clamp: 9
    }
    
    .box {
      display: -webkit-box;
    }
    
    .orient-vertical {
      -webkit-box-orient: vertical
    }
    
    .orient-horizontal {
      -webkit-box-orient: horizontal
    }
    
    .orient-axis-block {
      -webkit-box-orient: block-axis
    }
    
    .orient-inline-block {
      -webkit-box-orient: block-inline
    }
    
    .orient-unset {
      -webkit-box-orient: unset
    }`);
    });
});



test('it receives parameter', () => {
    return generatePluginCss({}, {
        lineClamp: [1]
    }).then(css => {

        expect(css).toMatchCss(
            `
    .clamp-0 {
         -webkit-line-clamp: unset
    }
           
    .clamp-1 {
      -webkit-line-clamp: 1
    }
    
    .box {
      display: -webkit-box;
    }
    
    .orient-vertical {
      -webkit-box-orient: vertical
    }
    
    .orient-horizontal {
      -webkit-box-orient: horizontal
    }
    
    .orient-axis-block {
      -webkit-box-orient: block-axis
    }
    
    .orient-inline-block {
      -webkit-box-orient: block-inline
    }
    
    .orient-unset {
      -webkit-box-orient: unset
    }`);
    });
});
