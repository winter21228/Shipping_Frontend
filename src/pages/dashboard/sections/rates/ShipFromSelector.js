import { Input } from "../../../../components/ui/input";
import { useEffect, useRef, useState } from "react";
import { STATES } from "../../../../utils/constant";
import { Select } from "../../../../components/ui/select";

export default function ShipFromSelector({
  loading,
  selected,
  setSelected,
  shippingAddress = [],
  isSameAddress,
  onChangeIsSameAddress,
  isSaveAddress,
  onChangeIsSaveAddress,
  register,
  errors,
}) {
  const shipFromRef = useRef(null);
  const [openShippingAddress, setOpenShippingAddress] = useState(false);

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
    const {
      fullName,
      nickName,
      addressline1,
      city,
      state,
      zipCode,
      return_fullName,
      return_addressline1,
      return_city,
      return_state,
      return_zipCode,
    } = item;
    return (
      <div className="flex flex-col gap-1">
        <span className="text-xl">{nickName ? nickName : fullName}</span>
        <div className="flex flex-col text-sm leading-4 text-gray-500">
          <span>
            <strong>Physical Address: </strong>
            {fullName}, {addressline1}, {city} {state} {zipCode}
          </span>
          <span>
            <strong>Return Address: </strong>
            {return_fullName}, {return_addressline1}, {return_city}{" "}
            {return_state} {return_zipCode}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">Ship From</label>
      {loading ? (
        <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
          <div className="flex h-28 bg-gray-200 rounded w-full" />
        </div>
      ) : (
        <div ref={shipFromRef}>
          <div
            className={`flex flex-col rounded-md overflow-hidden border-2 ${
              openShippingAddress ? "border-sky-500" : "border-gray-300"
            } ${selected === "Create" ? "border-b-0 rounded-b-none" : ""}`}
          >
            <button
              type="button"
              className={`relative w-full pl-3 pr-10 py-3 rounded-sm text-left outline-none`}
              onClick={() => setOpenShippingAddress((o) => !o)}
            >
              {selected === "Create" ? (
                <div className="flex flex-col gap-1">
                  <span className="text-xl">Create New Ship From Address</span>
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
                    d={openShippingAddress ? "M7 14l5-5 5 5" : "M7 10l5 5 5-5"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            {shippingAddress.length > 0 && openShippingAddress && (
              <div className="w-full bg-white border border-sky-200 shadow-lg max-h-60 overflow-auto">
                {shippingAddress
                  .filter((s) => s.id !== selected?.id)
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
                    <div className="text-xl">Create New Ship From Address</div>
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
                  Enter the physical home, office, or warehouse address you‘re
                  shipping from.
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
                  <Select
                    id="state"
                    placeholder="State"
                    values={STATES}
                    {...register("state")}
                    optionStyle={"h-13 text-base"}
                    className={"max-w-80"}
                    error={errors.state}
                    autoComplete="state"
                  />
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
                  onChange={(e) => onChangeIsSameAddress(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="isSameAddress">
                  Use this address as the Return Address on my shipping labels
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
                      <Select
                        id="return_state"
                        placeholder="State"
                        values={STATES}
                        {...register("return_state")}
                        optionStyle={"h-13 text-base"}
                        className={"max-w-80"}
                        error={errors.return_state}
                        autoComplete="return_state"
                      />
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
                  onChange={(e) => onChangeIsSaveAddress(e.target.checked)}
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
        </div>
      )}
    </div>
  );
}
