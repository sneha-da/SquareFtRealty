"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchFeaturedProperties() {
      try {
        const [templates, basicDetails, statusDetails] = await Promise.all([
          fetch("https://sq-feet.vercel.app/api/template-details", { cache: "no-store" }).then(r => r.json()),
          fetch("https://sq-feet.vercel.app/api/basic-details", { cache: "no-store" }).then(r => r.json()),
          fetch("https://sq-feet.vercel.app/api/status-availability", { cache: "no-store" }).then(r => r.json())
        ]);
        
        const featured = templates.filter(p => p.featured === "yes").slice(0, 6);
        
        const merged = featured.map(t => {
          const b = basicDetails.find(x => x.id === t.id);
          const s = statusDetails.find(x => x.id === t.id);
          return {
            ...t,
            propertyType: b?.propertyType?.toLowerCase().trim() || "featured",
            bedrooms: b?.bedrooms || 3,
            bathrooms: b?.bathrooms || 2,
            propertyStatus: s?.propertyStatus || "Available"
          };
        });
        
        setProperties(merged);
      } catch (error) {
        console.error("Failed to load featured properties:", error);
      }
    }
    fetchFeaturedProperties();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (propertyType) params.set("type", propertyType);
    if (bedrooms) params.set("bedrooms", bedrooms);
    router.push(`/properties?${params.toString()}`);
  };

  const amenities = [
    {
      number: "01",
      title: "Swimming Pool",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      image: "/assets/4b97e0716a326d8a2e0ba9b53fde3683800ce144.png",
      alignment: "left"
    },
    {
      number: "02",
      title: "Modern Gym",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      image: "/assets/1e052f613b814ffd8741f7b81128cbca6163ae89.png",
      alignment: "right"
    },
    {
      number: "03",
      title: "Sports Complex",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      image: "/assets/d1565ebe96e181ddd721a2de600ff60c98c1474a.png",
      alignment: "left"
    },
    {
      number: "04",
      title: "Garden Area",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      image: "/assets/7529a886031a6b49fcfeaac3ea23a8f4e401b788.png",
      alignment: "right"
    },
    {
      number: "05",
      title: "Parking",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      image: "/assets/c34efd74f745a0071e4903d2195b941632b09851.png",
      alignment: "left"
    }
  ];

  const testimonials = [
    {
      quote: "Delivered a complex commercial fit-out on a tight timeline without sacrificing quality. Project management was top-notch and the site was kept clean. Excellent partner for repeat projects.",
      author: "Riverstone Properties",
      project: "Office fit-out, Downtown"
    },
    {
      quote: "From estimate to final walkthrough the team was professional, on-time, and detail-oriented. They stayed within the original budget. Highly recommend.",
      author: "Jason Miller",
      project: "Kitchen remodel, Springfield"
    },
    {
      quote: "Great workmanship and clear communication. A minor scheduling hiccup, but the crew fixed everything quickly and the quality is excellent. Would hire again.",
      author: "Aisha Khan",
      project: "Bathroom renovation + plumbing upgrades"
    }
  ];

  return (
    <div className="bg-[var(--figma-light-gray)]">
      {/* Hero Section */}
      <section className="px-8 lg:px-16 pt-20 pb-12 max-w-[1440px] mx-auto">
        {/* Headline */}
        <h1 className="text-[79px] font-normal text-center mb-6 leading-[0.97] tracking-[-2.56px] text-[var(--figma-dark)]">
          Turning Your Real Estate<br />
          Dreams to Reality
        </h1>

        {/* Subtitle */}
        <p className="text-[20px] font-normal text-center mb-12 tracking-[-0.4px] text-[var(--figma-dark)] max-w-[999px] mx-auto">
          Discover a curated selection of premier properties, tailored to your lifestyle and investment goals
        </p>

        {/* Hero Image with Search Overlay */}
        <div className="relative w-full max-w-[1055px] mx-auto">
          {/* Hero Image */}
          <div className="relative w-full h-[510px] rounded-[20px] overflow-hidden">
            <Image 
              src="/assets/deea6c9fbbbe6f8c3721233eafe509a675ac5f61.png"
              alt="Hero Property"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Search Bar Overlay */}
          <div className="absolute -bottom-[50px] left-1/2 transform -translate-x-1/2 w-full max-w-[971px] px-4 md:px-6">
            <div className="bg-white rounded-[20px] px-4 md:px-8 pt-6 md:pt-8 pb-8 md:pb-10 flex flex-col justify-center">
              <h3 className="text-[18px] md:text-[24px] font-medium mb-4 md:mb-[20px] tracking-[-0.32px] text-[var(--figma-dark)]">
                Find the best place
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
                <input
                  type="text"
                  placeholder="Search location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">Property Type</option>
                  <option value="residentail-plot">Plot</option>
                  <option value="residential-flat">Flat</option>
                  <option value="residential-villas">Villa</option>
                </select>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">Bedrooms</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5+">5+ BHK</option>
                </select>
                <button
                  onClick={handleSearch}
                  className="w-full bg-[var(--figma-orange)] text-[var(--figma-dark)] px-6 py-2 rounded-lg font-semibold hover:opacity-90 text-sm"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section id="featured-properties" className="px-16 lg:px-32 pt-32 pb-16 max-w-[1440px] mx-auto">
        <h2 className="text-[64px] font-normal text-center mb-4 leading-[0.97] tracking-[-2.56px] text-[var(--figma-dark)]">
          Featured Properties
        </h2>
        <p className="text-[20px] font-normal text-center mb-16 tracking-[-0.4px] text-[var(--figma-dark)]">
          Expore our featured properties
        </p>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer" onClick={() => router.push(`/property-details/${property.id}`)}>
              <div className="h-56 w-full relative">
                <img
                  src={property.imageUrl || "/assets/953871fa65cd409014be2a3f00e7ab6a17c42606.png"}
                  className="w-full h-full object-cover"
                  alt={property.propertyTitle}
                />
                <div className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full text-gray-900 font-semibold shadow">
                  ₹{property.price?.toLocaleString()}
                </div>
              </div>

              <div className="p-5">
                <span className="inline-block bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full mb-2l mb-2">
                  {property.propertyType || "Featured"}
                </span>

                <h2 className="text-lg font-semibold text-gray-900">{property.propertyTitle}</h2>

                <p className="mt-1 text-gray-600 flex items-center gap-1 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {property.locationAddress}, {property.city}
                </p>

                <div className="flex justify-between mt-3 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                    {property.bedrooms || 3} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1 0l-1 1a1.5 1.5 0 0 0 0 1L7 9"/><path d="m15 6 2.5-2.5a1.5 1.5 0 0 1 1 0l1 1a1.5 1.5 0 0 1 0 1L17 9"/><path d="M9 18h.01"/><path d="M15 18h.01"/><path d="M20 15c.6-1.2.6-2.8 0-4l-2-3h-3"/><path d="M4 15c-.6-1.2-.6-2.8 0-4l2-3h3"/><path d="M9 18v3"/><path d="M15 18v3"/></svg>
                    {property.bathrooms || 2} Baths
                  </span>
                </div>

                <p className="mt-2 text-gray-500 text-sm flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  {property.propertyStatus || "Available"}
                </p>

                <button
                  onClick={(e) => { e.stopPropagation(); router.push(`/property-details/${property.id}`); }}
                  className="mt-4 bg-[var(--figma-orange)] hover:opacity-90 text-[var(--figma-dark)] w-full py-2 rounded-lg font-semibold transition-opacity"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Properties Button */}
        <div className="text-center">
          <button
            onClick={() => router.push('/properties')}
            className="bg-[var(--figma-orange)] text-white px-10 py-3 rounded-[20px] font-semibold text-[16px] hover:opacity-90 transition-opacity"
          >
            View All Properties
          </button>
        </div>
      </section>

      {/* Services & Stats Section */}
        <section className="px-16 lg:px-32 py-8 max-w-[1440px] mx-auto text-[var(--figma-dark)] mt-10">
        {/* Header: Title on left, Description on right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          {/* Left: Section Title */}
          <h2 className="text-[56px] font-normal leading-[0.97] tracking-[-2.24px] text-[var(--figma-dark)] flex-shrink-0">
            Your Trusted Real<br />
            Estate Services
          </h2>
          
          {/* Right: Description - Right aligned, max-width 510px */}
          <p className="text-[18px] font-normal tracking-[-0.4px] text-[var(--figma-dark)] max-w-[510px] text-right" style={{fontFamily: 'Poppins, sans-serif', lineHeight: '0.97'}}>
            Exceptional Constructional services, delivering<br />
            quality, innovation, and client satisfaction in<br />
            every step of the way
          </p>
        </div>

        {/* Two-Column Layout: Stats on left, Services on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Left Column: Statistics Grid - 2x2 layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2 w-fit" style={{ rowGap: '8px', columnGap: '8px' }}>
            {/* Top-Left Card: 500+ Properties Sold */}
            <div className="bg-white rounded-[20px] p-4 w-[250px] h-[170px] flex flex-col justify-end">
              <p className="text-[42px] font-normal leading-[0.97] tracking-[-1.6px] text-[var(--figma-dark)] mb-1">
                500+
              </p>
              <p className="text-[18px] font-normal tracking-[-0.64px] text-[var(--figma-dark)]">
                Properties Sold
              </p>
            </div>
            
            {/* Top-Right Card: 10+ Years - Dark background with white text */}
            <div className="bg-[var(--figma-dark)] text-white rounded-[20px] p-4 w-[250px] h-[170px] flex flex-col justify-end">
              <p className="text-[42px] font-normal leading-[0.97] tracking-[-1.6px] mb-1">
                10+
              </p>
              <p className="text-[18px] font-normal tracking-[-0.64px]">
                Years of Experience
              </p>
            </div>
            
            {/* Bottom-Left Card: 142+ Happy Customers */}
            <div className="bg-white rounded-[20px] p-4 w-[250px] h-[170px] flex flex-col justify-end">
              <p className="text-[42px] font-normal leading-[0.97] tracking-[-1.6px] text-[var(--figma-dark)] mb-1">
                142+
              </p>
              <p className="text-[18px] font-normal tracking-[-0.64px] text-[var(--figma-dark)]">
                Happy Customers
              </p>
            </div>
            
            {/* Bottom-Right Card: 500+ Properties Sold */}
            <div className="bg-white rounded-[20px] p-4 w-[250px] h-[170px] flex flex-col justify-end">
              <p className="text-[42px] font-normal leading-[0.97] tracking-[-1.6px] text-[var(--figma-dark)] mb-1">
                500+
              </p>
              <p className="text-[18px] font-normal tracking-[-0.64px] text-[var(--figma-dark)]">
                Properties Sold
              </p>
            </div>
          </div>

          {/* Right Column: Services List - Single column */}
          <div className="flex flex-col gap-2">
            {/* Service 1 */}
            <div className="border-2 border-[rgba(35,36,41,0.5)] rounded-[20px] p-6">
              <p className="text-[18px] font-normal tracking-[-0.8px] text-[var(--figma-dark)]">
                Decades of Industry Experience
              </p>
                </div>
            
            {/* Service 2 */}
            <div className="border-2 border-[rgba(35,36,41,0.5)] rounded-[20px] p-6">
              <p className="text-[18px] font-normal tracking-[-0.8px] text-[var(--figma-dark)]">
                Skilled Workforce & Modern Equipment
              </p>
              </div>
            
            {/* Service 3 - 50% opacity */}
            <div className="border-2 border-[rgba(35,36,41,0.5)] rounded-[20px] p-6">
              <p className="text-[18px] font-normal tracking-[-0.8px] text-[var(--figma-dark)]">
                On-Time Project Delivery
              </p>
            </div>
            
            {/* Service 4 */}
            <div className="border-2 border-[rgba(35,36,41,0.5)] rounded-[20px] p-6">
              <p className="text-[18px] font-normal tracking-[-0.8px] text-[var(--figma-dark)]">
                Transparent Pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="px-16 lg:px-32 pt-16 pb-[40px] max-w-[1440px] mx-auto mt-5">
        <h2 className="text-[56px] font-normal mb-16 leading-[0.97] tracking-[-2.24px] text-[var(--figma-dark)]">
          Enjoy Premium Amenities
        </h2>

        <div className="space-y-12">
          {amenities.map((amenity, index) => (
            <div key={index} className="bg-white rounded-[20px] overflow-hidden h-[271px]">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-center h-full ${amenity.alignment === 'right' ? 'lg:grid-flow-dense' : ''}`}>
              {amenity.alignment === 'left' ? (
                <>
                  <div className="relative h-full">
                    <Image 
                      src={amenity.image}
                      alt={amenity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-8 px-6 py-6">
                    <div className="text-[40px] font-normal leading-[0.97] tracking-[-1.6px] text-[var(--figma-dark)] text-center min-w-[145px]">
                      {amenity.number}
                    </div>
                    <div>
                      <h3 className="text-[40px] font-normal leading-[0.97] tracking-[-1.6px] text-[var(--figma-dark)] mb-3">
                        {amenity.title}
                      </h3>
                      <p className="text-[20px] font-normal tracking-[-0.4px] text-[rgba(35,36,41,0.6)]">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-8 lg:col-start-1 justify-end text-right px-6 py-6">
                    <div>
                      <h3 className="text-[40px] font-normal leading-[0.97] tracking-[-1.6px] text-[var(--figma-dark)] mb-3">
                        {amenity.title}
                </h3>
                      <p className="text-[20px] font-normal tracking-[-0.4px] text-[rgba(35,36,41,0.6)]">
                        {amenity.description}
                      </p>
                    </div>
                    <div className="text-[40px] font-normal leading-[0.97] tracking-[-1.6px] text-[var(--figma-dark)] text-center min-w-[145px]">
                      {amenity.number}
                    </div>
                  </div>
                  <div className="relative h-full lg:col-start-2">
                    <Image 
                      src={amenity.image}
                      alt={amenity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </>
              )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-16 lg:px-32 pt-[100px] pb-[146px] max-w-[1440px] mx-auto">
        <h2 className="text-[72px] font-normal text-center mb-16 leading-[0.97] tracking-[-2.88px] text-[var(--figma-dark)]">
          Our Success Stories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-[20px] p-6 relative flex flex-col h-full">
              <div className="absolute top-6 left-6">
                <svg width="40" height="40" viewBox="0 0 55 55" fill="none">
                  <path d="M19.25 16.5L22 11H16.5C10.4225 11 5.5 18.6725 5.5 24.75V44H24.75V24.75H13.75C13.75 16.5 19.25 16.5 19.25 16.5ZM38.5 24.75C38.5 16.5 44 16.5 44 16.5L46.75 11H41.25C35.1725 11 30.25 18.6725 30.25 24.75V44H49.5V24.75H38.5Z" fill="#FFA816"/>
                </svg>
                </div>
              <p className="text-[16px] font-normal leading-[1.3] tracking-[-0.4px] text-[var(--figma-dark)] mt-12 mb-8 flex-grow">
                {testimonial.quote}
              </p>
              <div className="border-t border-gray-200 pt-4 mt-auto">
                <p className="text-[16px] font-semibold tracking-[-0.4px] text-[var(--figma-dark)] mb-2">
                  {testimonial.author}
                </p>
                <p className="text-[14px] font-normal tracking-[-0.4px] text-[rgba(35,36,41,0.5)]">
                  {testimonial.project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-16 lg:px-32 py-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-[56px] font-normal mb-6 leading-[0.97] tracking-[-2.24px] text-[var(--figma-dark)]">
              Discover Your Perfect Property Match
            </h2>
            <p className="text-[20px] font-normal leading-[1.19] tracking-[-0.4px] text-[var(--figma-dark)] mb-8">
              Your perfect space is waiting — from modern apartments to luxury villas and commercial hubs. Let us help you find a property that feels just right.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-[282px] rounded-[20px] overflow-hidden">
              <Image 
                src="/assets/34e6b1b72e40f3fda32f2f58570dee1db17fe1dd.png"
                alt="Property 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative row-span-2 h-[563px] rounded-[20px] overflow-hidden">
              <Image 
                src="/assets/b963a93a72f85ee92ac9fd3b310eef65fe262f4a.png"
                alt="Property 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[268px] rounded-[20px] overflow-hidden">
              <Image 
                src="/assets/cd6dd4e08337e596d3243a6d5cdac5811e60fa10.png"
                alt="Property 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
