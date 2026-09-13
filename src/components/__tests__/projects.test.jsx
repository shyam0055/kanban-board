import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import Projects from '../projects';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Projects Component (Functionality Test)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders default projects when local storage is empty', () => {
    renderWithRouter(<Projects />);
    expect(screen.getByText('TaskFlow App')).toBeInTheDocument();
  });

  it('can open the Create Project modal', () => {
    renderWithRouter(<Projects />);
    const newProjectBtn = screen.getByText('+ New Project');
    fireEvent.click(newProjectBtn);
    expect(screen.getByText('Create New Project')).toBeInTheDocument();
  });

  it('can filter active projects', () => {
    renderWithRouter(<Projects />);
    const activeFilterBtn = screen.getByText('Active');
    fireEvent.click(activeFilterBtn);
    
    expect(screen.getByText('TaskFlow App')).toBeInTheDocument();
  });
});
