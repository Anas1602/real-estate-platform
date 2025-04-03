import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiHome,
  FiMaximize2,
  FiHeart,
  FiUsers,
  FiMapPin,
} from "react-icons/fi";
import { IoBed, IoWater } from "react-icons/io5";

type PropertyCardProps = {
  property: {
    id: string;
    title: string;
    location: string;
    address: string;
    city: string;
    state: string;
    basePrice: number;
    images: string[];
    bedrooms?: number;
    bathrooms?: number;
    squareFootage?: number;
    propertyType: string;
    groupCount?: number;
  };
  featured?: boolean;
  index?: number;
};

export default function PropertyCard({
  property,
  featured = false,
  index = 0,
}: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case "APARTMENT":
        return <FiHome className="text-primary" />;
      case "HOUSE":
        return <FiHome className="text-primary" />;
      case "CONDO":
        return <FiHome className="text-primary" />;
      case "TOWNHOUSE":
        return <FiHome className="text-primary" />;
      case "LAND":
        return <FiMapPin className="text-primary" />;
      case "COMMERCIAL":
        return <FiHome className="text-primary" />;
      default:
        return <FiHome className="text-primary" />;
    }
  };

  // Animation delay based on index
  const getAnimationDelay = () => {
    const delay = (index % 5) * 100;
    return `animate-delay-${delay}`;
  };

  return (
    <div
      className={`card p-0 overflow-hidden transition-all duration-300 hover-lift animate-fade-in ${getAnimationDelay()} ${
        featured
          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
          : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="relative">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={
              property.images[0] ||
              "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=500&auto=format&fit=crop"
            }
            alt={property.title}
            fill
            style={{
              objectFit: "cover",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            className="rounded-t-xl"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/75 backdrop-blur-sm hover:bg-background/90 transition-colors shadow-sm z-10"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}>
            <FiHeart
              className={`h-5 w-5 transition-all duration-300 ${
                isLiked
                  ? "fill-error text-error animate-scale-in"
                  : "text-muted-foreground"
              }`}
            />
          </button>

          {featured && (
            <div className="absolute bottom-0 left-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-tr-lg">
              Featured
            </div>
          )}

          {property.groupCount && property.groupCount > 0 && (
            <div className="absolute bottom-0 right-0 glassmorphism text-foreground px-3 py-1 text-xs font-medium flex items-center rounded-tl-lg shadow-sm">
              <FiUsers className="mr-1" />
              {property.groupCount}{" "}
              {property.groupCount === 1 ? "Group" : "Groups"}
            </div>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold line-clamp-1 hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center text-xs bg-muted px-2 py-1 rounded-lg">
            {getPropertyTypeIcon(property.propertyType)}
            <span className="ml-1">
              {property.propertyType.charAt(0) +
                property.propertyType.slice(1).toLowerCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <FiMapPin className="mr-1 h-3 w-3 flex-shrink-0" />
          <span className="truncate">
            {property.city}, {property.state}
          </span>
        </div>

        <div className="flex items-baseline space-x-1 mb-4">
          <span className="text-xl font-bold text-foreground">
            {formatPrice(property.basePrice)}
          </span>
          <span className="text-sm text-muted-foreground">base price</span>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground mb-5">
          {property.bedrooms !== undefined && (
            <div className="flex items-center">
              <IoBed className="mr-1" />
              <span>
                {property.bedrooms} {property.bedrooms === 1 ? "bed" : "beds"}
              </span>
            </div>
          )}

          {property.bathrooms !== undefined && (
            <div className="flex items-center">
              <IoWater className="mr-1" />
              <span>
                {property.bathrooms}{" "}
                {property.bathrooms === 1 ? "bath" : "baths"}
              </span>
            </div>
          )}

          {property.squareFootage !== undefined && (
            <div className="flex items-center">
              <FiMaximize2 className="mr-1" />
              <span>{property.squareFootage.toLocaleString()} sq ft</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href={`/properties/${property.id}`}
            className="btn-primary text-sm py-2 flex items-center justify-center">
            View Property
          </Link>

          <Link
            href={`/properties/${property.id}/groups`}
            className="btn-outline text-sm py-2 flex items-center justify-center">
            Join Group
          </Link>
        </div>
      </div>
    </div>
  );
}
