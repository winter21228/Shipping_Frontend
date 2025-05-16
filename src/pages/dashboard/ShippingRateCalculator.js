import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Input } from "../../components/ui/input";
import ShippingRateCard from "../../components/cards/RateCard";

import { getMe } from "../../redux/slices/auth";

import { countries } from "../../utils/countries";
import { convertOzToLbs } from "../../utils/methods/formatMethods";
import {
  MAX_GIRTH_LENGTH,
  MAX_WEIGHT,
  MIN_HEIGHT,
  MIN_LENGTH,
  MIN_WIDTH,
  PackageTypes,
  STATES,
} from "../../utils/constant";
import axios from "../../utils/axios";

export default function ShippingRateCalculator() {
  const dispatch = useDispatch();
  const { user, isLoading: loading } = useSelector((state) => state.auth);

  const [openShippingAddress, setOpenShippingAddress] = useState(false);
  const [openPackageType, setOpenPackageType] = useState(false);
  const [selected, setSelected] = useState("Create");
  const [selectedPacketType, setSelectedPacketType] = useState(PackageTypes[0]);
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [isSaveAddress, setIsSaveAddress] = useState(false);
  const [shipToCountry, setShipToCountry] = useState(
    countries.find((c) => c.code === "US")
  );
  const [rateList, setRateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user?.shippingAddress?.length > 0) {
      setSelected(user.shippingAddress[0]);
    } else {
      setSelected("Create");
    }
  }, [user]);

  const RateSchema = Yup.object().shape({
    shipZipCode: Yup.string().required("Ship ZipCode is required"),
    length: selectedPacketType.predefined_package
      ? Yup.string()
      : Yup.string().required("Length is required"),
    width: selectedPacketType.predefined_package
      ? Yup.string()
      : Yup.string().required("Width is required"),
    height: Yup.string(),
    pounds: Yup.string().required("Pounds is required"),
    ounces: Yup.string().required("Ounces is required"),
    ...(selected === "Create" && {
      fullName: Yup.string(),
      company: Yup.string(),
      addressline1: Yup.string().required("Address is required"),
      addressline2: Yup.string(),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string().required("ZipCode is required"),
      phoneNumber: Yup.string().required("PhoneNumber is required"),
      ...(!isSameAddress && {
        return_fullName: Yup.string(),
        return_company: Yup.string(),
        return_addressline1: Yup.string().required("Address is required"),
        return_addressline2: Yup.string(),
        return_city: Yup.string().required("City is required"),
        return_state: Yup.string().required("State is required"),
        return_zipCode: Yup.string().required("ZipCode is required"),
        return_phoneNumber: Yup.string().required("PhoneNumber is required"),
      }),
      ...(isSaveAddress && {
        nickName: Yup.string().required("NickName is required"),
      }),
    }),
  });

  const defaultValues = {
    shipZipCode: "",
    length: "",
    width: "",
    height: "",
    pounds: "",
    ounces: "",
    ...(selected === "Create" && {
      fullName: "",
      company: "",
      addressline1: "",
      addressline2: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
      ...(!isSameAddress && {
        return_fullName: "",
        return_company: "",
        return_addressline1: "",
        return_addressline2: "",
        return_city: "",
        return_state: "",
        return_zipCode: "",
        return_phoneNumber: "",
      }),
    }),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(RateSchema),
    defaultValues,
  });

  const formData = watch();

  const validateSize = useMemo(() => {
    const length = parseFloat(formData.length);
    const width = parseFloat(formData.width);
    const height = parseFloat(formData.height);
    const girth = length + 2 * (height + width);

    if (selectedPacketType.isHeight === "NOT") {
      if (length < MIN_LENGTH || width < MIN_WIDTH) {
        return {
          isValid: false,
          message: `Your envelope is too small! The minimum dimensions are ${MIN_LENGTH}x${MIN_WIDTH}″`,
        };
      }

      if (length > 18 || width > 18)
        return {
          isValid: false,
          message: `For envelopes larger than 18″ in either direction, you must use the box package type and enter all 3 dimensions of your final package`,
        };
    }

    if (length < MIN_LENGTH || width < MIN_WIDTH || height < MIN_HEIGHT) {
      return {
        isValid: false,
        message: `Your package is too small! The minimum dimensions are ${MIN_LENGTH}x${MIN_WIDTH}x${MIN_HEIGHT}″`,
      };
    }

    if (girth > MAX_GIRTH_LENGTH)
      return {
        isValid: false,
        message: `Your package is too big! The maximum Length plus Girth (Width x 2 + Height x 2) is ${MAX_GIRTH_LENGTH}″, but your package is ${girth}″`,
      };

    return null;
  }, [formData.length, formData.width, formData.height]);

  const validateWeight = useMemo(() => {
    const pounds = parseFloat(formData.pounds);
    const ounces = parseFloat(formData.ounces);

    if (pounds + convertOzToLbs(ounces).lbs > MAX_WEIGHT)
      return {
        isValid: false,
        message: `Maximum weight is ${MAX_WEIGHT} lb, you entered ${
          pounds + convertOzToLbs(ounces).lbs
        } lb${
          convertOzToLbs(ounces).ounces
            ? ` ${convertOzToLbs(ounces).ounces} oz`
            : ""
        }`,
      };

    return null;
  }, [formData.pounds, formData.ounces]);

  const shipFromRef = useRef(null);
  const packageTypeRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (shipFromRef.current && !shipFromRef.current.contains(event.target)) {
        setOpenShippingAddress(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ShippinhgAddressItem = (item) => {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-xl">
          {item.nickName ? item.nickName : item.fullName}
        </span>
        <div className="flex flex-col text-sm leading-4 text-gray-500">
          <span>
            <strong>Physical Address: </strong>
            {item.fullName}, {item.addressline1}, {item.city} {item.state}{" "}
            {item.zipCode}
          </span>
          <span>
            <strong>Return Address: </strong>
            {item.return_fullName}, {item.return_addressline1},{" "}
            {item.return_city} {item.return_state} {item.return_zipCode}
          </span>
        </div>
      </div>
    );
  };

  const PackageTypeItem = (item) => {
    return (
      <div className="flex flex-row items-center gap-5 hover:bg-sky-50">
        <img src={item.image} alt={item.name} className="w-32 h-32" />
        <div className="flex flex-col text-sm leading-4 text-gray-500">
          <span className="text-black text-lg">{item.name}</span>
          <span>{item.description}</span>
        </div>
      </div>
    );
  };

  const onChangePacketType = (item) => {
    setSelectedPacketType(item);
    setOpenPackageType(false);
  };

  const handleGetRateQuote = async (data) => {
    setIsLoading(true);
    try {
      const fromAddress =
        selected === "Create"
          ? {
              fullName: data.fullName,
              addressline1: data.addressline1,
              addressline2: data.addressline2,
              city: data.city,
              state: data.state,
              zipCode: data.zipCode,
              phoneNumber: data.phoneNumber,
              email: user.email,
              country: "US",
            }
          : selected;
      const toAddress = {
        name: "",
        street1: "",
        city: "",
        state: "",
        zip: shipToCountry.isZipCode ? data.shipZipCode : "",
        phone: "",
        email: "",
        country: shipToCountry.code,
      };
      const returnAddress = {
        name: data.return_fullName,
        company: data.return_company,
        addressline1: data.return_addressline1,
        addressline2: data.return_addressline2,
        city: data.return_city,
        state: data.return_state,
        zip: data.return_zipCode,
        phone: data.return_phoneNumber,
      };
      const parcel = {
        ...(!selectedPacketType.predefined_package && {
          length: parseFloat(data.length),
          width: parseFloat(data.width),
          height:
            selectedPacketType.isHeight === "NOT" ? 1 : parseFloat(data.height),
        }),
        weight:
          parseFloat(data.pounds) + convertOzToLbs(parseFloat(data.ounces)).lbs,
        predefined_package: selectedPacketType.predefined_package,
      };
      const shipmentDetails = {
        nickName: data.nickName,
        toAddress: toAddress,
        fromAddress: fromAddress,
        parcel: parcel,
        returnAddress: returnAddress,
        isSameAddress,
        isSaveAddress,
      };
      const response = await axios.post(
        "/api/easypost/get-rate",
        shipmentDetails
      );

      const { rates } = response.data.msg;
      console.log("rate", rates);
      setRateList(rates);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching rate quote:", error);
      return;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Quick Rate Quote</h1>

      <form onSubmit={handleSubmit(handleGetRateQuote)}>
        {/* Ship From */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Ship From</label>
          {loading ? (
            <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
              <div className="flex h-28 bg-gray-200 rounded w-full" />
            </div>
          ) : (
            <>
              <div
                className={`flex flex-col rounded-md overflow-hidden border-2 ${
                  openShippingAddress ? "border-sky-500" : "border-gray-300"
                } ${selected === "Create" ? "border-b-0 rounded-b-none" : ""}`}
                ref={shipFromRef}
              >
                <button
                  type="button"
                  className={`relative w-full pl-3 pr-10 py-3 rounded-sm text-left outline-none`}
                  onClick={() => setOpenShippingAddress((o) => !o)}
                >
                  {selected === "Create" ? (
                    <div className="flex flex-col gap-1">
                      <span className="text-xl">
                        Create New Ship From Address
                      </span>
                      <span className="text-sm text-gray-500">
                        Create New Ship From Address
                      </span>
                    </div>
                  ) : selected ? (
                    ShippinhgAddressItem(selected)
                  ) : null}
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path
                        d={
                          openShippingAddress
                            ? "M7 14l5-5 5 5"
                            : "M7 10l5 5 5-5"
                        }
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                {user?.shippingAddress &&
                  user?.shippingAddress?.length > 0 &&
                  openShippingAddress && (
                    <div className="w-full bg-white border border-sky-200 shadow-lg max-h-60 overflow-auto">
                      {user?.shippingAddress
                        ?.filter((s) => s.id !== selected?.id)
                        .map((s, idx) => (
                          <div
                            key={s.fullName + idx}
                            className={`pl-3 pr-10 py-3 cursor-pointer hover:bg-blue-50 transition-colors`}
                            onClick={() => {
                              setSelected(s);
                              setOpenShippingAddress(false);
                            }}
                          >
                            {ShippinhgAddressItem(s)}
                          </div>
                        ))}
                      {selected !== "Create" && (
                        <div
                          className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors border-t"
                          onClick={() => {
                            setSelected("Create");
                            setOpenShippingAddress(false);
                          }}
                        >
                          <div className="text-xl">
                            Create New Ship From Address
                          </div>
                          <div className="text-sm text-gray-400">
                            Create New Ship From Address
                          </div>
                        </div>
                      )}
                    </div>
                  )}
              </div>
              {selected === "Create" && (
                <div className="px-4 py-6 border-2 border-gray-300 rounded-b-md space-y-2">
                  <label className="block text-sm">
                    Physical Address{" "}
                    <span className="text-gray-400 text-xs">
                      Enter the physical home, office, or warehouse address
                      you‘re shipping from.
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      id="fullName"
                      placeholder="Full Personal Name (Optional)"
                      {...register("fullName")}
                      className={"h-12 text-base"}
                      error={errors.fullName}
                      autoComplete="fullName"
                    />
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
                  </div>
                  <div className="flex items-center pt-6">
                    <input
                      type="checkbox"
                      id="isSameAddress"
                      checked={isSameAddress}
                      onChange={(e) => setIsSameAddress(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="isSameAddress">
                      Use this address as the Return Address on my shipping
                      labels
                    </label>
                  </div>
                  {!isSameAddress && (
                    <>
                      <label className="block text-sm">
                        Return Address (optional){" "}
                        <span className="text-gray-400 text-xs">
                          Enter the address you'd like printed on your shipping
                          labels.
                        </span>
                      </label>
                      <div className="grid grid-cols-2 gap-6">
                        <Input
                          id="return_fullName"
                          placeholder="Full Personal Name (Optional)"
                          {...register("return_fullName")}
                          className={"h-12 text-base"}
                          error={errors.return_fullName}
                          autoComplete="return_fullName"
                        />
                        <Input
                          id="return_company"
                          placeholder="Company (optional)"
                          {...register("return_company")}
                          className={"h-12 text-base"}
                          error={errors.return_company}
                          autoComplete="return_company"
                        />
                        <Input
                          id="return_addressline1"
                          placeholder="Address"
                          {...register("return_addressline1")}
                          className={"h-12 text-base"}
                          error={errors.return_addressline1}
                          autoComplete="return_addressline1"
                        />
                        <Input
                          id="return_addressline2"
                          placeholder="Apt / Unit / Suite / etc. (optional)"
                          {...register("return_addressline2")}
                          className={"h-12 text-base"}
                          error={errors.return_addressline2}
                          autoComplete="return_addressline2"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            id="return_city"
                            placeholder="City"
                            {...register("return_city")}
                            className={"h-12 text-base"}
                            error={errors.return_city}
                            autoComplete="return_city"
                          />
                          <select
                            id="return_state"
                            {...register("return_state")}
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
                            id="return_zipCode"
                            placeholder="ZipCode"
                            {...register("return_zipCode")}
                            className={"h-12 text-base"}
                            error={errors.return_zipCode}
                            autoComplete="return_zipCode"
                          />
                        </div>
                        <Input
                          id="return_phoneNumber"
                          placeholder="Phone"
                          {...register("return_phoneNumber")}
                          className={"h-12 text-base"}
                          error={errors.return_phoneNumber}
                          autoComplete="return_phoneNumber"
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={`flex flex-row items-center ${
                      isSameAddress ? "" : "pt-6"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id="isSaveAddress"
                      checked={isSaveAddress}
                      onChange={(e) => setIsSaveAddress(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="isSaveAddress" className="cursor-pointer">
                      Save Ship From Address
                      <span className="text-gray-400 text-sm">
                        {" "}
                        Save this address to use again later
                      </span>
                    </label>
                  </div>
                  {isSaveAddress && (
                    <div>
                      <Input
                        id="nickName"
                        placeholder="Nickname this Ship From Address"
                        {...register("nickName")}
                        className={"h-12 text-base"}
                        error={errors.nickName}
                        autoComplete="nickName"
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Ship To */}
        <div className="flex flex-col mb-6">
          <label className="block font-semibold mb-2">Ship To</label>
          {loading ? (
            <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
              <div className="flex h-14 bg-gray-200 rounded w-full" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <select
                name="shipToCountry"
                value={shipToCountry.code}
                onChange={(e) => {
                  const selectedCountry = countries.find(
                    (c) => c.code === e.target.value
                  );
                  setShipToCountry(selectedCountry);
                }}
                className="w-full border rounded-md px-3 py-2 h-12"
              >
                {countries.map((country) => (
                  <option
                    key={country.code}
                    value={country.code}
                    className="py-2 px-3 text-sm"
                  >
                    {country.label}
                  </option>
                ))}
              </select>
              {shipToCountry.isZipCode && (
                <Input
                  id="shipZipCode"
                  placeholder="ZipCode"
                  {...register("shipZipCode")}
                  className="w-full border rounded h-12 text-sm bg-white shadow-sm"
                  error={errors.shipZipCode}
                  autoComplete="shipZipCode"
                />
              )}
            </div>
          )}
        </div>

        {/* Type of Packaging */}

        <div className="mb-6">
          <label className="block font-semibold mb-2">Type of Packaging</label>
          {loading ? (
            <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
              <div className="flex h-28 bg-gray-200 rounded w-full" />
            </div>
          ) : (
            <div
              className={`flex flex-col rounded-md border-2 overflow-hidden ${
                openPackageType ? "border-sky-500" : "border-gray-300"
              } ${selected === "Create" ? "border-b-0 rounded-b-none" : ""}`}
              ref={packageTypeRef}
            >
              <button
                type="button"
                className={`relative w-full pl-3 pr-10 py-3 rounded-sm text-left outline-none hover:bg-sky-50`}
                onClick={() => setOpenPackageType((o) => !o)}
              >
                {selectedPacketType && PackageTypeItem(selectedPacketType)}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path
                      d={openPackageType ? "M7 14l5-5 5 5" : "M7 10l5 5 5-5"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              {openPackageType && (
                <div className="w-full bg-white border border-sky-200 shadow-lg max-h-80 overflow-auto">
                  {PackageTypes.filter(
                    (s) => s.id !== selectedPacketType?.id
                  ).map((s, idx) => (
                    <div
                      key={s.name + idx}
                      className={`pl-3 pr-10 py-3 cursor-pointer border hover:bg-blue-50 transition-colors`}
                      onClick={() => {
                        onChangePacketType(s);
                      }}
                    >
                      {PackageTypeItem(s)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Package Dimensions */}
        {selectedPacketType.predefined_package ? null : (
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Package Dimensions (Inches)
            </label>
            {loading ? (
              <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
                <div className="flex h-14 bg-gray-200 rounded w-full" />
              </div>
            ) : (
              <>
                <div className="flex gap-4">
                  <Input
                    id="length"
                    placeholder="Length"
                    {...register("length")}
                    className="h-12 text-sm"
                    error={errors.length || validateSize}
                    showError={!validateSize}
                    autoComplete="length"
                  />
                  <span className="flex items-center text-gray-400 font-bold">
                    ×
                  </span>
                  <Input
                    id="width"
                    placeholder="Width"
                    {...register("width")}
                    className="h-12 text-sm"
                    error={errors.width || validateSize}
                    showError={!validateSize}
                    autoComplete="width"
                  />
                  {selectedPacketType.isHeight !== "NOT" && (
                    <span className="flex items-center text-gray-400 font-bold">
                      ×
                    </span>
                  )}
                  {selectedPacketType.isHeight !== "NOT" && (
                    <Input
                      id="height"
                      placeholder="Height"
                      {...register("height")}
                      className="h-12 text-sm"
                      error={errors.height || validateSize}
                      showError={!validateSize}
                      autoComplete="height"
                    />
                  )}
                </div>
                {!validateSize?.isValid && (
                  <div className="text-xs mt-1 text-red-500 text-end">
                    {validateSize?.message}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Package Weight */}
        <div className="flex-1 mb-10">
          <label className="block font-semibold mb-2">Package Weight</label>
          {loading ? (
            <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
              <div className="flex h-14 bg-gray-200 rounded w-full" />
            </div>
          ) : (
            <>
              <div className="flex flex-row items-center justify-start gap-4">
                <Input
                  id="pounds"
                  placeholder="Pounds"
                  {...register("pounds")}
                  className="shadow-sm text-sm h-12"
                  error={errors.pounds || validateWeight}
                  showError={!validateWeight}
                  autoComplete="pounds"
                />
                <span className="flex items-center text-gray-400 font-bold">
                  +
                </span>
                <Input
                  id="ounces"
                  placeholder="Ounces"
                  {...register("ounces")}
                  className="shadow-sm text-sm h-12"
                  error={errors.ounces || validateWeight}
                  showError={!validateWeight}
                  autoComplete="ounces"
                />
              </div>
              {!validateWeight?.isValid && (
                <div className="text-xs mt-1 text-red-500 text-start">
                  {validateWeight?.message}
                </div>
              )}
            </>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          {loading ? (
            <div className="bg-white rounded-lg w-full flex justify-end animate-pulse">
              <div className="flex h-20 bg-gray-200 rounded w-60" />
            </div>
          ) : (
            <div className="flex flex-col items-end">
              <button
                type="submit"
                disabled={validateSize || validateWeight}
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-10 py-5 rounded-lg shadow-lg disabled:bg-gray-500"
              >
                {isLoading ? "Getting Rate Quote..." : "Get Rate Quote*"}
              </button>
              <span className="text-xs text-gray-400 mt-1">
                *Rates may vary based on actual shipping address
              </span>
            </div>
          )}
        </div>
      </form>
      {!isLoading && rateList && rateList.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 mt-6 gap-4">
          {rateList.map((item, idx) => (
            <ShippingRateCard key={idx} rateData={item} />
          ))}
        </div>
      )}
    </div>
  );
}
