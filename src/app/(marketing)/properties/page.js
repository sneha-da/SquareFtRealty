"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, BedDouble, Bath, CalendarDays } from "lucide-react";

function PropertiesContent() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const beds = searchParams.get("bedrooms") || "";
    setSearchTerm(search);
    setSelectedPropertyType(type);
    setSelectedBedrooms(beds);
  }, [searchParams]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const [templates, basicDetails, statusDetails] = await Promise.all([
          fetch("https://sq-feet.vercel.app/api/template-details", { cache: "no-store" }).then(r => r.json()),
          fetch("https://sq-feet.vercel.app/api/basic-details", { cache: "no-store" }).then(r => r.json()),
          fetch("https://sq-feet.vercel.app/api/status-availability", { cache: "no-store" }).then(r => r.json()),
        ]);

        const merged = templates.map(t => {
          const b = basicDetails.find(x => x.id === t.id);
          const s = statusDetails.find(x => x.id === t.id);
          return {
            ...t,
            propertyType: b?.propertyType?.toLowerCase().trim() || "",
            bedrooms: b?.bedrooms || 0,
            bathrooms: b?.bathrooms || 0,
            propertyStatus: s?.propertyStatus || "Available",
            price: t?.price || 0,
            city: t?.city || "",
          };
        });

        setProperties(merged);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    let f = properties.filter(p => {
      const searchMatch =
        searchTerm === "" ||
        p.propertyTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.locationAddress?.toLowerCase().includes(searchTerm.toLowerCase());

      const typeMatch = selectedPropertyType === "" || p.propertyType?.toLowerCase() === selectedPropertyType.toLowerCase();

      const bedMatch =
        selectedBedrooms === "" || (selectedBedrooms === "5+" ? p.bedrooms >= 5 : p.bedrooms == selectedBedrooms);

      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];

      return searchMatch && typeMatch && bedMatch && priceMatch;
    });

    return f;
  }, [properties, searchTerm, selectedPropertyType, selectedBedrooms, priceRange]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-lg">
        Loading properties...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="bg-orange-50 px-6 pt-20 pb-20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900">
              Find Your <span className="text-yellow-500">Dream Property</span>
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Explore our curated premium properties and discover the perfect space to call home.
            </p>
          </div>

          <img
            src="/assets/34e6b1b72e40f3fda32f2f58570dee1db17fe1dd.png"
            alt="Dream Property"
            className="rounded-xl shadow-lg w-full object-cover h-[350px]"
          />
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-6 -mb-10 mt-10 z-30 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Location / Title</label>
              <input
                type="text"
                placeholder="Chennai, Plot, Villa..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Property Type</label>
              <select
                value={selectedPropertyType}
                onChange={e => setSelectedPropertyType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Any Type</option>
                <option value="residentail-plot">Residential Plot</option>
                <option value="residential-flat">Residential Flat</option>
                <option value="residential-villas">Residential Villas</option>
                <option value="residential-commercial">Residential Commercial</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Bedrooms</label>
              <select
                value={selectedBedrooms}
                onChange={e => setSelectedBedrooms(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Any</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5+">5+ BHK</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Price Max</label>
              <input
                type="range"
                min="0"
                max="50000000"
                value={priceRange[1]}
                onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <span className="text-xs text-gray-500">
                up to ₹ {(priceRange[1] / 10000000).toFixed(1)} Cr
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PROPERTIES */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          {filteredProperties.length} Properties Found
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-56 w-full relative">
                <img
                  src={property.imageUrl || "/no-image.png"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full text-gray-900 font-semibold shadow">
                  ₹ {property.price?.toLocaleString()}
                </div>
              </div>

              <div className="p-5">
                <span className="inline-block bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full mb-2">
                  {property.propertyType}
                </span>

                <h2 className="text-lg font-semibold text-gray-900">{property.propertyTitle}</h2>

                <p className="mt-1 text-gray-600 flex items-center gap-1 text-sm">
                  <MapPin size={16} /> {property.locationAddress}
                </p>

                <div className="flex justify-between mt-3 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <BedDouble size={16} /> {property.bedrooms} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={16} /> {property.bathrooms} Baths
                  </span>
                </div>

                <p className="mt-2 text-gray-500 text-sm flex items-center gap-1">
                  <CalendarDays size={16} /> {property.propertyStatus}
                </p>

                <button
                  onClick={() => router.push(`/property-details/${property.id}`)}
                  className="mt-4 bg-[var(--figma-orange)] hover:opacity-90 text-[var(--figma-dark)] w-full py-2 rounded-lg font-semibold transition-opacity"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-lg">Loading...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
