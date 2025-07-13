import VehicleLookup from "@/components/VehicleLookup";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <img 
              src={heroImage} 
              alt="Kiwi Car Checker" 
              className="mx-auto mb-8 rounded-2xl shadow-elegant max-w-md w-full h-auto"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Kiwi Car Checker
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Get instant vehicle details for any New Zealand registered car
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Simply enter a license plate number to access comprehensive vehicle information, 
              registration status, and important compliance details.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <VehicleLookup />
      </div>

      {/* Footer */}
      <footer className="bg-secondary py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Kiwi Car Checker - Your trusted source for New Zealand vehicle information
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
