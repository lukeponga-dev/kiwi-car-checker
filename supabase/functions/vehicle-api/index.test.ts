import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors-headers.ts";

const MOCK_VEHICLE_DATA = {
  make: "Tesla",
  model: "Model 3",
  year: 2022,
  color: "Red",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { plateNumber } = await req.json();

    if (!plateNumber) {
      return new Response(
        JSON.stringify({ error: "Plate number is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // In a real application, you would fetch vehicle data based on the plateNumber
    // For this mock, we return the same data regardless of the plateNumber
    return new Response(JSON.stringify(MOCK_VEHICLE_DATA), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});