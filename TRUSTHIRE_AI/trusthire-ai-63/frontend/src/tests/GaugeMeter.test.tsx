import { render, screen } from '@testing-library/react';
import { GaugeMeter } from '../components/site/GaugeMeter';
import { describe, it, expect } from 'vitest';
import React from 'react';

// Mock Lucide icons or other complex imports if needed
// vi.mock('lucide-react', () => ({ ... }));

describe('GaugeMeter Component', () => {
  it('renders the correct value', () => {
    render(<GaugeMeter value={75} label="Trust" />);
    // GaugeMeter usually renders the number with a % sign
    const valueText = screen.getByText(/75/i);
    const labelText = screen.getByText(/Trust/i);
    expect(valueText).toBeDefined();
    expect(labelText).toBeDefined();
  });

  it('renders with 0 value', () => {
    render(<GaugeMeter value={0} label="Fraud" />);
    const valueText = screen.getByText(/0/i);
    expect(valueText).toBeDefined();
  });
});
