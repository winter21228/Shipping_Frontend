export const STATES = [
  {
    label: "Alabama",
    value: "AL",
  },
  {
    label: "Alaska",
    value: "AK",
  },
  {
    label: "American Samoa",
    value: "AS",
  },
  {
    label: "Arizona",
    value: "AZ",
  },
  {
    label: "Arkansas",
    value: "AR",
  },
  {
    label: "Armed Forces Africa",
    value: "AF",
  },
  {
    label: "Armed Forces Americas",
    value: "AA",
  },
  {
    label: "Armed Forces Canada",
    value: "AC",
  },
  {
    label: "Armed Forces Europe",
    value: "AE",
  },
  {
    label: "Armed Forces Middle East",
    value: "AM",
  },
  {
    label: "Armed Forces Pacific",
    value: "AP",
  },
  {
    label: "California",
    value: "CA",
  },
  {
    label: "Colorado",
    value: "CO",
  },
  {
    label: "Connecticut",
    value: "CT",
  },
  {
    label: "Delaware",
    value: "DE",
  },
  {
    label: "District of Columbia",
    value: "DC",
  },
  {
    label: "Federated States Of Micronesia",
    value: "FM",
  },
  {
    label: "Florida",
    value: "FL",
  },
  {
    label: "Georgia",
    value: "GA",
  },
  {
    label: "Guam",
    value: "GU",
  },
  {
    label: "Hawaii",
    value: "HI",
  },
  {
    label: "Idaho",
    value: "ID",
  },
  {
    label: "Illinois",
    value: "IL",
  },
  {
    label: "Indiana",
    value: "IN",
  },
  {
    label: "Iowa",
    value: "IA",
  },
  {
    label: "Kansas",
    value: "KS",
  },
  {
    label: "Kentucky",
    value: "KY",
  },
  {
    label: "Louisiana",
    value: "LA",
  },
  {
    label: "Maine",
    value: "ME",
  },
  {
    label: "Marshall Islands",
    value: "MH",
  },
  {
    label: "Maryland",
    value: "MD",
  },
  {
    label: "Massachusetts",
    value: "MA",
  },
  {
    label: "Michigan",
    value: "MI",
  },
  {
    label: "Minnesota",
    value: "MN",
  },
  {
    label: "Mississippi",
    value: "MS",
  },
  {
    label: "Missouri",
    value: "MO",
  },
  {
    label: "Montana",
    value: "MT",
  },
  {
    label: "Nebraska",
    value: "NE",
  },
  {
    label: "Nevada",
    value: "NV",
  },
  {
    label: "New Hampshire",
    value: "NH",
  },
  {
    label: "New Jersey",
    value: "NJ",
  },
  {
    label: "New Mexico",
    value: "NM",
  },
  {
    label: "New York",
    value: "NY",
  },
  {
    label: "North Carolina",
    value: "NC",
  },
  {
    label: "North Dakota",
    value: "ND",
  },
  {
    label: "Northern Mariana Islands",
    value: "MP",
  },
  {
    label: "Ohio",
    value: "OH",
  },
  {
    label: "Oklahoma",
    value: "OK",
  },
  {
    label: "Oregon",
    value: "OR",
  },
  {
    label: "Palau",
    value: "PW",
  },
  {
    label: "Pennsylvania",
    value: "PA",
  },
  {
    label: "Puerto Rico",
    value: "PR",
  },
  {
    label: "Rhode Island",
    value: "RI",
  },
  {
    label: "South Carolina",
    value: "SC",
  },
  {
    label: "South Dakota",
    value: "SD",
  },
  {
    label: "Tennessee",
    value: "TN",
  },
  {
    label: "Texas",
    value: "TX",
  },
  {
    label: "Utah",
    value: "UT",
  },
  {
    label: "Vermont",
    value: "VT",
  },
  {
    label: "Virgin Islands",
    value: "VI",
  },
  {
    label: "Virginia",
    value: "VA",
  },
  {
    label: "Washington",
    value: "WA",
  },
  {
    label: "West Virginia",
    value: "WV",
  },
  {
    label: "Wisconsin",
    value: "WI",
  },
  {
    label: "Wyoming",
    value: "WY",
  },
];

export const ICON_URL_PREFIX = "/assets/icons";

export const PackageTypes = [
  {
    id: 1,
    image: `${ICON_URL_PREFIX}/Parcel.png`,
    name: "Box or Rigid Packaging",
    description: "Any custom box or thick parcel",
  },
  {
    id: 2,
    image: `${ICON_URL_PREFIX}/SoftEnvelope.png`,
    name: "Envelope, Padded Envelope, Poly Bag, Soft Pack, or Box in a Bag",
    description:
      "Measure & use the Length and Width of the Envelope before putting anything in it",
    isHeight: "NOT",
  },
  {
    id: 3,
    image: `${ICON_URL_PREFIX}/SmallFlatRateBox.png`,
    name: "USPS Priority Mail Small Flat Rate Box",
    description: "Small Flat Rate Mailing Box only",
    predefined_package: "SmallFlatRateBox",
  },
  {
    id: 4,
    image: `${ICON_URL_PREFIX}/MediumFlatRateBox.png`,
    name: "USPS Priority Mail Medium Flat Rate Box",
    description:
      "Any Medium Flat Rate Box, including 1 (Top-Loading) and 2 (Side-Loading)",
    predefined_package: "MediumFlatRateBox",
  },
  {
    id: 5,
    image: `${ICON_URL_PREFIX}/LargeFlatRateBox.png`,
    name: "USPS Priority Mail Large Flat Rate Box",
    description:
      "Any Large Flat Rate Box, including APO/FPO or Board Game Flat Rate Boxes",
    predefined_package: "LargeFlatRateBox",
  },
  {
    id: 6,
    image: `${ICON_URL_PREFIX}/FlatRateEnvelope.png`,
    name: "USPS Priority Mail Flat Rate Envelope",
    description: "Non-padded Flat Rate Envelope including Small and Window",
    predefined_package: "FlatRateEnvelope",
  },
  {
    id: 7,
    image: `${ICON_URL_PREFIX}/FlatRateLegalEnvelope.png`,
    name: "USPS Priority Mail Legal Flat Rate Envelope",
    description: "Priority Mail Legal Flat Rate Envelope",
    predefined_package: "FlatRateLegalEnvelope",
  },
  {
    id: 8,
    image: `${ICON_URL_PREFIX}/FlatRatePaddedEnvelope.png`,
    name: "USPS Priority Mail Padded Flat Rate Envelope",
    description: "Flat Rate-branded Padded Envelope only",
    predefined_package: "FlatRatePaddedEnvelope",
  },
  {
    id: 9,
    image: `${ICON_URL_PREFIX}/ExpressFlatRateEnvelope.png`,
    name: "USPS Priority Mail Express Flat Rate Envelope",
    description: "Express-branded non-padded only",
    predefined_package: "ExpressFlatRateEnvelope",
  },
  {
    id: 10,
    image: `${ICON_URL_PREFIX}/ExpressFlatRateLegalEnvelope.png`,
    name: "USPS Priority Mail Express Legal Flat Rate Envelope",
    description: "Express-branded only",
    predefined_package: "ExpressFlatRateLegalEnvelope",
  },
  {
    id: 11,
    image: `${ICON_URL_PREFIX}/ExpressFlatRatePaddedEnvelope.png`,
    name: "USPS Priority Mail Express Padded Flat Rate Envelope",
    description: "Express-branded only",
    predefined_package: "ExpressFlatRatePaddedEnvelope",
  },
  {
    id: 12,
    image: `${ICON_URL_PREFIX}/UPSExpressEnvelop.png`,
    name: "UPS Express Envelope",
    description: "UPS-branded Envelope for letter-sized documents",
    predefined_package: "UPSExpressEnvelop",
  },
  {
    id: 13,
    image: `${ICON_URL_PREFIX}/UPSSmallExpressBox.png`,
    name: "UPS Small Express Box",
    description: "UPS-branded box for small-sized shipments",
    predefined_package: "SmallExpressBox",
  },
  {
    id: 14,
    image: `${ICON_URL_PREFIX}/UPSMediumExpressBox.png`,
    name: "UPS Medium Express Box",
    description: "UPS-branded box for medium-sized shipments",
    predefined_package: "MediumExpressBox",
  },
  {
    id: 15,
    image: `${ICON_URL_PREFIX}/UPSLargeExpressBox.png`,
    name: "UPS Large Express Box",
    description: "UPS-branded box for large-sized shipments",
    predefined_package: "LargeExpressBox",
  },
  {
    id: 16,
    image: `${ICON_URL_PREFIX}/UPSExpressTube.png`,
    name: "UPS Express Tube",
    description:
      "UPS-branded triangular box for rolled documents (blueprints, posters, etc.)",
    predefined_package: "Tube",
  },
  {
    id: 17,
    image: `${ICON_URL_PREFIX}/UPSExpressPak.png`,
    name: "UPS Express Pak",
    description: "UPS-branded poly envelope",
    predefined_package: "Pak",
  },
];

export const MAX_GIRTH_LENGTH = 165;
export const MAX_WEIGHT = 150;

export const MIN_LENGTH = 6;
export const MIN_WIDTH = 3;
export const MIN_HEIGHT = 0.25;
