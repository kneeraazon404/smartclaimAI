import { render, screen } from '@testing-library/react'

// ── Mocks ────────────────────────────────────────────────────────────────────
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}))

jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    resolvedTheme: 'light',
    setTheme: jest.fn(),
  })),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/'),
}))
// ─────────────────────────────────────────────────────────────────────────────

import { useSession } from 'next-auth/react'
import Header from '../Header'

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

function unauthenticated() {
  mockUseSession.mockReturnValue({ data: null, status: 'unauthenticated', update: jest.fn() })
}

function authenticated(name = 'Dr. Smith') {
  mockUseSession.mockReturnValue({
    data: { user: { name, email: 'dr@clinic.com', id: '1' }, expires: '2099-01-01' },
    status: 'authenticated',
    update: jest.fn(),
  })
}

describe('Header', () => {
  it('renders the SmartClaimAI brand', () => {
    unauthenticated()
    render(<Header />)
    // Logo link has aria-label "SmartClaimAI — home"
    expect(screen.getByLabelText(/smartclaimai/i)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    unauthenticated()
    render(<Header />)
    // Nav links appear in both desktop and mobile bars
    expect(screen.getAllByText('Evaluate').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('FAQ').length).toBeGreaterThanOrEqual(1)
  })

  it('shows Sign In when unauthenticated', () => {
    unauthenticated()
    render(<Header />)
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('shows the user display name when authenticated', () => {
    authenticated('Dr. Smith')
    render(<Header />)
    expect(screen.getByText('Dr. Smith')).toBeInTheDocument()
  })

  it('shows Settings link when authenticated', () => {
    authenticated()
    render(<Header />)
    expect(screen.getByLabelText('Account settings')).toBeInTheDocument()
  })

  it('shows Sign Out button when authenticated', () => {
    authenticated()
    render(<Header />)
    expect(screen.getByLabelText('Sign out')).toBeInTheDocument()
  })
})
