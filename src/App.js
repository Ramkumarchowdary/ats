// import React, { useState, useEffect } from "react";
// import { GoogleLoginButton } from "react-social-login-buttons";
// import { LoginSocialGoogle } from "reactjs-social-login";

// function App() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearbyHospitals, setNearbyHospitals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleGoogleLoginSuccess = () => {
//     setLoading(true);
//   };

//   useEffect(() => {
//     if (loading) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             setUserLocation({ latitude, longitude });
//             fetchNearbyHospitals(latitude, longitude);
//           },
//           (error) => {
//             console.error("Error fetching location:", error);
//             setError("Error fetching location. Please try again later.");
//             setLoading(false);
//           }
//         );
//       } else {
//         console.error("Geolocation is not supported by this browser.");
//         setError("Geolocation is not supported by this browser.");
//         setLoading(false);
//       }
//     }
//   }, [loading]);

//   const fetchNearbyHospitals = (latitude, longitude) => {
//     fetch(
//       `https://api.example.com/hospitals?latitude=${latitude}&longitude=${longitude}`
//     )
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch nearby hospitals.");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setNearbyHospitals(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching nearby hospitals:", error);
//         setError("Error fetching nearby hospitals. Please try again later.");
//         setLoading(false);
//       });
//   };

//   return (
//     <div>
//       <LoginSocialGoogle
//         client_id={
//           "610530713814-c4tq1rn8mnf1i6d0ji4eu52tkf9etr5h.apps.googleusercontent.com"
//         }
//         scope="openid profile email"
//         discoveryDocs="claims_supported"
//         access_type="offline"
//         onResolve={({ provider, data }) => {
//           console.log("Google login resolved:", provider, data);
//           handleGoogleLoginSuccess();
//         }}
//         onReject={(err) => {
//           console.log("Google login rejected:", err);
//         }}
//       >
//         <GoogleLoginButton />
//       </LoginSocialGoogle>

//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       {userLocation && (
//         <div>
//           <h2>User Location:</h2>
//           <p>Latitude: {userLocation.latitude}</p>
//           <p>Longitude: {userLocation.longitude}</p>
//         </div>
//       )}

//       <h2>Nearby Hospitals:</h2>
//       <ul>
//         {nearbyHospitals.map((hospital, index) => (
//           <li key={index}>{hospital.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleLoginComponent from "./GoogleLoginComponent";
import HomeComponent from "./HomeComponent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <GoogleLoginComponent onGoogleLogin={handleGoogleLogin} /> : <HomeComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
