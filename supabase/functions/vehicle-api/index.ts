import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { plateNumber } = await req.json();

  const mockData = {
    plate: plateNumber.toUpperCase(),
    make: "Toyota",
    model: "Camry",
    variant: "LE",
    year: 2019,
    color: "Silver",
    vin: "1NXBR32E37Z******",
    chassisNumber: "JTDKB20U597******",
    countryOfOrigin: "Japan",
    vehicleType: "Passenger Car",
    bodyStyle: "Sedan",
    numberOfDoors: 4,
    transmission: "Automatic",
    driveType: "FWD",
    engineSize: "2.5L",
    fuelType: "Petrol",
    numberOfCylinders: 4,
    powerOutput: "131kW / 176HP",
    torque: "231Nm",
    emissionStandard: "Euro 6",
    fuelConsumption: "7.2L/100km",
    co2Emissions: "164g/km",
    maxSpeed: "200km/h",
    grossVehicleMass: "1,800kg",
    tareWeight: "1,445kg",
    registrationStatus: "Current",
    registrationExpiry: "2024-08-20",
    wofStatus: "Current",
    wofExpiry: "2024-06-15",
    cofStatus: "N/A",
    rucStatus: "Exempt",
    importComplianceDate: "2019-01-15",
    compliancePlate: "NZ COMPLIANCE PLATE",
    safetyRating: "5 Star ANCAP",
    airbagCount: 8,
    hasABS: true,
    hasESC: true,
    activeRecalls: [],
    theftAlertStatus: "Clear",
    numberOfOwners: 2,
    firstRegistrationDate: "2019-02-01",
    importDate: "2019-01-10",
    previousCountry: "Japan",
    lienInformation: "None",
    lastOdometerReading: "87,450km (2024-02-10)",
    writeOffStatus: "Clear",
    marketValuation: "$28,000 - $32,000",
    replacementCost: "$35,000",
    modificationApprovals: [],
    noiseLevelCompliance: "Compliant",
    commercialRestrictions: "None",
  };

  return new Response(JSON.stringify(mockData), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
