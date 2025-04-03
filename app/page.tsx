import Image from "next/image";
import Link from "next/link";
import {
  FiUsers,
  FiHome,
  FiArrowRight,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-luxury-home.jpg"
            alt="Luxury Property Group Buying"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 fade-in">
              Collective Luxury
              <br />
              <span className="text-primary golden-gradient">Reimagined</span>
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl fade-in"
              style={{ animationDelay: "0.2s" }}>
              Join forces with like-minded buyers to purchase premium properties
              at extraordinary prices through our innovative group buying
              platform.
            </p>
            <div
              className="flex flex-wrap gap-4 fade-in"
              style={{ animationDelay: "0.4s" }}>
              <Link href="/properties" className="btn-primary">
                Explore Properties
              </Link>
              <Link
                href="/how-it-works"
                className="btn-outline border-white text-white hover:bg-white/10">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title centered fade-in">
              Featured Opportunities
            </h2>
            <p
              className="text-muted-foreground max-w-2xl mx-auto fade-in"
              style={{ animationDelay: "0.2s" }}>
              Discover curated luxury properties available for group purchase
              today, with significant savings compared to market prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property 1 */}
            <div
              className="property-card bg-background overflow-hidden fade-in"
              style={{ animationDelay: "0.3s" }}>
              <div className="relative h-64">
                <Image
                  src="/images/property-1.jpg"
                  alt="Oceanview Penthouse"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-white text-xs uppercase tracking-wider">
                  Group forming
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-2">
                  Oceanview Penthouse
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Miami Beach, Florida
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">$1,850,000</span>
                  <span className="text-sm text-primary font-medium">
                    3 groups active
                  </span>
                </div>
                <div className="pt-4 border-t border-border">
                  <Link
                    href="/properties/oceanview-penthouse"
                    className="flex items-center justify-between text-sm font-medium">
                    <span>View Opportunity</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            {/* Property 2 */}
            <div
              className="property-card bg-background overflow-hidden fade-in"
              style={{ animationDelay: "0.4s" }}>
              <div className="relative h-64">
                <Image
                  src="/images/property-2.jpg"
                  alt="Urban Loft"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-white text-xs uppercase tracking-wider">
                  Trending
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-2">
                  Urban Loft
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  New York, New York
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">$2,100,000</span>
                  <span className="text-sm text-primary font-medium">
                    2 groups active
                  </span>
                </div>
                <div className="pt-4 border-t border-border">
                  <Link
                    href="/properties/urban-loft"
                    className="flex items-center justify-between text-sm font-medium">
                    <span>View Opportunity</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            {/* Property 3 */}
            <div
              className="property-card bg-background overflow-hidden fade-in"
              style={{ animationDelay: "0.5s" }}>
              <div className="relative h-64">
                <Image
                  src="/images/property-3.jpg"
                  alt="Mountain Retreat"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-white text-xs uppercase tracking-wider">
                  Almost funded
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-2">
                  Mountain Retreat
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Aspen, Colorado
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">$3,250,000</span>
                  <span className="text-sm text-primary font-medium">
                    4 groups active
                  </span>
                </div>
                <div className="pt-4 border-t border-border">
                  <Link
                    href="/properties/mountain-retreat"
                    className="flex items-center justify-between text-sm font-medium">
                    <span>View Opportunity</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className="text-center mt-12 fade-in"
            style={{ animationDelay: "0.6s" }}>
            <Link href="/properties" className="btn-primary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title centered fade-in">
              How Group Buying Works
            </h2>
            <p
              className="text-muted-foreground max-w-2xl mx-auto fade-in"
              style={{ animationDelay: "0.2s" }}>
              Our innovative platform makes luxury real estate accessible
              through the power of collective buying
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div
              className="text-center fade-in"
              style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <FiHome className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                Browse Properties
              </h3>
              <p className="text-muted-foreground">
                Explore our curated selection of luxury properties available for
                group purchase
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="text-center fade-in"
              style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <FiUsers className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                Join or Form Group
              </h3>
              <p className="text-muted-foreground">
                Connect with like-minded buyers or create your own group based
                on investment goals
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="text-center fade-in"
              style={{ animationDelay: "0.5s" }}>
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <FiDollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                Pool Resources
              </h3>
              <p className="text-muted-foreground">
                Combine purchasing power with other group members to access
                premium properties
              </p>
            </div>

            {/* Step 4 */}
            <div
              className="text-center fade-in"
              style={{ animationDelay: "0.6s" }}>
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                Complete Purchase
              </h3>
              <p className="text-muted-foreground">
                Our platform facilitates the entire process from group formation
                to property acquisition
              </p>
            </div>
          </div>

          <div
            className="text-center mt-12 fade-in"
            style={{ animationDelay: "0.7s" }}>
            <Link href="/how-it-works" className="btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title centered fade-in">
              What Our Members Say
            </h2>
            <p
              className="text-muted-foreground max-w-2xl mx-auto fade-in"
              style={{ animationDelay: "0.2s" }}>
              Hear from our community of luxury property buyers who have
              successfully purchased their dream homes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div
              className="bg-background p-8 fade-in"
              style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/testimonial-1.jpg"
                    alt="Sarah Johnson"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">
                    Miami Beach Property
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                &quot;GroupBuy Homes made it possible for me to own a luxury
                beachfront property that would have been out of reach otherwise.
                The process was seamless and the support was exceptional.&quot;
              </p>
              <div className="flex items-center text-primary">
                <span className="text-lg">★★★★★</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              className="bg-background p-8 fade-in"
              style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/testimonial-2.jpg"
                    alt="David Chen"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">David Chen</h4>
                  <p className="text-sm text-muted-foreground">
                    New York City Loft
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                &quot;I was skeptical at first, but joining a group of investors
                on this platform helped me secure a Manhattan property at 30%
                below market value. The legal framework they provide gives peace
                of mind.&quot;
              </p>
              <div className="flex items-center text-primary">
                <span className="text-lg">★★★★★</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              className="bg-background p-8 fade-in"
              style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/testimonial-3.jpg"
                    alt="Maria Rodriguez"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Maria Rodriguez</h4>
                  <p className="text-sm text-muted-foreground">
                    Aspen Vacation Home
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                &quot;The GroupBuy platform connected me with people who shared
                my vision for co-owning a mountain retreat. The property
                management features make sharing ownership hassle-free.&quot;
              </p>
              <div className="flex items-center text-primary">
                <span className="text-lg">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 fade-in">
              Ready to Own Your Dream Property?
            </h2>
            <p
              className="text-lg text-muted-foreground mb-8 fade-in"
              style={{ animationDelay: "0.2s" }}>
              Join our community of luxury property investors today and unlock
              access to exclusive group buying opportunities.
            </p>
            <div
              className="flex flex-wrap justify-center gap-4 fade-in"
              style={{ animationDelay: "0.3s" }}>
              <Link href="/auth/register" className="btn-primary">
                Register Now
              </Link>
              <Link href="/properties" className="btn-secondary">
                Explore Properties
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-secondary rounded-full opacity-50"></div>
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-primary opacity-10 rounded-full"></div>
      </section>
    </>
  );
}
