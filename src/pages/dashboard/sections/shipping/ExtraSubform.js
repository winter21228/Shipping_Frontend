import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { PackageContentTypes } from "../../../../utils/constant";
import { Select } from "../../../../components/ui/select";
import { COUNTRIES } from "../../../../utils/countries";

export default function ExtraSubformComponent({
  isIncludeInsurance,
  setIsIncludeInsurance,
  isIncludeCustomsInfo,
  setIsIncludeCustomsInfo,
  isSavePackage,
  setIsSavePackage,
  packageContentType,
  setPackageContentType,
  register,
  errors,
  control,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customsInfo.customLineItems",
  });

  const [openPackageContentType, setOpenPackageContentType] = useState(false);

  const renderItem = (item) => (
    <div className="flex flex-col gap-2 text-sm leading-4 text-gray-500">
      <span className="text-black text-lg">{item.title}</span>
      <span>{item.description}</span>
    </div>
  );

  const onChangePackageContentType = (item) => {
    setPackageContentType(item);
    setOpenPackageContentType(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isIncludeInsurance"
            checked={isIncludeInsurance}
            onChange={(e) => setIsIncludeInsurance(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isIncludeInsurance" className="text-xs text-grey60">
            <span className="text-md text-black">Insurance</span> Enter the
            total value of your shipment to add coverage by InsureShield
          </label>
        </div>
        {isIncludeInsurance && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Input
              id="insurance"
              name="insurance"
              placeholder="Declared Package Value($)"
              {...register("insurance")}
              className={"h-12 text-base"}
              error={errors.insurance}
              autoComplete="insurance"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isIncludeCustomsInfo"
            checked={isIncludeCustomsInfo}
            onChange={(e) => setIsIncludeCustomsInfo(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isIncludeCustomsInfo" className="text-xs text-grey60">
            <span className="text-md text-black">Customs Form</span> Required
            for International, Military APO/FPO, and U.S. Territories
          </label>
        </div>
        {isIncludeCustomsInfo && (
          <div className="flex flex-col gap-4">
            <div>
              <Input
                id="customsInfo.signer"
                placeholder="Sign Customs From As"
                {...register("customsInfo.signer")}
                className="shadow-sm text-sm h-12"
                error={errors?.customsInfo?.signer}
                autoComplete="customsInfo.signer"
              />
            </div>
            <div>
              <span className="text-sm">Package Content Type</span>
              <div
                className={`flex flex-col rounded-md border-2 overflow-hidden ${
                  openPackageContentType ? "border-sky-500" : "border-gray-300"
                }`}
              >
                <button
                  type="button"
                  className={`relative w-full pl-3 pr-10 py-3 rounded-sm text-left outline-none bg-[linear-gradient(to_bottom,_#fff_24%,_#eee_100%)]`}
                  onClick={() => setOpenPackageContentType((o) => !o)}
                >
                  {packageContentType && renderItem(packageContentType)}
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path
                        d={
                          openPackageContentType
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
                {openPackageContentType && (
                  <div className="w-full bg-white border border-sky-200 shadow-lg max-h-80 overflow-auto">
                    {PackageContentTypes?.filter(
                      (s) => s.id !== packageContentType?.id
                    ).map((s, idx) => (
                      <div
                        key={s.id + idx}
                        className={`pl-3 pr-10 py-3 cursor-pointer border hover:bg-sky-50 transition-colors`}
                        onClick={() => {
                          onChangePackageContentType(s);
                        }}
                      >
                        {renderItem(s)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {fields.map((item, index) => (
                <div key={index}>
                  <div className="text-sm">
                    Customs Line Item #{index + 1}
                    <button
                      type="button"
                      className="text-xs text-sky-500"
                      onClick={() =>
                        append({
                          description: "",
                          hs_tariff_number: "",
                          origin_country: "US",
                          quantity: "",
                          value: "",
                          weight_pounds: "",
                          weight_ounces: "",
                        })
                      }
                    >
                      {" "}
                      Add Line Item
                    </button>
                  </div>
                  <div className="flex flex-row items-start gap-4">
                    <div className="grid grid-cols-1 gap-4 w-full">
                      <Input
                        id={`customsInfo.customLineItems.${index}.description`}
                        placeholder="Describe what you're shipping"
                        {...register(
                          `customsInfo.customLineItems.${index}.description`
                        )}
                        className="shadow-sm text-sm h-12"
                        error={
                          errors?.customsInfo?.customLineItems[index]
                            ?.description
                        }
                        autoComplete={`customsInfo.customLineItems.${index}.description`}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          id={`customsInfo.customLineItems.${index}.quantity`}
                          placeholder="Quantity"
                          {...register(
                            `customsInfo.customLineItems.${index}.quantity`
                          )}
                          className="shadow-sm text-sm h-12"
                          error={
                            errors?.customsInfo?.customLineItems[index]
                              ?.quantity
                          }
                          autoComplete={`customsInfo.customLineItems.${index}.description`}
                        />
                        <Input
                          id={`customsInfo.customLineItems.${index}.value`}
                          placeholder="Item(s) Total Value in USD $"
                          {...register(
                            `customsInfo.customLineItems.${index}.value`
                          )}
                          className="shadow-sm text-sm h-12"
                          error={
                            errors?.customsInfo?.customLineItems[index]?.value
                          }
                          autoComplete={`customsInfo.customLineItems.${index}.value`}
                        />
                      </div>
                      <div className="flex flex-row items-start justify-start gap-6">
                        <Input
                          id={`customsInfo.customLineItems.${index}.weight_pounds`}
                          placeholder="Item(s) Total Weight Pounds"
                          {...register(
                            `customsInfo.customLineItems.${index}.weight_pounds`
                          )}
                          className="shadow-sm text-sm h-12"
                          error={
                            errors?.customsInfo?.customLineItems[index]
                              ?.weight_pounds
                          }
                          autoComplete={`customsInfo.customLineItems.${index}.weight_pounds`}
                        />
                        <div className="h-12 flex flex-row items-center">
                          <span className="text-gray-400 font-bold">+</span>
                        </div>
                        <Input
                          id={`customsInfo.customLineItems.${index}.weight_ounces`}
                          placeholder="Item(s) Total Weight Ounces"
                          {...register(
                            `customsInfo.customLineItems.${index}.weight_ounces`
                          )}
                          className="shadow-sm text-sm h-12"
                          error={
                            errors?.customsInfo?.customLineItems[index]
                              ?.weight_pounds
                          }
                          autoComplete={`customsInfo.customLineItems.${index}.weight_ounces`}
                        />
                      </div>
                      <div className="flex flex-row items-center justify-start gap-4">
                        <div className="flex flex-col items-center justify-center w-full">
                          <div className="flex flex-row w-full">
                            <Input
                              id={`customsInfo.customLineItems.${index}.hs_tariff_number`}
                              placeholder="Harmonization #"
                              {...register(
                                `customsInfo.customLineItems.${index}.hs_tariff_number`
                              )}
                              className="shadow-sm text-sm h-12"
                              error={
                                errors?.customsInfo?.customLineItems[index]
                                  ?.hs_tariff_number
                              }
                              autoComplete={`customsInfo.customLineItems.${index}.hs_tariff_number`}
                            />
                            <a
                              href="https://uscensus.prod.3ceonline.com/ui"
                              target="_blank"
                              rel="noreferrer"
                              className="bg-sky-500 text-center text-white rounded-md text-nowrap px-4 items-center flex"
                            >
                              Search #'s
                            </a>
                          </div>
                          <span className="text-xs text-grey50">
                            Required for Certain Countries
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                          <Select
                            id={`customsInfo.customLineItems.${index}.origin_country`}
                            placeholder="Country"
                            values={COUNTRIES}
                            {...register(
                              `customsInfo.customLineItems.${index}.origin_country`
                            )}
                            className={"h-12 text-base"}
                            error={
                              errors?.customsInfo?.customLineItems[index]
                                ?.origin_country
                            }
                            autoComplete={`customsInfo.customLineItems.${index}.origin_country`}
                          />
                          <span className="text-xs text-grey50">
                            Item(s) Origin
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (index) {
                          remove(index);
                        }
                      }}
                      className="p-2 text-grey50"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isSavePackage"
            checked={isSavePackage}
            onChange={(e) => setIsSavePackage(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isSavePackage" className="text-xs text-grey60">
            <span className="text-md text-black">Save Package</span> Save your
            settings for repeated use
          </label>
        </div>
        {isSavePackage && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Input
              id="packageNickName"
              name="packageNickName"
              placeholder="Enter a nickname for your Saved Package"
              {...register("packageNickName")}
              className={"h-12 text-base"}
              error={errors.packageNickName}
              autoComplete="packageNickName"
            />
          </div>
        )}
      </div>
    </div>
  );
}
