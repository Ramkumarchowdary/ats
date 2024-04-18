// GoogleLoginComponent.jsx
import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

const GoogleLoginComponent = ({ onGoogleLogin }) => {
  const handleGoogleLoginSuccess = () => {
    onGoogleLogin();
  };

  return (
    <LoginSocialGoogle
      client_id={
        "610530713814-c4tq1rn8mnf1i6d0ji4eu52tkf9etr5h.apps.googleusercontent.com"
      }
      scope="openid profile email"
      discoveryDocs="claims_supported"
      access_type="offline"
      onResolve={({ provider, data }) => {
        console.log("Google login resolved:", provider, data);
        handleGoogleLoginSuccess();
      }}
      onReject={(err) => {
        console.log("Google login rejected:", err);
      }}
    >
      <GoogleLoginButton />
    </LoginSocialGoogle>
  );
};

export default GoogleLoginComponent;
