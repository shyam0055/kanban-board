import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import Layout from '../layout';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Layout Component (Integration Test)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('renders top navigation and sidebar', () => {
    renderWithRouter(<Layout />);
    expect(screen.getByText('✨ Project Manager')).toBeInTheDocument();
    expect(screen.getByText('🏠 Dashboard')).toBeInTheDocument();
    expect(screen.getByText('😎 Profile')).toBeInTheDocument();
  });

  it('toggles dark mode class on HTML element and updates localStorage', () => {
    renderWithRouter(<Layout />);
    
    // By default it should be light (since localStorage is empty)
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    // Find the toggle button
    const toggleBtn = screen.getByText('🌙 Dark');
    fireEvent.click(toggleBtn);
    
    // Verify it switched to Dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    
    // Click again to switch to Light mode
    const lightBtn = screen.getByText('☀️ Light');
    fireEvent.click(lightBtn);
    
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
