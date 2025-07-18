import { render, screen } from '@testing-library/react';
import VehicleCard from './VehicleCard';
import { Vehicle } from '@/types/vehicle';

const mockVehicle: Vehicle = {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    trim: 'XSE',
    year: 2023,
    color: 'Red',
    mileage: 15000,
    price: 25,
    zip: 12345,
    image: '/car.jpg',
};

describe('VehicleCard Component', () => {
    it('renders vehicle information correctly', () => {
        render(<VehicleCard vehicle={mockVehicle} />);

        expect(screen.getByText(/Toyota Camry/i)).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return element?.textContent === 'Trim: XSE';
        })).toBeInTheDocument();

        expect(screen.getByText((content, element) => {
            return element?.textContent === 'Year: 2023';
        })).toBeInTheDocument();

        expect(screen.getByText((content, element) => {
            return element?.textContent === 'Color: Red';
        })).toBeInTheDocument();

        expect(screen.getByText((content, element) => {
            return element?.textContent === 'Mileage: 15,000 km';
        })).toBeInTheDocument();

        expect(screen.getByText(/₹25L/i)).toBeInTheDocument();

        const image = screen.getByAltText('Toyota Camry') as HTMLImageElement;
        expect(image.src).toContain('/car.jpg');
    });

    it('renders placeholder image if vehicle.image is missing', () => {
        const vehicleWithoutImage = { ...mockVehicle, image: '' };
        render(<VehicleCard vehicle={vehicleWithoutImage} />);

        const img = screen.getByRole('img') as HTMLImageElement;
        expect(img.src).toContain('/car-placeholder.jpg');
    });
});
