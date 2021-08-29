module.exports = {
   "moduleNameMapper": {
     "\\.(css|less|scss)$": "identity-obj-proxy"
   }
 }

// module.exports = {
//    preset: 'ts-jest/presets/js-with-babel',
//    moduleNameMapper: {
//      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': './jest.mock.js',
//    },
//    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/assets/'],
//    transform: {
//      '^.+\\.jsx?$': 'babel-jest',
//      '\\.(css|less|scss|sass)$': 'jest-transform-css',
//    },
//  };