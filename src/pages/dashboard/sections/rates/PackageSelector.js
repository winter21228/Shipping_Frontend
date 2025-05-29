import { useEffect, useRef, useState } from "react";
import {
  formatWeight,
  toWeightObject,
} from "../../../../utils/methods/formatWeight";
import { formatCurrencyNoFractionDigits } from "../../../../utils/methods/formatCurrency";

export default function PackageSelectorComponent({
  loading,
  selected,
  setSelected,
  packages,
}) {
  const packageRef = useRef(null);
  const [openPackageList, setOpenPackageList] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (packageRef.current && !packageRef.current.contains(event.target)) {
        setOpenPackageList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const PackageItem = (item) => {
    const {
      insurance,
      isIncludeCustomsInfo,
      isIncludeInsurance,
      packageType,
      parcel,
    } = item;
    return (
      <div className="flex flex-col gap-1">
        <span className="text-xl">
          {packageType?.title}
          {packageType?.dimensionsRequired &&
            `, ${parcel?.length}x${parcel?.width}${
              packageType.heightRequired ? `x${parcel?.height}` : ""
            }`}
          {parcel?.weight &&
            ` - ${formatWeight(toWeightObject(parseFloat(parcel?.weight)))}`}
        </span>
        <div className="flex flex-col text-sm leading-4 text-gray-500">
          <span>
            {packageType?.dimensionsRequired &&
              `${parcel?.length}x${parcel?.width}${
                packageType.heightRequired ? `x${parcel?.height}` : ""
              }"`}
            {parcel?.weight &&
              `${formatWeight(toWeightObject(parseFloat(parcel?.weight)))} - `}
            {isIncludeInsurance &&
              `Insured Value: ${formatCurrencyNoFractionDigits(insurance)} - `}
            {isIncludeCustomsInfo && "Customs Form"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <label className="block font-semibold mb-2">Package Details</label>
      {loading ? (
        <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
          <div className="flex h-28 bg-gray-200 rounded w-full" />
        </div>
      ) : (
        <div ref={packageRef}>
          <div
            className={`flex flex-col rounded-md  border-2 ${
              openPackageList ? "border-sky-500" : "border-gray-300"
            }`}
          >
            <button
              type="button"
              className={`relative w-full pl-3 pr-10 py-3 rounded-sm text-left outline-none bg-[linear-gradient(to_bottom,_#fff_24%,_#eee_100%)]`}
              onClick={() => setOpenPackageList((o) => !o)}
            >
              {selected === "Create" ? (
                <div className="flex flex-col gap-1">
                  <span className="text-xl">Don't use Saved Package</span>
                  <span className="text-sm text-gray-500">
                    Enter package details manually
                  </span>
                </div>
              ) : selected ? (
                PackageItem(selected)
              ) : null}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    d={openPackageList ? "M7 14l5-5 5 5" : "M7 10l5 5 5-5"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            {packages?.length > 0 && openPackageList && (
              <div className="w-full bg-white border border-sky-200 shadow-lg max-h-60 overflow-auto">
                {packages
                  .filter((s) => s.id !== selected?.id)
                  .map((s) => (
                    <div
                      key={s.id}
                      className={`pl-3 pr-10 py-3 cursor-pointer hover:bg-blue-50 transition-colors`}
                      onClick={() => {
                        setSelected(s);
                        setOpenPackageList(false);
                      }}
                    >
                      {PackageItem(s)}
                    </div>
                  ))}
                {selected !== "Create" && (
                  <div
                    className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors border-t"
                    onClick={() => {
                      setSelected("Create");
                      setOpenPackageList(false);
                    }}
                  >
                    <div className="text-xl">Don't use Saved Packages</div>
                    <div className="text-sm text-gray-400">
                      Enter package details manually
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
