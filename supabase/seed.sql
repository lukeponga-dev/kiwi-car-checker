-- Clear existing data (optional)
TRUNCATE TABLE public.vehicles RESTART IDENTITY;

-- Insert seed vehicles
INSERT INTO public.vehicles (
    plate, make, model, year, color, vin, 
        registration_status, registration_expiry,
            engine_size, fuel_type, transmission
            ) VALUES 
            (
                'KIWICAR', 'Toyota', 'Camry', 2022, 'Silver', '1234567890ABCDEFG',
                    'Registered', '2025-12-31',
                        '2.5L', 'Petrol', 'Automatic'
                        ),
                        (
                            'TEST1234', 'Ford', 'Ranger', 2020, 'Blue', 'FEDCBA0987654321',
                                'Registered', '2024-11-30',
                                    '3.2L', 'Diesel', 'Automatic'
                                    ),
                                    (
                                        'NZMADE', 'Subaru', 'Outback', 2023, 'Green', 'SUBARU1234567890',
                                            'Registered', '2026-01-31',
                                                '2.5L', 'Petrol', 'CVT'
                                                );