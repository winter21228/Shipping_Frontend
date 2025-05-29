import { useRef, useState } from "react";
import { Input } from "../../../../components/ui/input";

import { PACKAGE_TYPE_ICON_PREFIX } from "../../../../utils/constant";

export default function PackageTypeSubformComponent({
  loading,
  setSelectedPacketType,
  selectedPacketType,
  packageTypes,
  register,
  errors,
}) {
  const packageTypeRef = useRef(null);
  const [openPackageType, setOpenPackageType] = useState(false);
  const PackageTypeItem = (item) => (
    <div className="flex flex-row items-center gap-5">
      <img
        src={`${PACKAGE_TYPE_ICON_PREFIX}/${item.packageTypeKey}.png`}
        alt={item.name}
        className="w-32 h-32"
      />
      <div className="flex flex-col gap-2 text-sm leading-4 text-gray-500">
        <span className="text-black text-lg">{item.title}</span>
        <span>{item.description}</span>
      </div>
    </div>
  );

  const onChangePacketType = (item) => {
    setSelectedPacketType(item);
    setOpenPackageType(false);
  };
  return (
    <div>
      <label className="block font-semibold mb-2">Type of Packaging</label>
      {loading ? (
        <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
          <div className="flex h-28 bg-gray-200 rounded w-full" />
        </div>
      ) : (
        <div
          className={`flex flex-col rounded-md border-2 overflow-hidden ${
            openPackageType ? "border-sky-500" : "border-gray-300"
          }`}
          ref={packageTypeRef}
        >
          <button
            type="button"
            className={`relative w-full pl-3 pr-10 py-3 rounded-sm text-left outline-none bg-[linear-gradient(to_bottom,_#fff_24%,_#eee_100%)]`}
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
              {packageTypes
                ?.filter(
                  (s) => s.packageTypeKey !== selectedPacketType?.packageTypeKey
                )
                .map((s, idx) => (
                  <div
                    key={s.packageTypeKey + idx}
                    className={`pl-3 pr-10 py-3 cursor-pointer border hover:bg-sky-50 transition-colors`}
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
      {selectedPacketType?.dimensionsRequired && (
        <div className="mt-6">
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
                  error={
                    errors.length ||
                    errors?.combined3D?.message ||
                    errors?.combined2D?.message
                  }
                  showError={
                    !(
                      errors?.combined3D?.message || errors?.combined2D?.message
                    )
                  }
                  autoComplete="length"
                />
                <div className="h-12 flex flex-row items-center">
                  <span className="text-gray-400 font-bold">×</span>
                </div>
                <Input
                  id="width"
                  placeholder="Width"
                  {...register("width")}
                  className="h-12 text-sm"
                  error={
                    errors.width ||
                    errors?.combined3D?.message ||
                    errors?.combined2D?.message
                  }
                  showError={
                    !(
                      errors?.combined3D?.message || errors?.combined2D?.message
                    )
                  }
                  autoComplete="width"
                />
                {selectedPacketType.heightRequired && (
                  <div className="h-12 flex flex-row items-center">
                    <span className="text-gray-400 font-bold">×</span>
                  </div>
                )}
                {selectedPacketType.heightRequired && (
                  <Input
                    id="height"
                    placeholder="Height"
                    {...register("height")}
                    className="h-12 text-sm"
                    error={
                      errors.height ||
                      errors?.combined3D?.message ||
                      errors?.combined2D?.message
                    }
                    showError={
                      !(
                        errors?.combined3D?.message ||
                        errors?.combined2D?.message
                      )
                    }
                    autoComplete="height"
                  />
                )}
              </div>
              {errors?.combined3D?.message &&
                !errors.length &&
                !errors.width &&
                !errors.height && (
                  <div className="text-xs mt-1 text-red text-end">
                    {errors?.combined3D?.message}
                  </div>
                )}
              {errors?.combined2D?.message &&
                !errors.length &&
                !errors.width &&
                !errors.height && (
                  <div className="text-xs mt-1 text-red text-end">
                    {errors?.combined2D?.message}
                  </div>
                )}
            </>
          )}
        </div>
      )}
      {selectedPacketType?.weightRequired && (
        <div className="mt-6">
          <label className="block font-semibold mb-2">
            Package Weight (Pound)
          </label>
          {loading ? (
            <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
              <div className="flex h-14 bg-gray-200 rounded w-full" />
            </div>
          ) : (
            <>
              <div className="flex flex-row items-start justify-start gap-4">
                <Input
                  id="pounds"
                  placeholder="Pounds"
                  {...register("pounds")}
                  className="shadow-sm text-sm h-12"
                  error={
                    errors.pounds ||
                    errors?.combinedWeight ||
                    errors?.combinedCustomsFormWeight
                  }
                  showError={
                    !(
                      errors?.combinedWeight ||
                      errors?.combinedCustomsFormWeight
                    )
                  }
                  autoComplete="pounds"
                />
                <div className="h-12 flex flex-row items-center">
                  <span className="text-gray-400 font-bold">+</span>
                </div>
                <Input
                  id="ounces"
                  placeholder="Ounces"
                  {...register("ounces")}
                  className="shadow-sm text-sm h-12"
                  error={
                    errors.ounces ||
                    errors?.combinedWeight ||
                    errors?.combinedCustomsFormWeight
                  }
                  showError={
                    !(
                      errors?.combinedWeight ||
                      errors?.combinedCustomsFormWeight
                    )
                  }
                  autoComplete="ounces"
                />
              </div>
              {errors?.combinedWeight?.message && !errors.pounds && (
                <div className="text-xs mt-1 text-red text-end">
                  {errors?.combinedWeight?.message}
                </div>
              )}
              {errors?.combinedCustomsFormWeight?.message &&
                !errors?.combinedWeight?.message &&
                !errors.pounds && (
                  <div className="text-xs mt-1 text-red text-end">
                    {errors?.combinedCustomsFormWeight?.message}
                  </div>
                )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
