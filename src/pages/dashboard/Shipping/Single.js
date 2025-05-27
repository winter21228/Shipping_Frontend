import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import ShipToAddressSubform from "../sections/shipping/ShipToAddressSubform";
import RubberStampSubform from "../sections/shipping/RubberStampSubform";
import ShipFromAddressSubform from "../sections/shipping/ShipFromAddressSubform";
import PackageTypeSubform from "../sections/shipping/PacketTypeSubform";
import ExtraSubform from "../sections/shipping/ExtraSubform";
import PackageSelector from "../sections/shipping/PackageSelector";

import { getMe } from "../../../redux/slices/auth";
import {
  createShipment,
  getShipment,
  setSuccess,
  updateShipment,
} from "../../../redux/slices/user";

import {
  packageDimensions2d,
  packageDimensions3d,
  packageWeight,
  validateDomesticOrInternational,
} from "../../../utils/validators";
import { PACKET_TYPES_DATA } from "../../../utils/packetTypes";
import { getFilteredPackageTypes } from "../../../utils/methods/getFilteredPacketTypes";
import { PackageContentTypes } from "../../../utils/constant";
import {
  formatWeight,
  toOunces,
  toWeightObject,
} from "../../../utils/methods/formatWeight";
import { PATH_DASHBOARD } from "../../../routes/paths";

function SingleShippingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentShipmentId = localStorage.getItem("currentShipmentId");

  const { user, isLoading: loading } = useSelector((state) => state.auth);
  const { isSuccess, shipmentId, shipment } = useSelector(
    (state) => state.user
  );

  const packetTypes = getFilteredPackageTypes(PACKET_TYPES_DATA);

  const [selectedShipFromAddress, setSelectedShipFromAddress] =
    useState("Create");
  const [selectedPackage, setSelectedPackage] = useState("Create");
  const [packageContentType, setPackageContentType] = useState(
    PackageContentTypes[1]
  );
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [isSaveAddress, setIsSaveAddress] = useState(false);
  const [includeRubberStamp, setIncludeRubberStamp] = useState(false);
  const [selectedPacketType, setSelectedPacketType] = useState(packetTypes[0]);
  const [isIncludeInsurance, setIsIncludeInsurance] = useState(false);
  const [isIncludeCustomsInfo, setIsIncludeCustomsInfo] = useState(false);
  const [isSavePackage, setIsSavePackage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getMe());
    dispatch(getShipment(currentShipmentId));
  }, [dispatch, currentShipmentId]);

  useEffect(() => {
    if (isSuccess && shipmentId) {
      dispatch(setSuccess(false));
      navigate(PATH_DASHBOARD.reviewShip(shipmentId));
    }
  }, [dispatch, navigate, isSuccess, shipmentId]);

  useEffect(() => {
    if (user?.shippingAddress?.length > 0) {
      setSelectedShipFromAddress(user.shippingAddress[0]);
    } else {
      setSelectedShipFromAddress("Create");
    }
  }, [user]);

  const CustomLineItemSchema = Yup.object().shape({
    description: Yup.string().required("This field is required"),
    hs_tariff_number: Yup.string(),
    origin_country: Yup.string().required("This field is required"),
    quantity: Yup.string().required("This field is required"),
    value: Yup.string().required("This field is required"),
    weight_pounds: Yup.string().required(
      "Customs Line item requires a weight (lbs, oz or both)"
    ),
    weight_ounces: Yup.string(),
  });

  const ShippingLabelSchema = Yup.object().shape({
    shipToEmail: Yup.string(),
    shipToPhone: Yup.string(),
    shipToName: Yup.string().required(
      "Either name or company need to be specified"
    ),
    shipToCompany: Yup.string(),
    shipToAddress1: Yup.string().required("This field is required"),
    shipToAddress2: Yup.string(),
    shipToCity: Yup.string().required("This field is required"),
    shipToState: Yup.string().required("This field is required"),
    shipToZipCode: Yup.string().required("This field is required"),
    shipToCountry: Yup.string()
      .required("This field is required")
      .default("US"),
    rubberStamp1: Yup.string(),
    rubberStamp2: Yup.string(),
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
    ...(isSavePackage && {
      packageNickName: Yup.string().required("This field is required"),
    }),
    ...(isIncludeInsurance && {
      insurance: Yup.string(),
    }),
    ...(isIncludeCustomsInfo && {
      customsInfo: Yup.object({
        signer: Yup.string().required("This field is required"),
        customLineItems: Yup.array()
          .of(CustomLineItemSchema)
          .min(1, "At least one line item is required"),
      }),
    }),
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
          selectedShipFromAddress === "Create"
            ? shipFromCountry
            : selectedShipFromAddress.country;
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
          selectedShipFromAddress === "Create"
            ? shipFromCountry
            : selectedShipFromAddress.country;
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
          selectedShipFromAddress === "Create"
            ? shipFromCountry
            : selectedShipFromAddress.country;
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
    combinedCustomsFormWeight: Yup.mixed().test(
      "customs-form-weight-not-over",
      function () {
        const { pounds, ounces, customsInfo } = this.parent;
        if (
          selectedPacketType.weightRequired &&
          isIncludeCustomsInfo &&
          customsInfo?.customLineItems?.length > 0 &&
          pounds
        ) {
          let customsFormTotalPounds = 0;
          let customsFormTotalOunces = 0;
          customsInfo.customLineItems.forEach((item) => {
            customsFormTotalPounds =
              customsFormTotalPounds +
              (item.weight_pounds ? parseFloat(item.weight_pounds) : 0);
            customsFormTotalOunces =
              customsFormTotalOunces +
              (item.weight_ounces ? parseFloat(item.weight_ounces) : 0);
          });
          if (
            toOunces({
              pounds: customsFormTotalPounds,
              ounces: customsFormTotalOunces,
            }) >
            toOunces({
              pounds: pounds ? parseFloat(pounds) : 0,
              ounces: ounces ? parseFloat(ounces) : 0,
            })
          ) {
            return this.createError({
              message: `Customs items total weight (${formatWeight({
                pounds: customsFormTotalPounds,
                ounces: customsFormTotalOunces,
              })}) should not be higher than package weight.`,
            });
          }
        }
        return true;
      }
    ),
    ...(selectedShipFromAddress === "Create" && {
      shipFromFullName: Yup.string(),
      shipFromCompany: Yup.string(),
      shipFromAddress1: Yup.string().required("This field is required"),
      shipFromAddress2: Yup.string(),
      shipFromCity: Yup.string().required("This field is required"),
      shipFromState: Yup.string().required("This field is required"),
      shipFromZipCode: Yup.string().required("This field is required"),
      shipFromPhone: Yup.string().required("This field is required"),
      ...(!isSameAddress && {
        returnFullName: Yup.string(),
        returnCompany: Yup.string(),
        returnAddress1: Yup.string().required("This field is required"),
        returnAddress2: Yup.string(),
        returnCity: Yup.string().required("This field is required"),
        returnState: Yup.string().required("This field is required"),
        returnZipCode: Yup.string().required("This field is required"),
        returnPhone: Yup.string().required("This field is required"),
      }),
      ...(isSaveAddress && {
        nickName: Yup.string().required("This field is required"),
      }),
    }),
  });

  const defaultValues = useMemo(
    () => ({
      shipToEmail: "",
      shipToPhone: "",
      shipToName: "",
      shipToCompany: "",
      shipToAddress1: "",
      shipToAddress2: "",
      shipToCity: "",
      shipToState: "",
      shipToZipCode: "",
      shipToCountry: "US",
      rubberStamp1: "",
      rubberStamp2: "",
      length: "",
      width: "",
      height: "",
      pounds: "",
      ounces: "",
      insurance: 0,
      packageNickName: "",
      customsInfo: {
        signer: "",
        customLineItems: [
          {
            description: "",
            hs_tariff_number: "",
            origin_country: "US",
            quantity: "",
            value: "",
            weight_pounds: "",
            weight_ounces: "",
          },
        ],
      },
      ...(selectedShipFromAddress === "Create" && {
        shipFromFullName: "",
        shipFromCompany: "",
        shipFromCountry: "US",
        shipFromAddress1: "",
        shipFromAddress2: "",
        shipFromCity: "",
        shipFromState: "",
        shipFromZipCode: "",
        shipFromPhone: "",
        ...(!isSameAddress && {
          returnFullName: "",
          returnCompany: "",
          returnAddress1: "",
          returnAddress2: "",
          returnCity: "",
          returnState: "",
          returnZipCode: "",
          returnPhoneNumber: "",
        }),
        ...(isSaveAddress && {
          nickName: "",
        }),
      }),
    }),
    [isSameAddress, isSaveAddress, selectedShipFromAddress]
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(ShippingLabelSchema),
    defaultValues,
    mode: "onChange",
  });

  const formValues = watch();

  useEffect(() => {
    if (!shipment) return;

    const newValues = {
      shipToEmail: shipment?.shipToAddress?.email || "",
      shipToPhone: shipment?.shipToAddress?.phone || "",
      shipToName: shipment?.shipToAddress?.name || "",
      shipToCompany: shipment?.shipToAddress?.company || "",
      shipToAddress1: shipment?.shipToAddress?.street1 || "",
      shipToAddress2: shipment?.shipToAddress?.street2 || "",
      shipToCity: shipment?.shipToAddress?.city || "",
      shipToState: shipment?.shipToAddress?.state || "",
      shipToZipCode: shipment?.shipToAddress?.zip || "",
      shipToCountry: shipment?.shipToAddress?.country || "",
      rubberStamp1: shipment?.rubberStamp?.rubberStamp1 || "",
      rubberStamp2: shipment?.rubberStamp?.rubberStamp2 || "",
      length: shipment?.package?.parcel?.length || "",
      width: shipment?.package?.parcel?.width || "",
      height: shipment?.package?.parcel?.height || "",
      pounds:
        toWeightObject(parseFloat(shipment?.package?.parcel?.weight)).pounds ||
        "",
      ounces:
        toWeightObject(parseFloat(shipment?.package?.parcel?.weight)).ounces ||
        "",
      packageNickName: shipment?.package?.nickname || "",
    };

    // Add conditional shipFrom + return address if "Create"
    if (!shipment?.shipFromAddress?.isSavedAddress) {
      Object.assign(newValues, {
        shipFromFullName: shipment?.shipFromAddress?.fullName || "",
        shipFromCompany: shipment?.shipFromAddress?.company || "",
        shipFromAddress1: shipment?.shipFromAddress?.addressline1 || "",
        shipFromAddress2: shipment?.shipFromAddress?.addressline2 || "",
        shipFromCity: shipment?.shipFromAddress?.city || "",
        shipFromState: shipment?.shipFromAddress?.state || "",
        shipFromZipCode: shipment?.shipFromAddress?.zipCode || "",
        shipFromPhone: shipment?.shipFromAddress?.phoneNumber || "",
      });

      if (!shipment?.shipFromAddress?.isSamePhysicalAndReturn) {
        Object.assign(newValues, {
          returnFullName: shipment?.shipFromAddress?.return_fullName || "",
          returnCompany: shipment?.shipFromAddress?.return_company || "",
          returnAddress1: shipment?.shipFromAddress?.return_addressline1 || "",
          returnAddress2: shipment?.shipFromAddress?.return_addressline2 || "",
          returnCity: shipment?.shipFromAddress?.return_city || "",
          returnState: shipment?.shipFromAddress?.return_state || "",
          returnZipCode: shipment?.shipFromAddress?.return_zipCode || "",
          returnPhone: shipment?.shipFromAddress?.return_phoneNumber || "",
        });
      }
    }

    if (shipment?.package?.isIncludeInsurance) {
      Object.assign(newValues, {
        insurance: shipment?.package?.insurance || 0,
      });
    }

    if (shipment?.package?.isIncludeCustomsInfo) {
      Object.assign(newValues, {
        customsInfo: {
          signer: shipment?.package?.customsForm?.signer || "",
          customLineItems:
            shipment?.package?.customsForm?.customLineItems || [],
        },
      });
      setPackageContentType(
        shipment?.package?.customsForm?.contents_type || PackageContentTypes[0]
      );
    }

    reset(newValues);
    setIsIncludeInsurance(shipment?.package?.isIncludeInsurance || false);
    setIsIncludeCustomsInfo(shipment?.package?.isIncludeCustomsInfo || false);
    setIsSavePackage(shipment?.package?.isSavedPackage || false);
    setIncludeRubberStamp(!!shipment?.rubberStamp);
    setSelectedShipFromAddress(
      shipment?.shipFromAddress?.isSavedAddress
        ? shipment?.shipFromAddress
        : "Create"
    );
    setSelectedPackage(
      shipment?.package?.isSavedPackage ? shipment?.package : "Create"
    );
    setSelectedPacketType(shipment?.package?.packageType);
    setIsSameAddress(
      shipment?.shipFromAddress?.isSamePhysicalAndReturn ?? true
    );
  }, [shipment, reset]);

  useEffect(() => {
    if (formValues.shipToCountry !== "US") {
      setIsIncludeCustomsInfo(true);
    }
  }, [formValues.shipToCountry]);

  useEffect(() => {
    if (selectedShipFromAddress === "Create" && formValues.shipFromFullName) {
      setValue("customsInfo.signer", formValues.shipFromFullName);
    }
    if (selectedShipFromAddress !== "Create") {
      setValue("customsInfo.signer", selectedShipFromAddress.fullName);
    }
  }, [formValues.shipFromFullName, selectedShipFromAddress, setValue]);

  useEffect(() => {
    const autoComplete = new window.google.maps.places.Autocomplete(
      document.querySelector('[name="shipToAddress1"]')
    );
    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        console.log("this location not available");
      }
      if (place.geometry.viewport || place.geometry.location) {
        const addressComponents = place.address_components;
        // Initialize variables to store the extracted information
        let street_number = "";
        let address = "";
        let city = "";
        let state = "";
        let country = "";
        let zip = "";
        // Loop through all the address components
        for (let i = 0; i < addressComponents.length; i += 1) {
          const addressType = addressComponents[i].types[0];
          // Extract the street_number
          if (addressType === "street_number") {
            street_number = addressComponents[i].long_name;
          }
          // Extract the address
          if (addressType === "route") {
            address = addressComponents[i].long_name;
          }
          // Extract the city
          if (addressType === "locality" || addressType === "postal_town") {
            city = addressComponents[i].long_name;
          }
          // Extract the state
          if (addressType === "administrative_area_level_1") {
            state = addressComponents[i].long_name;
          }
          // Extract the country
          if (addressType === "country") {
            country = addressComponents[i].long_name;
          }
          // Extract the zip code
          if (addressType === "postal_code") {
            zip = addressComponents[i].long_name;
          }
        }

        setValue("shipToAddress1", `${street_number} ${address}`);
        setValue("shipToCity", city);
        setValue("shipToState", state);
        setValue("shipToCountry", country);
        setValue("shipToZipCode", zip);
      }
    });
  }, [setValue]);

  const handleGetRate = (values) => {
    setIsLoading(true);
    try {
      const toAddress = {
        name: values.shipToName,
        street1: values.shipToAddress1,
        street2: values.shipToAddress2,
        city: values.shipToCity,
        state: values.shipToState,
        zip: values.shipToZipCode,
        country: values.shipToCountry,
        email: values.shipToEmail,
        phone: values.shipToPhone,
        company: values.shipToCompany,
      };
      const fromAddress =
        selectedShipFromAddress === "Create"
          ? {
              name: values.shipFromFullName,
              street1: values.shipFromAddress1,
              street2: values.shipFromAddress2,
              city: values.shipFromCity,
              state: values.shipFromState,
              zip: values.shipFromZipCode,
              country: "US",
              company: values.shipFromCompany,
              phone: values.shipFromPhone,
            }
          : {
              name: selectedShipFromAddress.fullName,
              street1: selectedShipFromAddress.addressline1,
              street2: selectedShipFromAddress.addressline2,
              city: selectedShipFromAddress.city,
              state: selectedShipFromAddress.state,
              zip: selectedShipFromAddress.zipCode,
              country: selectedShipFromAddress.country,
              company: selectedShipFromAddress.company,
              phone: selectedShipFromAddress.phoneNumber,
            };

      const returnAddress =
        selectedShipFromAddress === "Create"
          ? isSameAddress
            ? fromAddress
            : {
                name: values.returnFullName,
                street1: values.returnAddress1,
                street2: values.returnAddress2,
                city: values.returnCity,
                state: values.returnState,
                zip: values.shipFromZipCode,
                country: "US",
                company: values.returnCompany,
                phone: values.returnPhone,
              }
          : {
              name: selectedShipFromAddress.return_fullName,
              street1: selectedShipFromAddress.return_addressline1,
              street2: selectedShipFromAddress.return_addressline2,
              city: selectedShipFromAddress.return_city,
              state: selectedShipFromAddress.return_state,
              zip: selectedShipFromAddress.return_zipCode,
              country: selectedShipFromAddress.return_country,
              company: selectedShipFromAddress.return_company,
              phone: selectedShipFromAddress.return_phoneNumber,
            };
      const parcel =
        selectedPackage === "Create"
          ? {
              weight: toOunces({
                pounds: values.pounds ? parseFloat(values.pounds) : 0,
                ounces: values.ounces ? parseFloat(values.ounces) : 0,
              }),
              ...(selectedPacketType.dimensionsRequired && {
                width: parseFloat(values.width),
                length: parseFloat(values.length),
                ...(selectedPacketType.heightRequired && {
                  height: parseFloat(values.length),
                }),
              }),
            }
          : selectedPackage?.parcel;
      const customsFormInfo =
        selectedPackage === "Create"
          ? {
              signer: values.customsInfo.signer,
              customLineItems:
                values.customsInfo.customLineItems.length > 0
                  ? values.customsInfo.customLineItems.map((item) => ({
                      ...item,
                      quantity: item.quantity ? parseFloat(item.quantity) : 0,
                      value: item.value ? parseFloat(item.value) : 0,
                      weight: toOunces({
                        pounds: item.weight_pounds
                          ? parseFloat(item.weight_pounds)
                          : 0,
                        ounces: item.weight_ounces
                          ? parseFloat(item.weight_ounces)
                          : 0,
                      }),
                    }))
                  : [],
              contents_type: packageContentType,
            }
          : selectedPackage?.customsForm;

      const data = {
        toAddress,
        fromAddress,
        returnAddress,
        parcel,
        customsFormInfo,
        isSameAddress,
        isSaveAddress,
        isIncludeInsurance,
        isIncludeCustomsInfo,
        isSavePackage,
        selectedPacketType,
        addressNickName: values.nickName,
        packageName: values.packageNickName,
        includeRubberStamp,
        insurance: values.insurance,
        rubberStamp: {
          rubberStamp1: values.rubberStamp1,
          rubberStamp2: values.rubberStamp2,
        },
      };

      if (currentShipmentId) {
        dispatch(updateShipment({ id: currentShipmentId, data }));
      } else {
        dispatch(createShipment(data));
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("err", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Create a Shipping Label</h1>
      <form
        onSubmit={handleSubmit(handleGetRate)}
        className="flex flex-col gap-4"
      >
        <ShipToAddressSubform
          loading={loading}
          register={register}
          errors={errors}
        />
        <RubberStampSubform
          includeRubberStamp={includeRubberStamp}
          setIncludeRubberStamp={setIncludeRubberStamp}
          register={register}
          errors={errors}
        />
        <ShipFromAddressSubform
          loading={loading}
          shippingAddress={user?.shippingAddress}
          selected={selectedShipFromAddress}
          setSelected={setSelectedShipFromAddress}
          isSameAddress={isSameAddress}
          onChangeIsSameAddress={setIsSameAddress}
          isSaveAddress={isSaveAddress}
          onChangeIsSaveAddress={setIsSaveAddress}
          register={register}
          errors={errors}
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
            packetTypes={packetTypes}
            selectedPacketType={selectedPacketType}
            setSelectedPacketType={setSelectedPacketType}
            register={register}
            errors={errors}
          />
        )}
        {selectedPackage === "Create" && (
          <ExtraSubform
            isIncludeInsurance={isIncludeInsurance}
            setIsIncludeInsurance={setIsIncludeInsurance}
            isIncludeCustomsInfo={isIncludeCustomsInfo}
            setIsIncludeCustomsInfo={setIsIncludeCustomsInfo}
            isSavePackage={isSavePackage}
            setIsSavePackage={setIsSavePackage}
            packageContentType={packageContentType}
            setPackageContentType={setPackageContentType}
            register={register}
            errors={errors}
            control={control}
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
                className="bg-green border-greenButtonAccent border-2 hover:bg-darkGreen text-white font-bold text-xl px-10 py-5 rounded-lg shadow-lg disabled:bg-gray-500"
              >
                {isLoading && !isSuccess
                  ? "Getting Rate Quote..."
                  : "Get Rate Quote*"}
              </button>
              <span className="text-xs text-gray-400 mt-1">
                *Rates may vary based on actual shipping address
              </span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SingleShippingPage;
