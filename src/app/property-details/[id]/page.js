"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function PropertyDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const base = "https://sq-feet.vercel.app/api";

        const [template, desc, basic, location, status, area] = await Promise.all([
          fetch(`${base}/template-details?id=${id}`).then((r) => r.json()),
          fetch(`${base}/description?id=${id}`).then((r) => r.json()),
          fetch(`${base}/basic-details?id=${id}`).then((r) => r.json()),
          fetch(`${base}/location?id=${id}`).then((r) => r.json()),
          fetch(`${base}/status-availability?id=${id}`).then((r) => r.json()),
          fetch(`${base}/area-details?id=${id}`).then((r) => r.json()),
        ]);

        setProperty({ template, desc, basic, location, status, area });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAll();
  }, [id]);

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (!property) return <div className="p-10 text-center">Property Not Found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="relative h-96 w-full">
            <img
              src={property.template.imageUrl}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 bg-white shadow px-6 py-2 rounded-full font-bold">
              ₹{property.template.price}
            </div>
          </div>

          <div className="p-8">

            <h1 className="text-3xl font-bold mb-4 text-center">
              {property.template.propertyTitle}
            </h1>

           <div className="bg-white rounded-xl shadow p-8 mt-12">
  <h2 className="text-2xl font-bold mb-8">Description</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Real Security */}
    <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl">
      <span className="text-2xl text-green-600">🛡</span>
      <div>
        <h3 className="font-semibold text-gray-800">Real Security</h3>
        <p className="text-gray-600 text-sm">
          {property.desc.realSecurity || "N/A"}
        </p>
      </div>
    </div>
    
    {/* Ample Parking */}
    <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl">
      <span className="text-2xl text-green-600">🅿</span>
      <div>
        <h3 className="font-semibold text-gray-800">Ample Parking</h3>
        <p className="text-gray-600 text-sm">
          {property.desc.ampleParking || "N/A"}
        </p>
      </div>
    </div>

    {/* Smart Home Integration */}
    <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl">
      <span className="text-2xl text-green-600">⭐</span>
      <div>
        <h3 className="font-semibold text-gray-800">Smart Home Integration</h3>
        <p className="text-gray-600 text-sm">
          {property.desc.smartHomeIntegration || "N/A"}
        </p>
      </div>
    </div>

    {/* Verified Safety */}
    <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl">
      <span className="text-2xl text-green-600">✔</span>
      <div>
        <h3 className="font-semibold text-gray-800">Verified Safety</h3>
        <p className="text-gray-600 text-sm">
          {property.desc.verifiedSafety || "N/A"}
        </p>
      </div>
    </div>

  </div>
</div>


  {/* Basic Details + Location Side by Side */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">

  {/* Basic Details Card */}
  <div className="bg-white rounded-2xl shadow p-8">
    <h2 className="text-2xl font-bold mb-6">Basic Details</h2>
    <ul className="space-y-3">
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-orange-500 text-xl">🏠</span>
        Property Type: {property.basic.propertyType}
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-orange-500 text-xl">📏</span>
        Property Size: {property.basic.propertySize} sq.ft
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-orange-500 text-xl">🛏️</span>
        Bedrooms: {property.basic.bedrooms || "N/A"}
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-orange-500 text-xl">🛁</span>
        Bathrooms: {property.basic.bathrooms || "N/A"}
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-orange-500 text-xl">🌅</span>
        Balconies: {property.basic.balconies || "N/A"}
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-orange-500 text-xl">🏢</span>
        Total Floors: {property.basic.totalFloors || "N/A"}
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-orange-500 text-xl">🗂️</span>
        Floor Number: {property.basic.floorNumber || "N/A"}
      </li>
    </ul>
  </div>

  {/* Location Card */}
  <div className="bg-white rounded-2xl shadow p-8">
    <h2 className="text-2xl font-bold mb-6">Location</h2>
    <ul className="space-y-3">
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-red-500 text-xl">📍</span>
        Address: {property.location.address}
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-red-500 text-xl">🏙️</span>
        City: {property.location.city}
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-red-500 text-xl">📮</span>
        Pincode: {property.location.pincode}
      </li>
    </ul>
  </div>

</div>


            {/* Status & Availability + Area Details Side by Side */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">

  {/* Status & Availability Card */}
  <div className="bg-white rounded-2xl shadow p-8">
    <h2 className="text-2xl font-bold mb-6">Status & Availability</h2>
    <ul className="space-y-3">
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-purple-600 text-xl">🏷️</span>
        Property Status: {property.status.propertyStatus}
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-purple-600 text-xl">⏳</span>
        Age of Property: {property.status.ageOfProperty || "N/A"}
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-purple-600 text-xl">📅</span>
        Available From: {property.status.availableFrom?.split("T")[0] || "N/A"}
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-purple-600 text-xl">🛋️</span>
        Furnishing Status: {property.status.furnishingStatus || "N/A"}
      </li>
    </ul>
  </div>

  {/* Area Details Card */}
  <div className="bg-white rounded-2xl shadow p-8">
    <h2 className="text-2xl font-bold mb-6">Area Details</h2>
    <ul className="space-y-3">
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-indigo-600 text-xl">📐</span>
        Built-up Area: {property.area.builtUpArea || "N/A"}
      </li>
      <li className="flex items-center gap-3 text-gray-700">
        <span className="text-indigo-600 text-xl">🏛️</span>
        Undivided Share: {property.area.undividedShare || "N/A"}
      </li>
    </ul>
  </div>

</div>



{/* Amenities + Features Side by Side */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">

  {/* Amenities Card */}
  <div className="bg-white rounded-2xl shadow p-8">
    <h2 className="text-2xl font-bold mb-6">Amenities</h2>
    <ul className="space-y-3">
      {(property.area.amenities || "")
        .split(",")
        .map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-gray-700">
            <span className="text-green-600 text-lg font-bold">✔</span>
            {item.trim()}
          </li>
        ))}
    </ul>
  </div>

  {/* Features Card */}
  <div className="bg-white rounded-2xl shadow p-8">
    <h2 className="text-2xl font-bold mb-6">Features</h2>
    <ul className="space-y-3">
      {(property.area.features || "")
        .split(",")
        .map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-gray-700">
            <span className="text-blue-600 text-lg font-bold">✔</span>
            {item.trim()}
          </li>
        ))}
    </ul>
  </div>

</div>





            

          </div>
        </div>
      </div>
    </div>
  );
}