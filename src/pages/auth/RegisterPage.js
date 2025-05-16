import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import LoginLayout from "../../layouts/LoginLayout";

import RegisterForm from "./register/RegisterForm";
import ShippingAddressForm from "./register/ShippingAddressForm";

import { register } from "../../redux/slices/auth";
import { useLocation } from "react-router";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [registerData, setRegisterData] = useState({});
  const hash = window.location.hash;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setRegisterData({
      email: searchParams.get("email"),
      address: {
        fullName: searchParams.get("name"),
      },
    });
  }, [location.search]);

  useEffect(() => {
    if (hash === "#step=2") {
      setStep(2);
    } else if (hash === "") {
      setStep(1);
    }
  }, [hash]);

  const handleSubmit = (values) => {
    // Handle form submission logic here
    const userData = {
      ...registerData,
      ...values,
    };
    dispatch(register(userData));
  };

  return (
    <LoginLayout>
      {step === 1 ? (
        <RegisterForm data={registerData} onSaveData={setRegisterData} />
      ) : (
        <ShippingAddressForm
          data={registerData}
          onSaveData={setRegisterData}
          onSubmit={handleSubmit}
        />
      )}
    </LoginLayout>
  );
}
