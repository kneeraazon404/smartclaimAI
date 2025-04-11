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