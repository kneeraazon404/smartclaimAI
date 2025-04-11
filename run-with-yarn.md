# Running SmartClaim AI with Yarn

This document provides instructions for running the SmartClaim AI project using Yarn.

## Prerequisites

- Node.js (v18 or higher recommended)
- Yarn package manager

If you don't have Yarn installed, you can install it using npm:

```bash
npm install -g yarn
```

## Running the Project

1. Install dependencies:

```bash
yarn install
```

2. Start the development server:

```bash
yarn dev
```

This will start the development server with Turbopack for faster builds. The application will be available at [http://localhost:3000](http://localhost:3000).

## Other Available Commands

- Build for production:

```bash
yarn build
```

- Start the production server:

```bash
yarn start
```

- Run linting:

```bash
yarn lint
```

- Run tests:

```bash
yarn test
```

- Run tests in watch mode:

```bash
yarn test:watch
```

## Troubleshooting

If you encounter any issues:

1. Make sure you have the correct version of Node.js installed
2. Try deleting the `node_modules` folder and `yarn.lock` file, then run `yarn install` again
3. Clear the Next.js cache by deleting the `.next` folder, then run `yarn dev` again