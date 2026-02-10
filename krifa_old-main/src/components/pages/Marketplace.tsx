import { Store, Package, TrendingUp, MapPin, Phone, Star, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const Marketplace = () => {
  const buyerListings = [
    {
      id: 1,
      company: "FreshProduce Corp",
      crop: "Tomatoes",
      quantity: "100 tonnes",
      price: "₹25,000/tonne",
      location: "Mumbai, 45 km",
      rating: 4.5,
      verified: true,
      urgent: false,
      contact: "+91 98765 43210"
    },
    {
      id: 2,
      company: "Maharashtra Agro Industries",
      crop: "Wheat",
      quantity: "500 tonnes",
      price: "₹22,500/tonne",
      location: "Pune, 28 km",
      rating: 4.8,
      verified: true,
      urgent: true,
      contact: "+91 87654 32109"
    },
    {
      id: 3,
      company: "Golden Harvest Ltd",
      crop: "Cotton",
      quantity: "200 tonnes",
      price: "₹72,000/tonne",
      location: "Nagpur, 65 km",
      rating: 4.2,
      verified: true,
      urgent: false,
      contact: "+91 76543 21098"
    }
  ];

  const lossRecoveryOpportunities = [
    {
      id: 1,
      buyer: "Food Processing Co.",
      type: "Damaged Vegetables",
      description: "Overripe tomatoes for juice processing",
      price: "₹8,000/tonne",
      quantity: "50 tonnes",
      distance: "15 km",
      timeLeft: "2 days",
      status: "Active"
    },
    {
      id: 2,
      buyer: "Animal Feed Corp",
      type: "Grade B Crops",
      description: "Mixed vegetable waste for cattle feed",
      price: "₹3,500/tonne", 
      quantity: "100 tonnes",
      distance: "25 km",
      timeLeft: "5 days",
      status: "Active"
    },
    {
      id: 3,
      buyer: "Bio Fertilizer Ltd",
      type: "Organic Waste",
      description: "Crop residue for compost production",
      price: "₹1,200/tonne",
      quantity: "200 tonnes",
      distance: "35 km",
      timeLeft: "1 week",
      status: "Active"
    }
  ];

  const governmentSchemes = [
    {
      name: "PM-KISAN",
      description: "Direct income support of ₹6,000 per year",
      eligibility: "Small & marginal farmers",
      amount: "₹6,000/year",
      status: "Applied",
      nextInstallment: "March 2025"
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance against natural calamities",
      eligibility: "All farmers",
      amount: "Up to ₹2,00,000",
      status: "Enrolled",
      coverage: "15.5 acres"
    },
    {
      name: "eNAM (National Agriculture Market)",
      description: "Online trading platform for agricultural commodities",
      eligibility: "Registered farmers",
      amount: "Better price discovery",
      status: "Registered",
      benefits: "Direct market access"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
          <p className="text-muted-foreground">Connect with buyers and access government schemes</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Package className="h-4 w-4 mr-2" />
            List My Crop
          </Button>
        </div>
      </div>

      <Tabs defaultValue="buyers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="buyers">Crop Buyers</TabsTrigger>
          <TabsTrigger value="loss-recovery">Loss Recovery</TabsTrigger>
          <TabsTrigger value="government">Gov Schemes</TabsTrigger>
          <TabsTrigger value="my-listings">My Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="buyers" className="space-y-6">
          {/* Search */}
          <div className="flex space-x-4">
            <Input placeholder="Search by crop, company, or location..." className="flex-1" />
            <Button variant="outline">Search</Button>
          </div>

          {/* Buyer Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {buyerListings.map((listing) => (
              <Card key={listing.id} className="shadow-soft border-border hover:shadow-medium transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
                        <Store className="h-5 w-5 text-primary" />
                        <span>{listing.company}</span>
                        {listing.verified && (
                          <Badge variant="default" className="text-xs">Verified</Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < Math.floor(listing.rating) 
                                  ? 'text-accent fill-current' 
                                  : 'text-muted-foreground'
                              }`} 
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">({listing.rating})</span>
                        </div>
                      </div>
                    </div>
                    {listing.urgent && (
                      <Badge variant="destructive" className="text-xs">Urgent</Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Crop</p>
                      <p className="font-medium text-foreground">{listing.crop}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="font-medium text-foreground">{listing.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                    <span className="font-medium text-success">Price Offered</span>
                    <span className="text-lg font-bold text-success">{listing.price}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      Contact Buyer
                    </Button>
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="loss-recovery" className="space-y-6">
          <div className="bg-gradient-to-r from-destructive/10 to-accent/10 p-6 rounded-lg border border-destructive/20">
            <h3 className="text-lg font-semibold text-foreground mb-2">Crop Loss Monetization</h3>
            <p className="text-muted-foreground mb-4">
              Convert your damaged or surplus crops into revenue through industrial buyers and processing companies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">₹2.5L</p>
                <p className="text-sm text-muted-foreground">Potential Recovery</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">15</p>
                <p className="text-sm text-muted-foreground">Active Buyers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">95%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {lossRecoveryOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="shadow-soft border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{opportunity.buyer}</h4>
                      <p className="text-sm text-muted-foreground">{opportunity.type}</p>
                    </div>
                    <Badge variant="default">{opportunity.status}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{opportunity.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="font-bold text-success">{opportunity.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Quantity</p>
                      <p className="font-medium text-foreground">{opportunity.quantity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Distance</p>
                      <p className="font-medium text-foreground">{opportunity.distance}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Time left: <span className="font-medium text-foreground">{opportunity.timeLeft}</span>
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm">Accept Offer</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="government" className="space-y-6">
          <div className="bg-gradient-harvest p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Government Support Programs</h3>
            <p className="text-white/90 mb-4">
              Access subsidies, insurance, and support schemes designed for farmers
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">₹8,500</p>
                <p className="text-sm text-white/80">Received This Year</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-white/80">Active Schemes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">₹12,000</p>
                <p className="text-sm text-white/80">Pending Benefits</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {governmentSchemes.map((scheme, index) => (
              <Card key={index} className="shadow-soft border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground text-lg">{scheme.name}</h4>
                      <p className="text-sm text-muted-foreground">{scheme.description}</p>
                    </div>
                    <Badge variant={scheme.status === "Applied" ? "secondary" : "default"}>
                      {scheme.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Benefit Amount</p>
                      <p className="font-bold text-success">{scheme.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Eligibility</p>
                      <p className="font-medium text-foreground">{scheme.eligibility}</p>
                    </div>
                  </div>

                  {scheme.nextInstallment && (
                    <div className="p-3 bg-primary/10 rounded-lg mb-4">
                      <p className="text-sm text-primary">
                        Next installment: <span className="font-medium">{scheme.nextInstallment}</span>
                      </p>
                    </div>
                  )}

                  {scheme.coverage && (
                    <div className="p-3 bg-success/10 rounded-lg mb-4">
                      <p className="text-sm text-success">
                        Coverage: <span className="font-medium">{scheme.coverage}</span>
                      </p>
                    </div>
                  )}

                  {scheme.benefits && (
                    <div className="p-3 bg-accent/10 rounded-lg mb-4">
                      <p className="text-sm text-accent-foreground">
                        Benefits: <span className="font-medium">{scheme.benefits}</span>
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    {scheme.status === "Applied" && (
                      <Button size="sm">Track Application</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-listings" className="space-y-6">
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Active Listings</h3>
            <p className="text-muted-foreground mb-6">
              Start by listing your crops to connect with buyers
            </p>
            <Button className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Create Your First Listing</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketplace;