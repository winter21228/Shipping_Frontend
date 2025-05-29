import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { PATH_AUTH } from "../../../routes/paths";
import { Input } from "../../../components/ui/input";
import { STATES } from "../../../utils/constant";

export default function ShippingAddressForm({ data, onSubmit }) {
  const navigate = useNavigate();

  const [isSameAddress, setIsSameAddress] = useState(true);

  const AddressSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    company: Yup.string(),
    addressline1: Yup.string().required("Address is required"),
    addressline2: Yup.string(),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("ZipCode is required"),
    phoneNumber: Yup.string().required("PhoneNumber is required"),
    ...(!isSameAddress && {
      label_fullName: Yup.string().required("Name is required"),
      label_company: Yup.string(),
      label_addressline1: Yup.string().required("Address is required"),
      label_addressline2: Yup.string(),
      label_city: Yup.string().required("City is required"),
      label_state: Yup.string().required("State is required"),
      label_zipCode: Yup.string().required("ZipCode is required"),
      label_phoneNumber: Yup.string().required("PhoneNumber is required"),
    }),
  });

  const defaultValues = {
    fullName: data?.address?.fullName || "",
    company: "",
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    ...(!isSameAddress && {
      label_fullName: "",
      label_company: "",
      label_addressline1: "",
      label_addressline2: "",
      label_city: "",
      label_state: "",
      label_zipCode: "",
      label_phoneNumber: "",
    }),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddressSchema),
    defaultValues,
  });

  const handleStartShipping = (values) => {
    const addressData = {
      fullName: values.fullName,
      company: values.company,
      addressline1: values.addressline1,
      addressline2: values.addressline2,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      phoneNumber: values.phoneNumber,
    };
    onSubmit({
      isSamePhysicalAndReturn: isSameAddress,
      address: addressData,
      returnAddress: isSameAddress
        ? addressData
        : {
            fullName: values.label_fullName,
            company: values.label_company,
            addressline1: values.label_addressline1,
            addressline2: values.label_addressline2,
            city: values.label_city,
            state: values.label_state,
            zipCode: values.label_zipCode,
            phoneNumber: values.label_phoneNumber,
          },
    });
  };

  const handleBack = () => {
    navigate(PATH_AUTH.register);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white">
      {/* Left: Form */}
      <div className="flex flex-col justify-center px-8 py-2 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-12">
          Let's get shipping{" "}
          <span role="img" aria-label="smile">
            😃
          </span>
        </h1>
        <p className="mb-6 text-gray-600">
          Enter your address to calculate shipping costs and start scheduling
          UPS and USPS pickups instantly 👍
        </p>
        <form
          onSubmit={handleSubmit(handleStartShipping)}
          className="space-y-4"
        >
          <div>
            <label className="block font-semibold">
              Provide your physical address
            </label>
            <Input
              id="fullName"
              placeholder="Full Personal Name"
              {...register("fullName")}
              className={"h-12 text-base"}
              error={errors.fullName}
              autoComplete="fullName"
            />
          </div>
          <Input
            id="company"
            placeholder="Company (optional)"
            {...register("company")}
            className={"h-12 text-base"}
            error={errors.company}
            autoComplete="company"
          />
          <Input
            id="address"
            placeholder="Address"
            {...register("addressline1")}
            className={"h-12 text-base"}
            error={errors.addressline1}
            autoComplete="addressline1"
          />
          <Input
            id="addressline2"
            placeholder="Apt / Unit / Suite / etc. (optional)"
            {...register("addressline2")}
            className={"h-12 text-base"}
            error={errors.addressline2}
            autoComplete="addressline2"
          />
          <div className="grid grid-cols-3 gap-2">
            <Input
              id="city"
              placeholder="City"
              {...register("city")}
              className={"h-12 text-base"}
              error={errors.city}
              autoComplete="city"
            />
            <select
              id="state"
              name="state"
              {...register("state")}
              className="w-full border rounded-md px-3 py-2 h-12"
            >
              <option value="">State</option>
              {STATES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <Input
              id="zipCode"
              placeholder="ZipCode"
              {...register("zipCode")}
              className={"h-12 text-base"}
              error={errors.zipCode}
              autoComplete="zipCode"
            />
          </div>
          <Input
            id="phoneNumber"
            placeholder="Phone"
            {...register("phoneNumber")}
            className={"h-12 text-base"}
            error={errors.phoneNumber}
            autoComplete="phoneNumber"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="returnAddress"
              checked={isSameAddress}
              onChange={(e) => setIsSameAddress(e.target.checked)}
              className="mr-2"
            />
            <span>
              Use this address as the Return Address on my shipping labels
            </span>
          </div>
          {!isSameAddress && (
            <div className="space-y-4 mt-8">
              <div>
                <label className="block font-semibold">
                  What address would you like printed on the label?
                </label>
                <Input
                  id="label_fullName"
                  placeholder="Full Personal Name"
                  {...register("label_fullName")}
                  className={"h-12 text-base"}
                  error={errors.label_fullName}
                  autoComplete="label_fullName"
                />
              </div>
              <Input
                id="label_company"
                placeholder="Company (optional)"
                {...register("label_company")}
                className={"h-12 text-base"}
                error={errors.label_company}
                autoComplete="label_company"
              />
              <Input
                id="label_address"
                placeholder="Address"
                {...register("label_addressline1")}
                className={"h-12 text-base"}
                error={errors.label_addressline1}
                autoComplete="label_addressline1"
              />
              <Input
                id="label_addressline2"
                placeholder="Apt / Unit / Suite / etc. (optional)"
                {...register("label_addressline2")}
                className={"h-12 text-base"}
                error={errors.label_addressline2}
                autoComplete="label_addressline2"
              />
              <div className="grid grid-cols-3 gap-2">
                <Input
                  id="label_city"
                  placeholder="City"
                  {...register("label_city")}
                  className={"h-12 text-base"}
                  error={errors.label_city}
                  autoComplete="label_city"
                />
                <select
                  id="label_state"
                  name="label_state"
                  {...register("label_state")}
                  className="w-full border rounded-md px-3 py-2 h-12"
                >
                  <option value="">State</option>
                  {STATES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <Input
                  id="label_zipCode"
                  placeholder="ZipCode"
                  {...register("label_zipCode")}
                  className={"h-12 text-base"}
                  error={errors.label_zipCode}
                  autoComplete="label_zipCode"
                />
              </div>
              <Input
                id="label_phoneNumber"
                placeholder="Phone"
                {...register("label_phoneNumber")}
                className={"h-12 text-base"}
                error={errors.label_phoneNumber}
                autoComplete="label_phoneNumber"
              />
            </div>
          )}
          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              className="text-black font-bold flex items-center"
              onClick={handleBack}
            >
              <span className="mr-2">&lt; Back</span>
            </button>
            <button
              type="submit"
              className="bg-sky-500 text-white font-semibold px-16 py-3 rounded text-lg"
            >
              Start Shipping
            </button>
          </div>
          <div className="text-center text-sm mt-2">
            Already have an account?{" "}
            <a href={PATH_AUTH.login} className="text-blue-600 hover:underline">
              Login
            </a>
          </div>
        </form>
      </div>
      {/* Right: Marketing */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Free shipping software to access the cheapest USPS<sup>®</sup>,
            FedEx <sup>®</sup>, and UPS<sup>®</sup>shipping rates available
          </h2>
          <img
            src="/favicon/logo.png"
            alt="Shipping software screenshot"
            className="mx-auto mb-4 rounded shadow"
            style={{ maxWidth: 350 }}
          />
          <p className="text-gray-600">
            No monthly fees or hidden costs — we're paid by the carriers, not by
            you!
          </p>
        </div>
      </div>
    </div>
  );
}
