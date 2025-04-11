# Development Guidelines for SmartClaim AI

This document provides essential information for developers working on the SmartClaim AI project.

## Build/Configuration Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- Yarn package manager (preferred) or npm

If you don't have Yarn installed, you can install it using npm:
```bash
npm install -g yarn
```

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

### Development Server
Run the development server with Turbopack for faster builds:
```bash
yarn dev
# or
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production
```bash
yarn build
# or
npm run build
```

### Start Production Server
```bash
yarn start
# or
npm run start
```

### Environment Variables
The project uses Next.js environment variables. Create a `.env.local` file in the root directory for local development:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

## Testing Information

### Testing Framework
The project uses Jest and React Testing Library for testing.

### Running Tests
```bash
# Run all tests
yarn test
# or
npm test

# Run tests in watch mode (useful during development)
yarn test:watch
# or
npm run test:watch
```

### Test Structure
- Tests are located in `__tests__` directories adjacent to the files they test
- Component tests are in `components/__tests__`
- Utility tests would be in `utils/__tests__`

### Writing Tests
1. Create a new test file with the `.test.tsx` or `.test.ts` extension
2. Import the necessary testing utilities:
   ```typescript
   import { render, screen } from '@testing-library/react';
   ```
3. Import the component or function you want to test
4. Write your tests using the Jest and React Testing Library APIs

### Example Test
Here's an example test for a component:

```typescript
// components/__tests__/Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders the title correctly', () => {
    render(<Header />);

    // Check if the title is rendered
    expect(screen.getByText(/Wound/i)).toBeInTheDocument();
    expect(screen.getByText(/Checklist Assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/AI/i)).toBeInTheDocument();
  });

  it('displays the welcome message with user name', () => {
    render(<Header />);

    // Check if the welcome message is rendered
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Greg Rue/i)).toBeInTheDocument();
  });
});
```

## Additional Development Information

### Project Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - React components
- `utils/` - Utility functions
- `public/` - Static assets

### Code Style
- The project uses ESLint with Next.js and TypeScript configurations
- Run linting with `npm run lint` or `yarn lint`
- The project follows the Next.js and React best practices

### TypeScript
- The project is fully typed with TypeScript
- Use strict typing for all new code
- Avoid using `any` type when possible

### API Integration
- OpenAI API is used for AI functionality
- Supabase is used for backend and authentication

### Component Guidelines
- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for component props

### State Management
- Use React's built-in state management (useState, useContext) for simple state
- For more complex state, consider using a state management library

### Styling
- The project uses Tailwind CSS for styling
- Follow the existing class naming conventions
- Use the utility-first approach of Tailwind

### Performance Considerations
- Use Next.js Image component for optimized images
- Implement code splitting where appropriate
- Minimize unnecessary re-renders with React.memo, useMemo, and useCallback
