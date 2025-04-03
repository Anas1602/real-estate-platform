"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PropertyCard from "@/components/properties/PropertyCard";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

// Mock property data
const mockProperties = [
  {
    id: "1",
    title: "Modern Apartment Complex",
    location: "Downtown",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    basePrice: 850000,
    images: [
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=500&auto=format&fit=crop",
    ],
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1200,
    propertyType: "APARTMENT",
    groupCount: 3,
  },
  {
    id: "2",
    title: "Luxury Condo with Ocean Views",
    location: "Waterfront",
    address: "456 Ocean Ave",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    basePrice: 1250000,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500&auto=format&fit=crop",
    ],
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 2000,
    propertyType: "CONDO",
    groupCount: 2,
  },
  {
    id: "3",
    title: "Family Home in Suburban Community",
    location: "Suburbs",
    address: "789 Oak St",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    basePrice: 550000,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=500&auto=format&fit=crop",
    ],
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2500,
    propertyType: "HOUSE",
    groupCount: 1,
  },
  {
    id: "4",
    title: "Urban Townhouse Near City Center",
    location: "Midtown",
    address: "101 Park Ave",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    basePrice: 1750000,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=500&auto=format&fit=crop",
    ],
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 1800,
    propertyType: "TOWNHOUSE",
    groupCount: 0,
  },
  {
    id: "5",
    title: "Investment Land Opportunity",
    location: "Growth Area",
    address: "555 Future Blvd",
    city: "Phoenix",
    state: "AZ",
    zipCode: "85001",
    basePrice: 350000,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=500&auto=format&fit=crop",
    ],
    propertyType: "LAND",
    groupCount: 5,
  },
  {
    id: "6",
    title: "Commercial Retail Space",
    location: "Shopping District",
    address: "222 Market St",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    basePrice: 950000,
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=500&auto=format&fit=crop",
    ],
    squareFootage: 3000,
    propertyType: "COMMERCIAL",
    groupCount: 1,
  },
];

// Property filter types
type PropertyFilters = {
  searchTerm: string;
  propertyType: string[];
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  location: string;
  hasGroups: boolean;
};

export default function PropertiesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Default price range for the filter
  const defaultMaxPrice =
    Math.max(...mockProperties.map((p) => p.basePrice)) + 100000;

  // Filter state
  const [filters, setFilters] = useState<PropertyFilters>({
    searchTerm: searchParams.get("q") || "",
    propertyType: [],
    priceRange: [0, defaultMaxPrice],
    bedrooms: null,
    bathrooms: null,
    location: "",
    hasGroups: false,
  });

  // UI state
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search term change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
  };

  // Handle form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Toggle property type selection
  const togglePropertyType = (type: string) => {
    setFilters((prev) => {
      const types = [...prev.propertyType];
      if (types.includes(type)) {
        return { ...prev, propertyType: types.filter((t) => t !== type) };
      } else {
        return { ...prev, propertyType: [...types, type] };
      }
    });
  };

  // Reset filters to default
  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      propertyType: [],
      priceRange: [0, defaultMaxPrice],
      bedrooms: null,
      bathrooms: null,
      location: "",
      hasGroups: false,
    });
    setIsFilterModalOpen(false);
  };

  // Apply filters to properties
  const applyFilters = () => {
    setIsLoading(true);

    // Simulate loading time
    setTimeout(() => {
      const filtered = mockProperties.filter((property) => {
        // Search term filter
        if (
          filters.searchTerm &&
          !property.title
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) &&
          !property.city
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) &&
          !property.state
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase())
        ) {
          return false;
        }

        // Property type filter
        if (
          filters.propertyType.length > 0 &&
          !filters.propertyType.includes(property.propertyType)
        ) {
          return false;
        }

        // Price range filter
        if (
          property.basePrice < filters.priceRange[0] ||
          property.basePrice > filters.priceRange[1]
        ) {
          return false;
        }

        // Bedrooms filter
        if (
          filters.bedrooms !== null &&
          property.bedrooms !== undefined &&
          property.bedrooms < filters.bedrooms
        ) {
          return false;
        }

        // Bathrooms filter
        if (
          filters.bathrooms !== null &&
          property.bathrooms !== undefined &&
          property.bathrooms < filters.bathrooms
        ) {
          return false;
        }

        // Location filter
        if (
          filters.location &&
          !property.city
            .toLowerCase()
            .includes(filters.location.toLowerCase()) &&
          !property.state.toLowerCase().includes(filters.location.toLowerCase())
        ) {
          return false;
        }

        // Has groups filter
        if (
          filters.hasGroups &&
          (!property.groupCount || property.groupCount === 0)
        ) {
          return false;
        }

        return true;
      });

      setFilteredProperties(filtered);
      setIsLoading(false);

      // Update URL with search params
      if (filters.searchTerm) {
        router.push(`/properties?q=${encodeURIComponent(filters.searchTerm)}`);
      } else {
        router.push("/properties");
      }
    }, 500);
  };

  // Apply filters when component mounts or when search params change
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Find Your Dream Property
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our curated collection of properties and join others to get the
          best deals through group buying
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row gap-3 p-2 rounded-xl bg-gray-800/80 border border-gray-700 shadow-sm backdrop-blur-sm">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by location, property type, or keyword..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="form-input pl-12 w-full rounded-lg bg-gray-900/60 border-gray-700 text-white placeholder:text-gray-400 placeholder:left-28"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className="btn-outline flex items-center justify-center md:w-auto">
            <FiFilter className="mr-2" />
            Filters
          </button>
          <button
            type="submit"
            className="btn-primary md:w-auto flex items-center justify-center">
            Search
          </button>
        </form>
      </div>

      {/* Properties Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-muted-foreground">Finding properties for you...</p>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-xl border border-border">
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted/50 flex items-center justify-center">
            <FiSearch className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">No properties found</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We couldn&apos;t find any properties matching your search criteria.
            Try adjusting your filters or search for something else.
          </p>
          <button onClick={resetFilters} className="btn-primary">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              featured={index === 0}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-background rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex justify-between items-center p-5 border-b border-border">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors">
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Property Type */}
              <div>
                <h3 className="font-medium mb-3">Property Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "APARTMENT",
                    "HOUSE",
                    "CONDO",
                    "TOWNHOUSE",
                    "LAND",
                    "COMMERCIAL",
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => togglePropertyType(type)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        filters.propertyType.includes(type)
                          ? "bg-primary text-white border-primary"
                          : "bg-muted/30 border-border hover:bg-muted"
                      }`}>
                      {type.charAt(0) + type.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Min: ${filters.priceRange[0].toLocaleString()}</span>
                    <span>Max: ${filters.priceRange[1].toLocaleString()}</span>
                  </div>
                  {/* Price range slider would go here */}
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <h3 className="font-medium mb-3">Bedrooms</h3>
                <div className="flex space-x-2">
                  {[null, 1, 2, 3, 4, 5].map((num, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, bedrooms: num }))
                      }
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        filters.bedrooms === num
                          ? "bg-primary text-white"
                          : "bg-muted/30 hover:bg-muted"
                      }`}>
                      {num === null ? "Any" : num === 5 ? "5+" : num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <h3 className="font-medium mb-3">Bathrooms</h3>
                <div className="flex space-x-2">
                  {[null, 1, 2, 3, 4, 5].map((num, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, bathrooms: num }))
                      }
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        filters.bathrooms === num
                          ? "bg-primary text-white"
                          : "bg-muted/30 hover:bg-muted"
                      }`}>
                      {num === null ? "Any" : num === 5 ? "5+" : num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Has Active Groups */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasGroups"
                  checked={filters.hasGroups}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      hasGroups: !prev.hasGroups,
                    }))
                  }
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="hasGroups" className="ml-2">
                  Only show properties with active groups
                </label>
              </div>
            </div>

            <div className="border-t border-border p-5 flex space-x-4">
              <button
                type="button"
                onClick={resetFilters}
                className="btn-outline flex-1">
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  applyFilters();
                  setIsFilterModalOpen(false);
                }}
                className="btn-primary flex-1">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
