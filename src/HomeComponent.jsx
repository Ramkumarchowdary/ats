// HomeComponent.jsx
import React, { useState, useEffect } from "react";
import LoadingComponent from "./LoadingComponent";

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
    // fetch(`https://api.example.com/hospitals?latitude=${latitude}&longitude=${longitude}`)
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=610530713814-c4tq1rn8mnf1i6d0ji4eu52tkf9etr5h.apps.googleusercontent.com`)
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
      {loading && <LoadingComponent/>}
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
