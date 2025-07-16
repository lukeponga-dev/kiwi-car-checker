import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Car, Calendar, Cog, MapPin, AlertTriangle } from "lucide-react";
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

const DataRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <TableRow>
    <TableCell className="font-medium text-muted-foreground">{label}</TableCell>
    <TableCell>{value}</TableCell>
  </TableRow>
);

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
        <div className="space-y-6 animate-fade-in">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <DataRow label="License Plate" value={<Badge variant="outline" className="font-mono">{vehicleData.plate}</Badge>} />
                  <DataRow label="Make & Model" value={`${vehicleData.make} ${vehicleData.model}`} />
                  {vehicleData.variant && <DataRow label="Variant" value={vehicleData.variant} />}
                  <DataRow label="Year" value={vehicleData.year} />
                  <DataRow label="Color" value={vehicleData.color} />
                  <DataRow label="VIN" value={<span className="font-mono text-sm">{vehicleData.vin}</span>} />
                  <DataRow label="Vehicle Type" value={vehicleData.vehicleType} />
                  <DataRow label="Body Style" value={vehicleData.bodyStyle} />
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="h-5 w-5" />
                Engine & Technical
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Specification</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <DataRow label="Engine Size" value={vehicleData.engineSize} />
                  <DataRow label="Fuel Type" value={<Badge variant="secondary">{vehicleData.fuelType}</Badge>} />
                  {vehicleData.powerOutput && <DataRow label="Power" value={vehicleData.powerOutput} />}
                  <DataRow label="Transmission" value={vehicleData.transmission} />
                  <DataRow label="Drive Type" value={vehicleData.driveType} />
                  {vehicleData.tareWeight && <DataRow label="Tare Weight" value={vehicleData.tareWeight} />}
                  {vehicleData.grossVehicleMass && <DataRow label="Gross Mass" value={vehicleData.grossVehicleMass} />}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Registration & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <DataRow label="Registration" value={<Badge variant={vehicleData.registrationStatus === 'Current' ? 'default' : 'destructive'}>{vehicleData.registrationStatus}</Badge>} />
                  <DataRow label="Registration Expiry" value={vehicleData.registrationExpiry} />
                  <DataRow label="Warrant of Fitness (WoF)" value={<Badge variant={vehicleData.wofStatus === 'Current' ? 'default' : 'destructive'}>{vehicleData.wofStatus}</Badge>} />
                  <DataRow label="WoF Expiry" value={vehicleData.wofExpiry} />
                  {vehicleData.rucStatus && <DataRow label="RUC Status" value={<Badge variant="outline">{vehicleData.rucStatus}</Badge>} />}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Safety & History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicleData.safetyRating && <DataRow label="Safety Rating" value={<Badge variant="default">{vehicleData.safetyRating}</Badge>} />}
                  <DataRow label="ABS Brakes" value={vehicleData.hasABS ? "Yes" : "No"} />
                  <DataRow label="Electronic Stability Control" value={vehicleData.hasESC ? "Yes" : "No"} />
                  {vehicleData.numberOfOwners && <DataRow label="Number of Owners" value={vehicleData.numberOfOwners} />}
                  {vehicleData.theftAlertStatus && <DataRow label="Theft Alert" value={<Badge variant={vehicleData.theftAlertStatus === 'Clear' ? 'default' : 'destructive'}>{vehicleData.theftAlertStatus}</Badge>} />}
                  {vehicleData.writeOffStatus && <DataRow label="Write-off Status" value={<Badge variant={vehicleData.writeOffStatus === 'Clear' ? 'default' : 'destructive'}>{vehicleData.writeOffStatus}</Badge>} />}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
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
