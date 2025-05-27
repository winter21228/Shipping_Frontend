import { useState } from "react";

export default function PackageTypeSelector({
  loading,
  selectedPacketType,
  setSelectedPacketType,
  PackageTypes,
  packageTypeRef,
}) {
  const [openPackageType, setOpenPackageType] = useState(false);
  const PackageTypeItem = (item) => (
    <div className="flex flex-row items-center gap-5 hover:bg-sky-50">
      <img src={item.image} alt={item.name} className="w-32 h-32" />
      <div className="flex flex-col text-sm leading-4 text-gray-500">
        <span className="text-black text-lg">{item.name}</span>
        <span>{item.description}</span>
      </div>
    </div>
  );

  const onChangePacketType = (item) => {
    setSelectedPacketType(item);
    setOpenPackageType(false);
  };

  return (
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
          }`}
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
              {PackageTypes.filter((s) => s.id !== selectedPacketType?.id).map(
                (s, idx) => (
                  <div
                    key={s.name + idx}
                    className={`pl-3 pr-10 py-3 cursor-pointer border hover:bg-blue-50 transition-colors`}
                    onClick={() => {
                      onChangePacketType(s);
                    }}
                  >
                    {PackageTypeItem(s)}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
