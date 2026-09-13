import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import Kanban from '../kanban';
import React from 'react';
import * as router from 'react-router-dom';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Kanban Component (Integration Test)', () => {
  beforeEach(() => {
    localStorage.clear();
    
    // Mock the useOutletContext to provide a dummy delete function
    // since Kanban relies on it from the Layout wrapper
    vi.spyOn(router, 'useOutletContext').mockReturnValue([vi.fn()]);
  });

  it('renders default tasks when local storage is empty', () => {
    renderWithRouter(<Kanban />);
    expect(screen.getByText('Complete project presentation')).toBeInTheDocument();
    expect(screen.getByText('Review new design mockups')).toBeInTheDocument();
  });

  it('renders tasks from localStorage', () => {
    const mockTasks = [
      {
        id: 'test-1',
        task: 'Custom Task 1',
        progress: 'To Do',
        details: 'Testing To Do',
        priority: 'High',
      },
      {
        id: 'test-2',
        task: 'Custom Task 2',
        progress: 'Completed',
        details: 'Testing Completed',
        priority: 'Low',
      }
    ];
    
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
    renderWithRouter(<Kanban />);
    
    expect(screen.getByText('Custom Task 1')).toBeInTheDocument();
    expect(screen.getByText('Custom Task 2')).toBeInTheDocument();
  });
});
