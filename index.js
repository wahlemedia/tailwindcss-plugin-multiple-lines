const range = require('lodash/range');
const forEach = require('lodash/forEach');
const fromPairs = require('lodash/fromPairs');
const defaults = require('lodash/defaults');
const map = require('lodash/map');

module.exports = function(options = {}) {
    return ({ theme, variants, e, addUtilities }) => {

        const defaultOptions = {
            lineClamp: range(1, 10),
        };

        options = defaults({}, options, defaultOptions);

        const defaultLineClampVariants = ['responsive'];
        const defaultOrientationVariants = ['responsive'];

        const lineClampVariants = variants('lineClamp', defaultLineClampVariants);
        const orientationVariants = variants('orientation', defaultOrientationVariants);


        const defaultOrientationValues = {
            vertical: 'vertical',
            horizontal: 'horizontal',
            'axis-block': 'block-axis',
            'inline-block': 'block-inline',
            unset: 'unset',
        };

        // prepent lineclamp reset
        options.lineClamp.unshift(
            'unset',
        );

        const lineClapUtilities = fromPairs(
            map(options.lineClamp, (line, iterator) => {
                return [
                    `.${ e(`clamp-${ iterator }`) }`,
                    {
                        '-webkit-line-clamp': `${ line };`,
                    },
                ];
            }),
        );

        const displayUtilities = {
            '.box': {
                display: '-webkit-box;',
            },
        };

        const boxOrientUtilities = fromPairs(
            map(defaultOrientationValues, (value, option) => {
                return [
                    `.${ e(`orient-${ option }`) }`,
                    {
                        '-webkit-box-orient': `${ value }`,
                    },
                ];
            }),
        );

        addUtilities(lineClapUtilities, lineClampVariants);
        addUtilities(displayUtilities);
        addUtilities(boxOrientUtilities, orientationVariants);
    };
};
