import React from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ReusableMap = ({ center, zoom, areas }) => {
  return (
    <MapContainer
      center={center} 
      zoom={zoom}     
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Render multiple polygons */}
      {areas.map((area, index) => (
        <Polygon key={index} positions={area.coordinates} color="blue">
          <Popup>{area.name}</Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
};

export default ReusableMap;
