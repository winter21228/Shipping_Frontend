export const PACKET_TYPES_DATA = {
  carriers: [
    {
      id: "1",
      carrierKey: "usps",
      packageTypes: [
        {
          id: "1",
          packageTypeKey: "Parcel",
          title: "Box or Rigid Packaging",
          description: "Any custom box or thick parcel",
          heightRequired: true,
          weightRequired: true,
          dimensionsRequired: true,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": {
              domestic: {
                maxLengthPlusGirth: 130,
              },
              international: {
                maxCombinedLength: 36,
              },
            },
            weight: {
              domestic: {
                maxWeight: 1120,
              },
              international: {
                maxWeight: 1120,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "2",
          packageTypeKey: "SoftPack",
          title:
            "Envelope, Padded Envelope, Poly Bag, Soft Pack, or Box in a Bag",
          description:
            "Measure & use the Length and Width of the Envelope before putting anything in it",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: true,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 2400,
              },
              international: {
                maxWeight: 2400,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "3",
          packageTypeKey: "SmallFlatRateBox",
          title: "USPS Priority Mail Small Flat Rate Box",
          description: "Small Flat Rate Mailing Box only",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 1120,
              },
              international: {
                maxWeight: 1120,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "4",
          packageTypeKey: "MediumFlatRateBox",
          title: "USPS Priority Mail Medium Flat Rate Box",
          description:
            "Any Medium Flat Rate Box, including 1 (Top-Loading) and 2 (Side-Loading)",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 1120,
              },
              international: {
                maxWeight: 1120,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "5",
          packageTypeKey: "LargeFlatRateBox",
          title: "USPS Priority Mail Large Flat Rate Box",
          description:
            "Any Large Flat Rate Box, including APO/FPO or Board Game Flat Rate Boxes",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 1120,
              },
              international: {
                maxWeight: 1120,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "6",
          packageTypeKey: "FlatRateEnvelope",
          title: "USPS Priority Mail Flat Rate Envelope",
          description:
            "Non-padded Flat Rate Envelope including Small and Window",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 1120,
              },
              international: {
                maxWeight: 64,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "7",
          packageTypeKey: "FlatRateLegalEnvelope",
          title: "USPS Priority Mail Legal Flat Rate Envelope",
          description: "Priority Mail Legal Flat Rate Envelope",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 1120,
              },
              international: {
                maxWeight: 64,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "8",
          packageTypeKey: "FlatRatePaddedEnvelope",
          title: "USPS Priority Mail Padded Flat Rate Envelope",
          description: "Flat Rate-branded Padded Envelope only",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 1120,
              },
              international: {
                maxWeight: 64,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "23",
          packageTypeKey: "ExpressFlatRateEnvelope",
          title: "USPS Priority Mail Express Flat Rate Envelope",
          description: "Express-branded non-padded only",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 2400,
              },
              international: {
                maxWeight: 2400,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "24",
          packageTypeKey: "ExpressFlatRateLegalEnvelope",
          title: "USPS Priority Mail Express Legal Flat Rate Envelope",
          description: "Express-branded only",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 2400,
              },
              international: {
                maxWeight: 2400,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "25",
          packageTypeKey: "ExpressFlatRatePaddedEnvelope",
          title: "USPS Priority Mail Express Padded Flat Rate Envelope",
          description: "Express-branded only",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 2400,
              },
              international: {
                maxWeight: 2400,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
      ],
      __typename: "Carrier",
    },
    {
      id: "2",
      carrierKey: "ups",
      packageTypes: [
        {
          id: "17",
          packageTypeKey: "01",
          title: "UPS Express Envelope",
          description: "UPS-branded Envelope for letter-sized documents",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 2400,
              },
              international: {
                maxWeight: 2400,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "18",
          packageTypeKey: "2a",
          title: "UPS Small Express Box",
          description: "UPS-branded box for small-sized shipments",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 2400,
              },
              international: {
                maxWeight: 2400,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "19",
          packageTypeKey: "2b",
          title: "UPS Medium Express Box",
          description: "UPS-branded box for medium-sized shipments",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 2400,
              },
              international: {
                maxWeight: 2400,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "20",
          packageTypeKey: "2c",
          title: "UPS Large Express Box",
          description: "UPS-branded box for large-sized shipments",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 30,
              },
              international: {
                maxWeight: 30,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "21",
          packageTypeKey: "03",
          title: "UPS Express Tube",
          description:
            "UPS-branded triangular box for rolled documents (blueprints, posters, etc.)",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 2400,
              },
              international: {
                maxWeight: 2400,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
        {
          id: "22",
          packageTypeKey: "04",
          title: "UPS Express Pak",
          description: "UPS-branded poly envelope",
          heightRequired: false,
          weightRequired: true,
          dimensionsRequired: false,
          limitConfig: {
            "2d": { domestic: {}, international: {} },
            "3d": { domestic: {}, international: {} },
            weight: {
              domestic: {
                maxWeight: 2400,
              },
              international: {
                maxWeight: 2400,
              },
            },
          },
          __typename: "CarrierPackageType",
        },
      ],
      __typename: "Carrier",
    },
  ],
  company: {
    id: "4983346",
    activeCarriers: ["usps", "ups"],
    __typename: "Company",
  },
};
