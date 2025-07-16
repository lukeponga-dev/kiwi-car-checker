-- Create vehicles table
CREATE TABLE public.vehicles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        plate TEXT NOT NULL UNIQUE,
            make TEXT NOT NULL,
                model TEXT NOT NULL,
                    year INTEGER NOT NULL,
                        color TEXT,
                            vin TEXT UNIQUE,
                                
                                    -- Registration details
                                        registration_status TEXT,
                                            registration_expiry DATE,
                                                
                                                    -- Vehicle specifications
                                                        engine_size TEXT,
                                                            fuel_type TEXT,
                                                                transmission TEXT,
                                                                    
                                                                        -- Audit columns
                                                                            created_at TIMESTAMPTZ DEFAULT NOW(),
                                                                                updated_at TIMESTAMPTZ DEFAULT NOW(),
                                                                                    
                                                                                        -- Constraints
                                                                                            CONSTRAINT valid_year CHECK (year BETWEEN 1900 AND EXTRACT(YEAR FROM NOW()) + 1)
                                                                                            );

                                                                                            -- Enable Row Level Security
                                                                                            ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

                                                                                            -- Create indexes for performance
                                                                                            CREATE INDEX idx_vehicles_plate ON public.vehicles(plate);
                                                                                            CREATE INDEX idx_vehicles_make_model ON public.vehicles(make, model);

                                                                                            -- Trigger to update 'updated_at' timestamp
                                                                                            CREATE OR REPLACE FUNCTION update_modified_column()
                                                                                            RETURNS TRIGGER AS $$
                                                                                            BEGIN
                                                                                                NEW.updated_at = NOW();
                                                                                                    RETURN NEW;
                                                                                                    END;
                                                                                                    $$ LANGUAGE plpgsql;

                                                                                                    CREATE TRIGGER update_vehicles_modtime
                                                                                                    BEFORE UPDATE ON public.vehicles
                                                                                                    FOR EACH ROW
                                                                                                    EXECUTE FUNCTION update_modified_column();

                                                                                                    -- Basic RLS Policy (customize as needed)
                                                                                                    CREATE POLICY "Users can view vehicles" 
                                                                                                    ON public.vehicles 
                                                                                                    FOR SELECT 
                                                                                                    USING (true);  -- Replace with actual authorization logic