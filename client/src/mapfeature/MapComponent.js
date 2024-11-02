import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = ({ property }) => {
  const [mapLoc, setMapLoc] = useState(null);

  async function getCoordinates(address) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    } else {
      throw new Error('Address not found');
    }
  }

  useEffect(() => {
    getCoordinates(property.address)
      .then(coords => {
        setMapLoc({ lat: coords.lat, lng: coords.lng });
      })
      .catch(error => {
        console.error("Error fetching coordinates:", error);
      });
  }, [property.address]);

  return (
    mapLoc ? (
      <MapContainer center={[mapLoc.lat, mapLoc.lng]} zoom={15} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={[mapLoc.lat, mapLoc.lng]}>
          <Popup>
            <strong>{property.name}</strong><br />
            {property.imageUrls && property.imageUrls[0] && (
              <img
                src={property.imageUrls[0]}
                alt={property.name}
                style={{ width: "100%"}}
              />
            )}
          </Popup>
        </Marker>
      </MapContainer>
    ) : (
      <p>Loading map...</p> 
    )
  );
};

export default MapComponent;
