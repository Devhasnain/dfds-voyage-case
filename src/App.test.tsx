import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import VoyageProgressProps from './App';

test('renders learn react link', () => {
    const voyageProgressProps: VoyageProgressProps = {
        portOfLoading: 'Port A',
        portOfDischarge: 'Port B',
        departureTime: new Date(),
        arrivalTime: new Date(),
    };
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
