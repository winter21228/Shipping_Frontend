import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { getMe } from "../../redux/slices/auth";
import { setShipment } from "../../redux/slices/user";

import {
  PackageSelector,
  RateList,
  ShipFromSelector,
  ShipToSelector,
} from "./sections/rates";
import PackageTypeSubform from "./sections/rates/PacketTypeSubform";

import { COUNTRIES } from "../../utils/countries";
import axios from "../../utils/axios";
import { PACKET_TYPES_DATA } from "../../utils/packetTypes";
import { getFilteredPackageTypes } from "../../utils/methods/getFilteredPacketTypes";
import {
  packageDimensions2d,
  packageDimensions3d,
  packageWeight,
  validateDomesticOrInternational,
} from "../../utils/validators";
import { toOunces } from "../../utils/methods/formatWeight";

import { PATH_DASHBOARD } from "../../routes/paths";

// Main Page
export default function ShippingRateCalculator() {
  const packetTypes = getFilteredPackageTypes(PACKET_TYPES_DATA);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading: loading } = useSelector((state) => state.auth);

  const [selected, setSelected] = useState("Create");
  const [selectedPackage, setSelectedPackage] = useState("Create");
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [isSaveAddress, setIsSaveAddress] = useState(false);
  const [savedAddressId, setSavedAddressId] = useState("");
  const [selectedPacketType, setSelectedPacketType] = useState(packetTypes[0]);
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
    length:
      selectedPackage === "Create" && selectedPacketType.dimensionsRequired
        ? Yup.string().required("This field is required")
        : Yup.string(),
    width:
      selectedPackage === "Create" && selectedPacketType.dimensionsRequired
        ? Yup.string().required("This field is required")
        : Yup.string(),
    height:
      selectedPackage === "Create" && selectedPacketType.heightRequired
        ? Yup.string().required("This field is required")
        : Yup.string(),
    pounds:
      selectedPackage === "Create" && selectedPacketType.weightRequired
        ? Yup.string().required("This field is required")
        : Yup.string(),
    ounces: Yup.string(),
    combined3D: Yup.mixed().test("package-dimensions-3d", function () {
      const { length, width, height, shipFromCountry, shipToCountry } =
        this.parent;
      if (
        selectedPacketType.dimensionsRequired &&
        selectedPacketType.heightRequired &&
        length &&
        width &&
        height
      ) {
        const fromCountry =
          selected === "Create" ? shipFromCountry : selected.country;
        const config =
          selectedPacketType?.limitConfig?.["3d"]?.[
            validateDomesticOrInternational(fromCountry, shipToCountry)
          ];
        const error = packageDimensions3d(
          {
            length: parseFloat(length),
            width: parseFloat(width),
            height: parseFloat(height),
          },
          config
        );
        if (error) {
          return this.createError({ message: error });
        }
      }
      return true;
    }),
    combined2D: Yup.mixed().test("package-dimensions-2d", function () {
      const { length, width, shipFromCountry, shipToCountry } = this.parent;
      if (
        selectedPacketType.dimensionsRequired &&
        !selectedPacketType.heightRequired &&
        length &&
        width
      ) {
        const fromCountry =
          selected === "Create" ? shipFromCountry : selected.country;
        const config =
          selectedPacketType?.limitConfig?.["2d"]?.[
            validateDomesticOrInternational(fromCountry, shipToCountry)
          ];
        const error = packageDimensions2d(
          {
            length: parseFloat(length),
            width: parseFloat(width),
          },
          config
        );
        if (error) {
          return this.createError({ message: error });
        }
      }
      return true;
    }),
    combinedWeight: Yup.mixed().test("package-weight", function () {
      const { pounds, ounces, shipFromCountry, shipToCountry } = this.parent;
      if (selectedPacketType.weightRequired && pounds) {
        const fromCountry =
          selected === "Create" ? shipFromCountry : selected.country;
        const config =
          selectedPacketType?.limitConfig?.["weight"]?.[
            validateDomesticOrInternational(fromCountry, shipToCountry)
          ];
        const error = packageWeight(
          {
            weightPounds: parseFloat(pounds),
            weightOunces: ounces ? parseFloat(ounces) : 0,
          },
          config
        );
        if (error) {
          return this.createError({ message: error });
        }
      }
      return true;
    }),
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

  const formData = watch();

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
        zip: COUNTRIES.find((item) => item.value === data.shipToCountry)
          ?.isZipCode
          ? data.shipZipCode
          : "",
        phone: "",
        email: "",
        country: data.shipToCountry,
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

      const parcel =
        selectedPackage === "Create"
          ? {
              weight: toOunces({
                pounds: data.pounds ? parseFloat(data.pounds) : 0,
                ounces: data.ounces ? parseFloat(data.ounces) : 0,
              }),
              ...(selectedPacketType?.dimensionsRequired && {
                width: parseFloat(data.width),
                length: parseFloat(data.length),
                ...(selectedPacketType?.heightRequired && {
                  height: parseFloat(data.length),
                }),
              }),
            }
          : selectedPackage?.parcel;

      const shipmentDetails = {
        nickName: data.nickName,
        toAddress: toAddress,
        fromAddress: fromAddress,
        parcel: parcel,
        returnAddress: returnAddress,
        isSameAddress,
        isSaveAddress,
        selectedPacketType,
      };
      const response = await axios.post(
        "/api/easypost/get-rate",
        shipmentDetails
      );
      const { rates, savedAddressId } = response.data.msg;
      setRateList(rates);
      setSavedAddressId(savedAddressId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching rate quote:", error);
      return;
    }
  };

  const handleShipNow = () => {
    const shipmentData = {
      shipToAddress: {
        name: "",
        street1: "",
        city: "",
        state: "",
        zip: COUNTRIES.find((item) => item.value === formData.shipToCountry)
          ?.isZipCode
          ? formData.shipZipCode
          : "",
        phone: "",
        email: "",
        country: formData.shipToCountry,
      },
      shipFromAddressId: savedAddressId,
      shipFromAddress: {
        nickName: formData?.nickName,
        fullName: formData?.fullName,
        company: formData?.company,
        addressline1: formData?.addressline1,
        addressline2: formData?.addressline2,
        city: formData?.city,
        state: formData?.state,
        zipCode: formData?.zipCode,
        phoneNumber: formData?.phoneNumber,
        isSavedAddress: isSaveAddress,
        isSamePhysicalAndReturn: isSameAddress,
        return_fullName: formData?.return_fullName,
        return_company: formData?.return_company,
        return_addressline1: formData?.return_addressline1,
        return_addressline2: formData?.return_addressline2,
        return_city: formData?.return_city,
        return_state: formData?.return_state,
        return_zipCode: formData?.return_zipCode,
        return_phoneNumber: formData?.return_phoneNumber,
      },
      package: {
        parcel:
          selectedPackage === "Create"
            ? {
                weight: toOunces({
                  pounds: formData.pounds ? parseFloat(formData.pounds) : 0,
                  ounces: formData.ounces ? parseFloat(formData.ounces) : 0,
                }),
                ...(selectedPacketType.dimensionsRequired && {
                  width: parseFloat(formData.width),
                  length: parseFloat(formData.length),
                  ...(selectedPacketType.heightRequired && {
                    height: parseFloat(formData.length),
                  }),
                }),
              }
            : selectedPackage?.parcel,
        packageType: selectedPacketType,
      },
    };
    dispatch(setShipment(shipmentData));
    navigate(PATH_DASHBOARD.singleShipping);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Quick Rate Quote</h1>
      <form
        onSubmit={handleSubmit(handleGetRateQuote)}
        className="flex flex-col gap-4"
      >
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
        {user?.packages.length > 0 && (
          <PackageSelector
            packages={user?.packages}
            selected={selectedPackage}
            setSelected={setSelectedPackage}
          />
        )}
        {selectedPackage === "Create" && (
          <PackageTypeSubform
            loading={loading}
            packageTypes={packetTypes}
            selectedPacketType={selectedPacketType}
            setSelectedPacketType={setSelectedPacketType}
            register={register}
            errors={errors}
          />
        )}
        <div className="flex justify-end">
          {loading ? (
            <div className="bg-white rounded-lg w-full flex justify-end animate-pulse">
              <div className="flex h-20 bg-gray-200 rounded w-60" />
            </div>
          ) : (
            <div className="flex flex-col items-end">
              <button
                type="submit"
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
      <RateList
        isLoading={isLoading}
        rateList={rateList}
        onShipNow={handleShipNow}
      />
    </div>
  );
}
