
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? "",
  {
    global: {
      headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` },
    },
  }
);

const { data, error } = await supabase.from("vehicles").insert([
  {
    plate: "HELLO",
    make: "Toyota",
    model: "Camry",
    variant: "LE",
    year: 2019,
    color: "Silver",
    vin: "1NXBR32E37Z******",
    chassis_number: "JTDKB20U597******",
    country_of_origin: "Japan",
    vehicle_type: "Passenger Car",
    body_style: "Sedan",
    number_of_doors: 4,
    transmission: "Automatic",
    drive_type: "FWD",
    engine_size: "2.5L",
    fuel_type: "Petrol",
    number_of_cylinders: 4,
    power_output: "131kW / 176HP",
    torque: "231Nm",
    emission_standard: "Euro 6",
    fuel_consumption: "7.2L/100km",
    co2_emissions: "164g/km",
    max_speed: "200km/h",
    gross_vehicle_mass: "1,800kg",
    tare_weight: "1,445kg",
    registration_status: "Current",
    registration_expiry: "2024-08-20",
    wof_status: "Current",
    wof_expiry: "2024-06-15",
    cof_status: "N/A",
    ruc_status: "Exempt",
    import_compliance_date: "2019-01-15",
    compliance_plate: "NZ COMPLIANCE PLATE",
    safety_rating: "5 Star ANCAP",
    airbag_count: 8,
    has_abs: true,
    has_esc: true,
    active_recalls: [],
    theft_alert_status: "Clear",
    number_of_owners: 2,
    first_registration_date: "2019-02-01",
    import_date: "2019-01-10",
    previous_country: "Japan",
    lien_information: "None",
    last_odometer_reading: "87,450km (2024-02-10)",
    write_off_status: "Clear",
    market_valuation: "$28,000 - $32,000",
    replacement_cost: "$35,000",
    modification_approvals: [],
    noise_level_compliance: "Compliant",
    commercial_restrictions: "None",
  },
]);

if (error) {
  console.error(error);
}

if (data) {
  console.log("Seeded data:", data);
}
