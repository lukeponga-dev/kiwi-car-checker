import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Car, Calendar, Palette, Cog, MapPin, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VehicleData {
  plate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  vin: string;
  engineSize: string;
  fuelType: string;
  registrationStatus: string;
  warrantyExpiry: string;
  registrationExpiry: string;
  lastInspection: string;
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
    
    // Simulate API call - in real app, this would call the NZ vehicle API
    setTimeout(() => {
      // Mock data for demonstration
      const mockData: VehicleData = {
        plate: plateNumber.toUpperCase(),
        make: "Toyota",
        model: "Camry",
        year: 2019,
        color: "Silver",
        vin: "1NXBR32E37Z******",
        engineSize: "2.5L",
        fuelType: "Petrol",
        registrationStatus: "Current",
        warrantyExpiry: "2025-03-15",
        registrationExpiry: "2024-08-20",
        lastInspection: "2024-02-10"
      };
      
      setVehicleData(mockData);
      setIsLoading(false);
      
      toast({
        title: "Vehicle Found",
        description: `Details retrieved for ${mockData.year} ${mockData.make} ${mockData.model}`,
      });
    }, 1500);
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
        <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
          {/* Basic Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">License Plate</span>
                <Badge variant="outline" className="font-mono">
                  {vehicleData.plate}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Make & Model</span>
                <span className="font-semibold">
                  {vehicleData.make} {vehicleData.model}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Year
                </span>
                <span>{vehicleData.year}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Palette className="h-4 w-4" />
                  Color
                </span>
                <span>{vehicleData.color}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">VIN</span>
                <span className="font-mono text-sm">{vehicleData.vin}</span>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="h-5 w-5" />
                Technical Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Engine Size</span>
                <span>{vehicleData.engineSize}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Fuel Type</span>
                <Badge variant="secondary">{vehicleData.fuelType}</Badge>
              </div>
              
              <Separator />
              
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
                <span className="text-muted-foreground">Last Inspection</span>
                <span>{vehicleData.lastInspection}</span>
              </div>
            </CardContent>
          </Card>

          {/* Important Notices */}
          <Card className="md:col-span-2 shadow-card">
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