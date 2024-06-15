const Shadow = require("./shadow");

describe('Shadow', () => {
    test('renders correctly', () => {
        const shadow = new Shadow(0.2, 0.4, 0.2);
        expect(shadow.render()).toEqual('<feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />');
    });
});
