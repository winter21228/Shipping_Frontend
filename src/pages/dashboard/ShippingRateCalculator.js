import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getMe } from "../../redux/slices/auth";
import { COUNTRIES } from "../../utils/countries";
import { convertOzToLbs } from "../../utils/methods/formatMethods";
import {
  MAX_GIRTH_LENGTH,
  MAX_WEIGHT,
  MIN_HEIGHT,
  MIN_LENGTH,
  MIN_WIDTH,
  PackageTypes,
} from "../../utils/constant";
import axios from "../../utils/axios";
import {
  PackageDimensions,
  PackageTypeSelector,
  PackageWeight,
  RateList,
  ShipFromSelector,
  ShipToSelector,
} from "./sections/rates";

// Main Page
export default function ShippingRateCalculator() {
  const dispatch = useDispatch();
  const { user, isLoading: loading } = useSelector((state) => state.auth);

  const [selected, setSelected] = useState("Create");
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [isSaveAddress, setIsSaveAddress] = useState(false);
  const [selectedPacketType, setSelectedPacketType] = useState(PackageTypes[0]);
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
    shipToCountry: Yup.string().required("ShipTo Country is required"),
    shipZipCode: Yup.mixed().test("isZipCodeRequired", function () {
      const { shipToCountry } = this.parent;

      if (shipToCountry) {
        const country = COUNTRIES.find((item) => item.code === shipToCountry);
        if (country && country.isZipCode) {
          return this.createError({
            message: "ZipCode is required",
          });
        }
      }
      return true;
    }),
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
    shipToCountry: "",
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

  console.log("errors", errors);
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
  }, [
    formData.length,
    formData.width,
    formData.height,
    selectedPacketType.isHeight,
  ]);

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

  const packageTypeRef = useRef(null);

  const handleGetRateQuote = async (data) => {
    setIsLoading(true);
    try {
      console.log("first");
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
        zip: COUNTRIES.find((item) => item.code === data.shipToCountry)
          ?.isZipCode
          ? data.shipZipCode
          : "",
        phone: "",
        email: "",
        country: data,
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
      console.log("shipmentDetails", shipmentDetails);
      const response = await axios.post(
        "/api/easypost/get-rate",
        shipmentDetails
      );
      const { rates } = response.data.msg;
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
        <ShipFromSelector
          loading={loading}
          shippingAddress={user?.shippingAddress}
          selected={selected}
          setSelected={setSelected}
          isSameAddress={isSameAddress}
          onChangeIsSameAddress={setIsSameAddress}
          isSaveAddress={isSaveAddress}
          onChangeIsSaveAddress={setIsSaveAddress}
          register={register}
          errors={errors}
        />
        <ShipToSelector
          loading={loading}
          register={register}
          errors={errors}
          country={formData.shipToCountry}
        />
        <PackageTypeSelector
          loading={loading}
          selectedPacketType={selectedPacketType}
          setSelectedPacketType={setSelectedPacketType}
          PackageTypes={PackageTypes}
          packageTypeRef={packageTypeRef}
        />
        <PackageDimensions
          loading={loading}
          selectedPacketType={selectedPacketType}
          register={register}
          errors={errors}
          validateSize={validateSize}
        />
        <PackageWeight
          loading={loading}
          register={register}
          errors={errors}
          validateWeight={validateWeight}
        />
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
                className="bg-green hover:bg-greenButtonAccent text-white font-bold text-xl px-10 py-5 rounded-lg shadow-lg disabled:bg-gray-500"
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
      <RateList isLoading={isLoading} rateList={rateList} />
    </div>
  );
}
