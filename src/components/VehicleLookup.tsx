ataTable } from "@/components/ui/data-table";import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Car, Calendar, Palette, Cog, MapPin, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface VehicleData {
  // Basic Vehicle Information
  plate: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  color: string;
  vin: string;
  chassisNumber?: string;
  countryOfOrigin?: string;
  vehicleType: string;
  bodyStyle: string;
  numberOfDoors?: number;
  transmission: string;
  driveType: string;

  // Engine & Technical Specifications
  engineSize: string;
  fuelType: string;
  numberOfCylinders?: number;
  powerOutput?: string;
  torque?: string;
  emissionStandard?: string;
  fuelConsumption?: string;
  co2Emissions?: string;
  maxSpeed?: string;
  grossVehicleMass?: string;
  tareWeight?: string;

  // Registration & Compliance
  registrationStatus: string;
  registrationExpiry: string;
  wofStatus: string;
  wofExpiry: string;
  cofStatus?: string;
  cofExpiry?: string;
  rucStatus?: string;
  importComplianceDate?: string;
  compliancePlate?: string;

  // Safety & Recalls
  safetyRating?: string;
  airbagCount?: number;
  hasABS: boolean;
  hasESC: boolean;
  activeRecalls?: string[];
  theftAlertStatus?: string;

  // Ownership & History
  numberOfOwners?: number;
  firstRegistrationDate: string;
  importDate?: string;
  previousCountry?: string;
  lienInformation?: string;
  lastOdometerReading?: string;

  // Insurance & Valuation
  writeOffStatus?: string;
  marketValuation?: string;
  replacementCost?: string;

  // Additional Compliance
  modificationApprovals?: string[];
  noiseLevelCompliance?: string;
  commercialRestrictions?: string;
}

export default function VehicleLookup() {
  const [plateNumber, setPlateNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const { toast } = useToast();

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!plateNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a license plate number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setVehicleData(null);

    try {
      const { data, error } = await supabase.functions.invoke("vehicle-api", {
        body: { plateNumber },
      });

      if (error) {
        throw error;
      }

      setVehicleData(data);
      toast({
        title: "Vehicle Found",
        description: `Details retrieved for ${data.year} ${data.make} ${data.model}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not retrieve vehicle data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Vehicle Lookup
          </CardTitle>
          <CardDescription>
            Enter a New Zealand license plate number to get vehicle details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLookup} className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., ABC123"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Vehicle Details */}
      {vehicleData && (
        <div className="grid gap-6 animate-fade-in">
          {/* Basic Vehicle Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Basic Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">License Plate</span>
                  <Badge variant="outline" className="font-mono">
                    {vehicleData.plate}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Make & Model</span>
                  <span className="font-semibold">
                    {vehicleData.make} {vehicleData.model}
                  </span>
                </div>

                {vehicleData.variant && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Variant</span>
                    <span>{vehicleData.variant}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Year</span>
                  <span>{vehicleData.year}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Color</span>
                  <span>{vehicleData.color}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Vehicle Type</span>
                  <span>{vehicleData.vehicleType}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Body Style</span>
                  <span>{vehicleData.bodyStyle}</span>
                </div>

                {vehicleData.numberOfDoors && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Doors</span>
                    <span>{vehicleData.numberOfDoors}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Transmission</span>
                  <span>{vehicleData.transmission}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Drive Type</span>
                  <span>{vehicleData.driveType}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">VIN</span>
                  <span className="font-mono text-sm">{vehicleData.vin}</span>
                </div>

                {vehicleData.countryOfOrigin && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Origin</span>
                    <span>{vehicleData.countryOfOrigin}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Engine & Technical Specifications */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="h-5 w-5" />
                Engine & Technical Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Engine Size</span>
                  <span>{vehicleData.engineSize}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Fuel Type</span>
                  <Badge variant="secondary">{vehicleData.fuelType}</Badge>
                </div>

                {vehicleData.numberOfCylinders && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Cylinders</span>
                    <span>{vehicleData.numberOfCylinders}</span>
                  </div>
                )}

                {vehicleData.powerOutput && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Power Output</span>
                    <span>{vehicleData.powerOutput}</span>
                  </div>
                )}

                {vehicleData.torque && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Torque</span>
                    <span>{vehicleData.torque}</span>
                  </div>
                )}

                {vehicleData.emissionStandard && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Emissions</span>
                    <Badge variant="outline">{vehicleData.emissionStandard}</Badge>
                  </div>
                )}

                {vehicleData.fuelConsumption && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Fuel Consumption</span>
                    <span>{vehicleData.fuelConsumption}</span>
                  </div>
                )}

                {vehicleData.tareWeight && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tare Weight</span>
                    <span>{vehicleData.tareWeight}</span>
                  </div>
                )}

                {vehicleData.grossVehicleMass && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Gross Mass</span>
                    <span>{vehicleData.grossVehicleMass}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Registration & Compliance */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Registration & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Registration Status</span>
                  <Badge 
                    variant={vehicleData.registrationStatus === "Current" ? "default" : "destructive"}
                    className={vehicleData.registrationStatus === "Current" ? "bg-gradient-primary" : ""}
                  >
                    {vehicleData.registrationStatus}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Registration Expires</span>
                  <span>{vehicleData.registrationExpiry}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">WoF Status</span>
                  <Badge 
                    variant={vehicleData.wofStatus === "Current" ? "default" : "destructive"}
                    className={vehicleData.wofStatus === "Current" ? "bg-gradient-primary" : ""}
                  >
                    {vehicleData.wofStatus}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">WoF Expires</span>
                  <span>{vehicleData.wofExpiry}</span>
                </div>

                {vehicleData.rucStatus && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">RUC Status</span>
                    <Badge variant="outline">{vehicleData.rucStatus}</Badge>
                  </div>
                )}

                {vehicleData.importComplianceDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Import Compliance</span>
                    <span>{vehicleData.importComplianceDate}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Safety & Features */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Safety & Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicleData.safetyRating && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Safety Rating</span>
                    <Badge variant="default" className="bg-gradient-primary">
                      {vehicleData.safetyRating}
                    </Badge>
                  </div>
                )}

                {vehicleData.airbagCount && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Airbags</span>
                    <span>{vehicleData.airbagCount}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">ABS</span>
                  <Badge variant={vehicleData.hasABS ? "default" : "secondary"}>
                    {vehicleData.hasABS ? "Yes" : "No"}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">ESC</span>
                  <Badge variant={vehicleData.hasESC ? "default" : "secondary"}>
                    {vehicleData.hasESC ? "Yes" : "No"}
                  </Badge>
                </div>

                {vehicleData.theftAlertStatus && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Theft Alert</span>
                    <Badge variant={vehicleData.theftAlertStatus === "Clear" ? "default" : "destructive"}>
                      {vehicleData.theftAlertStatus}
                    </Badge>
                  </div>
                )}

                {vehicleData.activeRecalls && vehicleData.activeRecalls.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Recalls</span>
                    <Badge variant="destructive">{vehicleData.activeRecalls.length}</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ownership & History */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Ownership & History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicleData.numberOfOwners && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Previous Owners</span>
                    <span>{vehicleData.numberOfOwners}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">First Registration</span>
                  <span>{vehicleData.firstRegistrationDate}</span>
                </div>

                {vehicleData.importDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Import Date</span>
                    <span>{vehicleData.importDate}</span>
                  </div>
                )}

                {vehicleData.previousCountry && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Previous Country</span>
                    <span>{vehicleData.previousCountry}</span>
                  </div>
                )}

                {vehicleData.lienInformation && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Lien Status</span>
                    <Badge variant={vehicleData.lienInformation === "None" ? "default" : "destructive"}>
                      {vehicleData.lienInformation}
                    </Badge>
                  </div>
                )}

                {vehicleData.lastOdometerReading && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Last Odometer</span>
                    <span className="text-sm">{vehicleData.lastOdometerReading}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Insurance & Valuation */}
          {(vehicleData.writeOffStatus || vehicleData.marketValuation || vehicleData.replacementCost) && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Insurance & Valuation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicleData.writeOffStatus && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Write-off Status</span>
                      <Badge variant={vehicleData.writeOffStatus === "Clear" ? "default" : "destructive"}>
                        {vehicleData.writeOffStatus}
                      </Badge>
                    </div>
                  )}

                  {vehicleData.marketValuation && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Market Value</span>
                      <span className="font-semibold">{vehicleData.marketValuation}</span>
                    </div>
                  )}

                  {vehicleData.replacementCost && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Replacement Cost</span>
                      <span className="font-semibold">{vehicleData.replacementCost}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Important Notices */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  This is a demonstration using mock data. In a production version, this would connect to official 
                  New Zealand vehicle registration databases through services like NZTA, CarJam, or other authorized 
                  vehicle data providers to show real vehicle information, history, and compliance status.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
                    }
