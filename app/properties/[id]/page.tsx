"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FiHome,
  FiMapPin,
  FiMaximize2,
  FiDollarSign,
  FiUsers,
  FiHeart,
  FiShare2,
  FiArrowLeft,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import { IoBed, IoWater } from "react-icons/io5";

// Mock property data - in a real app this would come from an API
const mockProperties = [
  {
    id: "1",
    title: "Modern Apartment Complex",
    description:
      "This stunning modern apartment complex offers luxury living in the heart of downtown. Features include high ceilings, floor-to-ceiling windows, and premium finishes throughout. The building offers amenities like a rooftop pool, fitness center, and 24-hour concierge service. Walking distance to restaurants, shopping, and public transportation.",
    location: "Downtown",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    basePrice: 850000,
    images: [
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598528644866-3215eb3e9771?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop",
    ],
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1200,
    propertyType: "APARTMENT",
    features: [
      "Floor-to-ceiling windows",
      "Hardwood floors",
      "Stainless steel appliances",
      "Quartz countertops",
      "In-unit laundry",
      "Central air conditioning",
      "Private balcony",
      "Secure building access",
    ],
    developer: {
      id: "101",
      name: "Urban Developments Inc.",
      verificationStatus: "VERIFIED",
      profileInfo:
        "Luxury property developer with over 25 years of experience.",
      rating: 4.8,
      totalProperties: 12,
    },
    groupCount: 3,
    activeGroups: [
      {
        id: "g1",
        name: "Downtown Group Buy #1",
        members: 7,
        minMembers: 5,
        maxMembers: 10,
        targetPrice: 799000,
        status: "FORMING",
        progress: 70,
      },
      {
        id: "g2",
        name: "Investor Collective",
        members: 4,
        minMembers: 5,
        maxMembers: 15,
        targetPrice: 780000,
        status: "FORMING",
        progress: 40,
      },
      {
        id: "g3",
        name: "San Francisco Home Buyers",
        members: 8,
        minMembers: 8,
        maxMembers: 12,
        targetPrice: 790000,
        status: "NEGOTIATING",
        progress: 80,
      },
    ],
  },
  {
    id: "2",
    title: "Luxury Condo with Ocean Views",
    description:
      "Experience luxury living with breathtaking ocean views in this high-end condo. Floor-to-ceiling windows showcase panoramic vistas of the Atlantic Ocean. The open concept living area features premium finishes, a gourmet kitchen, and expansive terrace perfect for entertaining. Building amenities include infinity pool, spa, fitness center, and 24/7 security.",
    location: "Waterfront",
    address: "456 Ocean Ave",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    basePrice: 1250000,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090733a21ca?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop",
    ],
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 2000,
    propertyType: "CONDO",
    features: [
      "Ocean views",
      "Private terrace",
      "Italian marble floors",
      "Smart home system",
      "Designer fixtures",
      "Wine cooler",
      "Custom closets",
      "Impact-resistant windows",
    ],
    developer: {
      id: "102",
      name: "Coastal Luxury Developers",
      verificationStatus: "VERIFIED",
      profileInfo: "Specialists in waterfront luxury properties since 2005.",
      rating: 4.9,
      totalProperties: 8,
    },
    groupCount: 2,
    activeGroups: [
      {
        id: "g4",
        name: "Miami Luxury Buyers",
        members: 5,
        minMembers: 4,
        maxMembers: 8,
        targetPrice: 1150000,
        status: "FORMING",
        progress: 65,
      },
      {
        id: "g5",
        name: "Ocean View Investment Group",
        members: 3,
        minMembers: 5,
        maxMembers: 10,
        targetPrice: 1100000,
        status: "FORMING",
        progress: 30,
      },
    ],
  },
  {
    id: "3",
    title: "Family Home in Suburban Community",
    description:
      "Perfect family home in a highly sought-after suburban community with excellent schools. This spacious property features an open floor plan, updated kitchen, large backyard, and two-car garage. The community offers parks, trails, and a neighborhood pool. Located within minutes of shopping centers, restaurants, and major highways for easy commuting.",
    location: "Suburbs",
    address: "789 Oak St",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    basePrice: 550000,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-4e4d518cf5c1?q=80&w=1000&auto=format&fit=crop",
    ],
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2500,
    propertyType: "HOUSE",
    features: [
      "Open floor plan",
      "Updated kitchen",
      "Large backyard",
      "Two-car garage",
      "Energy-efficient appliances",
      "Newly renovated bathrooms",
      "Home office space",
      "Community amenities",
    ],
    developer: {
      id: "103",
      name: "Austin Home Builders",
      verificationStatus: "VERIFIED",
      profileInfo: "Family-owned builder focused on quality suburban homes.",
      rating: 4.7,
      totalProperties: 15,
    },
    groupCount: 1,
    activeGroups: [
      {
        id: "g6",
        name: "Austin Family Home Buyers",
        members: 6,
        minMembers: 6,
        maxMembers: 12,
        targetPrice: 520000,
        status: "NEGOTIATING",
        progress: 75,
      },
    ],
  },
  {
    id: "4",
    title: "Urban Townhouse Near City Center",
    description:
      "Contemporary townhouse offering the perfect blend of luxury and urban convenience. This multi-level home features premium finishes, a chef's kitchen, private roof deck with city views, and attached garage. Located in the heart of the city, you'll be steps away from world-class dining, entertainment, and cultural attractions.",
    location: "Midtown",
    address: "101 Park Ave",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    basePrice: 1750000,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?q=80&w=1000&auto=format&fit=crop",
    ],
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 1800,
    propertyType: "TOWNHOUSE",
    features: [
      "Multi-level living",
      "Chef's kitchen",
      "Private roof deck",
      "Attached garage",
      "Smart home technology",
      "Gas fireplace",
      "Custom built-ins",
      "Floor-to-ceiling windows",
    ],
    developer: {
      id: "104",
      name: "Metropolitan Developers",
      verificationStatus: "VERIFIED",
      profileInfo:
        "Specializing in luxury urban residences in prime locations.",
      rating: 4.6,
      totalProperties: 10,
    },
    groupCount: 0,
    activeGroups: [],
  },
  {
    id: "5",
    title: "Investment Land Opportunity",
    description:
      "Prime investment opportunity in one of the fastest-growing areas. This undeveloped land is situated in a high-growth corridor with nearby commercial development and residential expansion. Perfect for developers, investors, or those looking to build a custom property. Utilities are available at the property line and zoning allows for multiple development options.",
    location: "Growth Area",
    address: "555 Future Blvd",
    city: "Phoenix",
    state: "AZ",
    zipCode: "85001",
    basePrice: 350000,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552100389-2255667309b6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615887251136-85bd3dd6ab9a?q=80&w=1000&auto=format&fit=crop",
    ],
    propertyType: "LAND",
    features: [
      "High-growth area",
      "Utilities at property line",
      "Flexible zoning options",
      "Accessible location",
      "Near future development",
      "Flat, buildable lot",
      "No HOA restrictions",
      "Investment potential",
    ],
    developer: {
      id: "105",
      name: "Desert Development Group",
      verificationStatus: "VERIFIED",
      profileInfo:
        "Specializing in land development and investment properties.",
      rating: 4.5,
      totalProperties: 20,
    },
    groupCount: 5,
    activeGroups: [
      {
        id: "g7",
        name: "Phoenix Investors Group",
        members: 12,
        minMembers: 10,
        maxMembers: 20,
        targetPrice: 330000,
        status: "FORMING",
        progress: 60,
      },
      {
        id: "g8",
        name: "Land Development Collective",
        members: 8,
        minMembers: 8,
        maxMembers: 15,
        targetPrice: 325000,
        status: "NEGOTIATING",
        progress: 85,
      },
      {
        id: "g9",
        name: "Future Build Group",
        members: 5,
        minMembers: 5,
        maxMembers: 10,
        targetPrice: 320000,
        status: "FORMING",
        progress: 50,
      },
    ],
  },
  {
    id: "6",
    title: "Commercial Retail Space",
    description:
      "Excellent opportunity to own a prime commercial retail space in a high-traffic shopping district. This versatile space features an open floor plan, high ceilings, large display windows, and ADA-compliant accessibility. Currently configured for retail but adaptable to various business needs. Located on a busy street with ample foot traffic and parking nearby.",
    location: "Shopping District",
    address: "222 Market St",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    basePrice: 950000,
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1000&auto=format&fit=crop",
    ],
    squareFootage: 3000,
    propertyType: "COMMERCIAL",
    features: [
      "High-traffic location",
      "Open floor plan",
      "Large display windows",
      "ADA-compliant",
      "HVAC system",
      "Storage area",
      "Security system",
      "Signage opportunity",
    ],
    developer: {
      id: "106",
      name: "Urban Commercial Properties",
      verificationStatus: "VERIFIED",
      profileInfo:
        "Specializing in commercial real estate development since 1995.",
      rating: 4.7,
      totalProperties: 18,
    },
    groupCount: 1,
    activeGroups: [
      {
        id: "g10",
        name: "Chicago Business Collective",
        members: 4,
        minMembers: 4,
        maxMembers: 8,
        targetPrice: 900000,
        status: "FORMING",
        progress: 45,
      },
    ],
  },
];

// Define proper types for the property data
interface Developer {
  id: string;
  name: string;
  verificationStatus: string;
  profileInfo: string;
  rating: number;
  totalProperties: number;
}

interface Group {
  id: string;
  name: string;
  members: number;
  minMembers: number;
  maxMembers: number;
  targetPrice: number;
  status: string;
  progress: number;
}

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  basePrice: number;
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  propertyType: string;
  features: string[];
  developer: Developer;
  groupCount: number;
  activeGroups: Group[];
}

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProperty = async () => {
      try {
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const foundProperty = mockProperties.find((p) => p.id === params.id);

        if (!foundProperty) {
          router.push("/properties");
          return;
        }

        setProperty(foundProperty);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [params.id, router]);

  const handlePrevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Property Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          The property you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/properties"
          className="btn-primary inline-flex items-center">
          <FiArrowLeft className="mr-2" />
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Navigation */}
      <div className="flex items-center mb-6 animate-slide-in">
        <Link
          href="/properties"
          className="text-muted-foreground hover:text-foreground flex items-center group">
          <FiArrowLeft className="mr-1 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Properties</span>
        </Link>
        <div className="mx-2 text-muted-foreground">/</div>
        <span className="text-foreground">{property.title}</span>
      </div>

      {/* Property Title and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 animate-fade-in animate-delay-100">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {property.title}
          </h1>
          <div className="flex items-center text-muted-foreground">
            <FiMapPin className="mr-1" />
            <span>
              {property.address}, {property.city}, {property.state}{" "}
              {property.zipCode}
            </span>
          </div>
        </div>

        <div className="flex mt-4 md:mt-0 space-x-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="btn-outline flex items-center py-2 transition-all">
            <FiHeart
              className={`mr-2 transition-all ${
                isLiked ? "fill-error text-error animate-scale-in" : ""
              }`}
            />
            {isLiked ? "Saved" : "Save"}
          </button>
          <button className="btn-outline flex items-center py-2">
            <FiShare2 className="mr-2" />
            Share
          </button>
        </div>
      </div>

      {/* Property Image Gallery */}
      <div className="relative mb-8 h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-md animate-scale-in animate-delay-100">
        <Image
          src={property.images[currentImageIndex]}
          alt={`${property.title} - Image ${currentImageIndex + 1}`}
          fill
          style={{ objectFit: "cover" }}
          priority
          className="rounded-xl transition-transform duration-700 ease-in-out hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>

        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/75 backdrop-blur-sm rounded-full hover:bg-background/90 transition-colors shadow-lg hover:scale-105 active:scale-95 transition-all"
          aria-label="Previous image">
          <FiChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/75 backdrop-blur-sm rounded-full hover:bg-background/90 transition-colors shadow-lg hover:scale-105 active:scale-95 transition-all"
          aria-label="Next image">
          <FiChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glassmorphism px-4 py-2 rounded-full shadow-md">
          <span className="text-sm font-medium">
            {currentImageIndex + 1} / {property.images.length}
          </span>
        </div>
      </div>

      {/* Main Content - Two Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Property Details) */}
        <div className="lg:col-span-2 animate-fade-in animate-delay-200">
          {/* Tabs */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 border-b-2 font-medium text-sm transition-all ${
                  activeTab === "details"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}>
                Property Details
              </button>
              <button
                onClick={() => setActiveTab("groups")}
                className={`py-4 border-b-2 font-medium text-sm flex items-center transition-all ${
                  activeTab === "groups"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}>
                Active Groups
                <span className="ml-2 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs">
                  {property.activeGroups.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("developer")}
                className={`py-4 border-b-2 font-medium text-sm transition-all ${
                  activeTab === "developer"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}>
                Developer
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {/* Property Details Tab */}
            {activeTab === "details" && (
              <div className="animate-fade-in">
                <div className="bg-muted/20 border border-border rounded-xl p-6 mb-8 hover-lift">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-primary/10 p-3 mb-2">
                        <FiHome className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-center">
                        <span className="text-sm text-muted-foreground">
                          Type
                        </span>
                        <p className="font-medium">
                          {property.propertyType.charAt(0) +
                            property.propertyType.slice(1).toLowerCase()}
                        </p>
                      </div>
                    </div>

                    {property.bedrooms && (
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-primary/10 p-3 mb-2">
                          <IoBed className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                          <span className="text-sm text-muted-foreground">
                            Bedrooms
                          </span>
                          <p className="font-medium">{property.bedrooms}</p>
                        </div>
                      </div>
                    )}

                    {property.bathrooms && (
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-primary/10 p-3 mb-2">
                          <IoWater className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                          <span className="text-sm text-muted-foreground">
                            Bathrooms
                          </span>
                          <p className="font-medium">{property.bathrooms}</p>
                        </div>
                      </div>
                    )}

                    {property.squareFootage && (
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-primary/10 p-3 mb-2">
                          <FiMaximize2 className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                          <span className="text-sm text-muted-foreground">
                            Area
                          </span>
                          <p className="font-medium">
                            {property.squareFootage.toLocaleString()} sq ft
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent inline-block">
                    About this property
                  </h2>
                  <p className="text-muted-foreground whitespace-pre-line mb-6 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {property.features && property.features.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent inline-block">
                      Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {property.features.map(
                        (feature: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center hover-lift">
                            <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                            <span>{feature}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Active Groups Tab */}
            {activeTab === "groups" && (
              <div className="animate-fade-in">
                <div className="bg-muted/20 border border-border rounded-xl p-6 mb-8 hover-lift">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent inline-block">
                        Active Buying Groups
                      </h2>
                      <p className="text-muted-foreground">
                        Join an existing group or create your own to negotiate a
                        better price
                      </p>
                    </div>
                    <Link
                      href={`/properties/${property.id}/groups/create`}
                      className="btn-primary mt-4 md:mt-0 hover:scale-102 transition-transform">
                      Create New Group
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {property.activeGroups.map(
                      (group: Group, index: number) => (
                        <div
                          key={group.id}
                          className={`border border-border rounded-xl p-5 hover:border-primary/50 hover-lift transition-all animate-fade-in animate-delay-${
                            (index % 3) * 100
                          }`}>
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {group.name}
                              </h3>
                              <div className="flex items-center space-x-4 mt-2">
                                <div className="flex items-center">
                                  <FiUsers className="text-primary mr-1" />
                                  <span className="text-sm">
                                    {group.members} / {group.maxMembers} members
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <FiDollarSign className="text-primary mr-1" />
                                  <span className="text-sm">
                                    Target: {formatPrice(group.targetPrice)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 md:mt-0">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  group.status === "FORMING"
                                    ? "bg-primary/10 text-primary"
                                    : "bg-secondary/10 text-secondary"
                                }`}>
                                {group.status === "FORMING"
                                  ? "Forming"
                                  : "Negotiating"}
                              </span>
                            </div>
                          </div>

                          <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden mb-4">
                            <div
                              className="bg-primary h-full rounded-full transition-all duration-1000 ease-in-out"
                              style={{ width: `${group.progress}%` }}></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              {group.status === "FORMING"
                                ? `${
                                    group.minMembers - group.members > 0
                                      ? group.minMembers - group.members
                                      : 0
                                  } more members needed`
                                : "Actively negotiating with developer"}
                            </span>
                            <Link
                              href={`/properties/${property.id}/groups/${group.id}`}
                              className="btn-outline text-sm py-1 hover:scale-102 transition-transform">
                              View Group
                            </Link>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Developer Tab */}
            {activeTab === "developer" && (
              <div className="animate-fade-in">
                <div className="bg-muted/20 border border-border rounded-xl p-6 mb-8 hover-lift">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-xl font-bold text-white">
                        {property.developer.name.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent inline-block">
                          {property.developer.name}
                        </h2>

                        <div className="mt-2 md:mt-0">
                          {property.developer.verificationStatus ===
                            "VERIFIED" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                              Verified Developer
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-5 leading-relaxed">
                        {property.developer.profileInfo}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-muted/40 rounded-lg hover-lift">
                          <span className="text-muted-foreground text-sm">
                            Rating
                          </span>
                          <p className="font-medium">
                            {property.developer.rating}/5
                          </p>
                        </div>

                        <div className="p-3 bg-muted/40 rounded-lg hover-lift">
                          <span className="text-muted-foreground text-sm">
                            Properties
                          </span>
                          <p className="font-medium">
                            {property.developer.totalProperties}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Link
                    href={`/developers/${property.developer.id}`}
                    className="btn-outline hover:scale-102 active:scale-98 transition-transform">
                    View Developer Profile
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Pricing & CTA) */}
        <div className="lg:col-span-1 animate-fade-in animate-delay-300">
          <div className="sticky top-4">
            <div className="card shadow-md border-2 p-6 mb-6 rounded-xl hover-lift">
              <div className="mb-4">
                <span className="text-muted-foreground">Base Price</span>
                <div className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {formatPrice(property.basePrice)}
                </div>
              </div>

              <div className="border-t border-border my-4 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Group buying discount:</span>
                  <span className="text-success">Up to 15%</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Potential savings:</span>
                  <span className="text-success">
                    {formatPrice(property.basePrice * 0.15)}
                  </span>
                </div>
              </div>

              <Link
                href={`/properties/${property.id}/groups`}
                className="btn-primary w-full flex justify-center mb-4 hover:scale-102 active:scale-98 transition-transform shadow-sm hover:shadow-md">
                Join a Buying Group
              </Link>

              <Link
                href={`/properties/${property.id}/contact`}
                className="btn-outline w-full flex justify-center hover:scale-102 active:scale-98 transition-transform">
                Contact Developer
              </Link>
            </div>

            <div className="card p-5 bg-gradient-to-br from-primary/5 to-purple-600/5 rounded-xl border border-border/50 hover-lift">
              <h3 className="font-medium mb-2">Need more information?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about this property or the group buying process?
                Our team is here to help.
              </p>
              <Link
                href="/contact"
                className="text-primary hover:text-primary-dark text-sm flex items-center group">
                Contact support
                <FiChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
