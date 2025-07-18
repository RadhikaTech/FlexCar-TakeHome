import { render, screen, fireEvent } from '@testing-library/react';
import Sort from './Sort';

describe('Sort Component', () => {
    const mockOnSortChange = jest.fn();

    beforeEach(() => {
        render(<Sort onSortChange={mockOnSortChange} />);
    });

    it('renders label and all options', () => {
        const label = screen.getByLabelText(/Sort By/i);
        expect(label).toBeInTheDocument();

        expect(screen.getByRole('option', { name: 'Default' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Price (Low to High)' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Price (High to Low)' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Year (Newest First)' })).toBeInTheDocument();
    });

    it('calls onSortChange when option is selected', () => {
        const select = screen.getByLabelText(/Sort By/i);
        fireEvent.change(select, { target: { value: 'priceLow' } });
        expect(mockOnSortChange).toHaveBeenCalledWith('priceLow');

        fireEvent.change(select, { target: { value: 'priceHigh' } });
        expect(mockOnSortChange).toHaveBeenCalledWith('priceHigh');

        fireEvent.change(select, { target: { value: 'year' } });
        expect(mockOnSortChange).toHaveBeenCalledWith('year');
    });
});
