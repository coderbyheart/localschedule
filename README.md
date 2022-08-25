# Local Schedule

![Build and Release](https://github.com/coderbyheart/localschedule/workflows/Build%20and%20Release/badge.svg?branch=saga)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)
[![React](https://github.com/aleen42/badges/raw/master/src/react.svg)](https://reactjs.org/)
[![CSS modules](https://img.shields.io/badge/CSS-modules-yellow)](https://github.com/css-modules/css-modules)
[![Vite](https://github.com/aleen42/badges/raw/master/src/vitejs.svg)](https://vitejs.dev/)

Create a shareable schedule with times in your local timezone. Great for remote
conferences!

### Install dependencies

    npm ci

### Start the development server

    npm start

### Run the tests

Unit tests can be run using

    npm test

End-to-end tests can be run using

    npm run test:e2e

You can see the browser by running

    PWDEBUG=1 npm run test:e2e

## Architecture decision records (ADRs)

see [./adr](./adr).
