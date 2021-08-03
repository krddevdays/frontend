const quote = require('shell-quote').quote;

module.exports = {
    '*.{js,jsx,ts,tsx}': ["eslint --fix"],
    '*.{,json,css,md}': ["prettier --write"]
};
