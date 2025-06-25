import { useEffect, useRef } from 'react';

const Map = ({ listings }) => {
  const mapRef = useRef(null);

  console.log("listings...", listings);

  useEffect(() => {
    if (!window.google || mapRef.current?.hasMap) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 }, // Center of India
      zoom: 4,
    });

    listings?.forEach((listing) => {
      const coords = listing.location?.coordinates;

      // Validate that coordinates exist and are in [lng, lat] format
      if (!Array.isArray(coords) || coords.length < 2) {
        console.warn("Invalid coordinates for listing:", listing);
        return;
      }

      const [lng, lat] = coords;

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: listing.title,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin-bottom: 8px;">${listing.title}</h3>
            <img src="${listing.images?.[0] || ''}" style="width: 100%; height: 100px; object-fit: cover;" />
            <br/><br/>
            <a href="/listings/${listing._id}" style="color: blue; text-decoration: underline;">View Listing</a>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });

    mapRef.current.hasMap = true;
  }, [listings]);

  return <div ref={mapRef} className="w-full h-[600px] rounded-lg" />;
};

export default Map;
