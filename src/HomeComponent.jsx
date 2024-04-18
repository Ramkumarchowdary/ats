// HomeComponent.jsx
import React, { useState, useEffect } from "react";

const HomeComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          fetchNearbyHospitals(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setError("Error fetching location. Please try again later.");
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  const fetchNearbyHospitals = (latitude, longitude) => {
    // Replace the API endpoint with the actual endpoint for fetching nearby hospitals
    fetch(`https://api.example.com/hospitals?latitude=${latitude}&longitude=${longitude}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch nearby hospitals.");
        }
        return response.json();
      })
      .then((data) => {
        setNearbyHospitals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching nearby hospitals:", error);
        setError("Error fetching nearby hospitals. Please try again later.");
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {userLocation && (
        <div>
          <h2>User Location:</h2>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
        </div>
      )}

      <h2>Nearby Hospitals:</h2>
      <ul>
        {nearbyHospitals.map((hospital, index) => (
          <li key={index}>{hospital.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomeComponent;
