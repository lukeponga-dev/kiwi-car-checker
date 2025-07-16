-- Seed data for the vehicles table
INSERT INTO public.vehicles (
    plate, make, model, year, color, vin, registration_status, registration_expiry, 
    wof_status, wof_expiry, engine_size, fuel_type, transmission, body_style, 
    vehicle_type, country_of_origin, gross_vehicle_mass, tare_weight, safety_rating, 
    airbag_count, has_abs, has_esc, active_recalls, theft_alert_status, number_of_owners, 
    first_registration_date, import_date, previous_country, lien_information, 
    last_odometer_reading, write_off_status, market_valuation, replacement_cost, 
    modification_approvals, noise_level_compliance, commercial_restrictions
) VALUES 
(
    'KIWICAR', 'Toyota', 'Camry', 2022, 'Silver', '1234567890ABCDEFG', 'Registered', '2025-12-31', 
    'Valid', '2025-06-30', '2.5L', 'Petrol', 'Automatic', 'Sedan', 
    'Passenger Car/Van', 'Japan', '2100kg', '1580kg', '5-star ANCAP', 
    8, true, true, '{ "recalls": ["Takata airbag recall"] }', 'No stolen alerts reported', 2, 
    '2022-01-15', '2022-01-10', 'Japan', 'No security interest recorded', 
    '45,000km at 2024-05-20', 'Not written off', '$30,000 - $35,000', '$40,000', 
    '{ "approvals": ["Certified towbar installation"] }', 'Compliant', 'None'
),
(
    'TEST1234', 'Ford', 'Ranger', 2020, 'Blue', 'FEDCBA0987654321', 'Registered', '2024-11-30', 
    'Valid', '2024-10-15', '3.2L', 'Diesel', 'Automatic', 'Ute', 
    'Goods Van/Ute', 'Thailand', '3200kg', '2150kg', '5-star ANCAP', 
    6, true, true, '{ "recalls": [] }', 'No stolen alerts reported', 1, 
    '2020-03-20', NULL, NULL, 'Security interest held by XYZ Finance', 
    '80,000km at 2024-04-10', 'Not written off', '$45,000 - $50,000', '$55,000', 
    '{ "approvals": ["Canopy fitted"] }', 'Compliant', 'None'
),
(
    'NZMADE', 'Subaru', 'Outback', 2023, 'Green', 'SUBARU1234567890', 'Registered', '2026-01-31', 
    'Valid', '2026-01-31', '2.5L', 'Petrol', 'CVT', 'Station Wagon', 
    'Passenger Car/Van', 'Japan', '2100kg', '1650kg', '5-star ANCAP', 
    7, true, true, '{ "recalls": [] }', 'No stolen alerts reported', 1, 
    '2023-02-01', NULL, NULL, 'No security interest recorded', 
    '15,000km at 2024-01-30', 'Not written off', '$50,000 - $55,000', '$60,000', 
    '{ "approvals": [] }', 'Compliant', 'None'
),
(
    'NEWCAR', 'Honda', 'Civic', 2021, 'Black', 'HONDACIVIC123456', 'Registered', '2025-05-31', 
    'Valid', '2025-05-31', '1.5L', 'Petrol', 'CVT', 'Sedan', 
    'Passenger Car/Van', 'Japan', '1800kg', '1350kg', '5-star ANCAP', 
    6, true, true, '{ "recalls": [] }', 'No stolen alerts reported', 1, 
    '2021-06-01', NULL, NULL, 'No security interest recorded', 
    '30,000km at 2024-05-01', 'Not written off', '$25,000 - $30,000', '$35,000', 
    '{ "approvals": [] }', 'Compliant', 'None'
);
