import { Input } from "../../../../components/ui/input";
import { useEffect, useRef, useState } from "react";
import { STATES } from "../../../../utils/constant";
import { Select } from "../../../../components/ui/select";

export default function ShipFromAddressSubformComponent({
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
    <div>
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
              className={`relative w-full pl-3 pr-10 py-3 rounded-sm text-left outline-none bg-[linear-gradient(to_bottom,_#fff_24%,_#eee_100%)]`}
              onClick={() => setOpenShippingAddress((o) => !o)}
            >
              {selected === "Create" ? (
                <div className="flex flex-col gap-1">
                  <span className="text-xl">
                    Don't use saved Ship From Address
                  </span>
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
                    <div className="text-xl">
                      Don't use saved Ship From Address
                    </div>
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
              <label
                htmlFor="includeRubberStamp"
                className="text-xs text-grey60"
              >
                <span className="text-md text-black">Physical Address</span>{" "}
                Enter the physical home, office, or warehouse address you‘re
                shipping from.
              </label>
              <div className="grid grid-cols-2 gap-6">
                <Input
                  id="shipFromFullName"
                  placeholder="Full Personal Name (Optional)"
                  {...register("shipFromFullName")}
                  className={"h-12 text-base"}
                  error={errors.shipFromFullName}
                  autoComplete="shipFromFullName"
                />
                <Input
                  id="shipFromCompany"
                  placeholder="Company (optional)"
                  {...register("shipFromCompany")}
                  className={"h-12 text-base"}
                  error={errors.shipFromCompany}
                  autoComplete="shipFromCompany"
                />
                <Input
                  id="shipFromAddress1"
                  placeholder="Address"
                  {...register("shipFromAddress1")}
                  className={"h-12 text-base"}
                  error={errors.shipFromAddress1}
                  autoComplete="shipFromAddress1"
                />
                <Input
                  id="shipFromAddress2"
                  placeholder="Apt / Unit / Suite / etc. (optional)"
                  {...register("shipFromAddress2")}
                  className={"h-12 text-base"}
                  error={errors.shipFromAddress2}
                  autoComplete="shipFromAddress2"
                />
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    id="shipFromCity"
                    placeholder="City"
                    {...register("shipFromCity")}
                    className={"h-12 text-base"}
                    error={errors.shipFromCity}
                    autoComplete="shipFromCity"
                  />
                  <Select
                    id="shipFromState"
                    placeholder="State"
                    values={STATES}
                    {...register("shipFromState")}
                    className={"h-12 text-base"}
                    error={errors.shipFromState}
                    autoComplete="shipFromState"
                  />
                  <Input
                    id="shipFromZipCode"
                    placeholder="ZipCode"
                    {...register("shipFromZipCode")}
                    className={"h-12 text-base"}
                    error={errors.shipFromZipCode}
                    autoComplete="shipFromZipCode"
                  />
                </div>
                <Input
                  id="shipFromPhone"
                  placeholder="Phone"
                  {...register("shipFromPhone")}
                  className={"h-12 text-base"}
                  error={errors.shipFromPhone}
                  autoComplete="shipFromPhone"
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
                <div className="pt-4">
                  <label className="text-xs text-grey60">
                    <span className="text-md text-black">
                      Return Address (optional)
                    </span>{" "}
                    Enter the address you'd like printed on your shipping
                    labels.
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      id="returnFullName"
                      placeholder="Full Personal Name (Optional)"
                      {...register("returnFullName")}
                      className={"h-12 text-base"}
                      error={errors.returnFullName}
                      autoComplete="returnFullName"
                    />
                    <Input
                      id="returnCompany"
                      placeholder="Company (optional)"
                      {...register("returnCompany")}
                      className={"h-12 text-base"}
                      error={errors.returnCompany}
                      autoComplete="returnCompany"
                    />
                    <Input
                      id="returnAddress1"
                      placeholder="Address"
                      {...register("returnAddress1")}
                      className={"h-12 text-base"}
                      error={errors.returnAddress1}
                      autoComplete="returnAddress1"
                    />
                    <Input
                      id="returnAddress2"
                      placeholder="Apt / Unit / Suite / etc. (optional)"
                      {...register("returnAddress2")}
                      className={"h-12 text-base"}
                      error={errors.returnAddress2}
                      autoComplete="returnAddress2"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        id="returnCity"
                        placeholder="City"
                        {...register("returnCity")}
                        className={"h-12 text-base"}
                        error={errors.returnCity}
                        autoComplete="returnCity"
                      />
                      <Select
                        id="returnState"
                        placeholder="State"
                        values={STATES}
                        {...register("returnState")}
                        className={"h-12 text-base"}
                        error={errors.returnState}
                        autoComplete="returnState"
                      />
                      <Input
                        id="returnZipCode"
                        placeholder="ZipCode"
                        {...register("returnZipCode")}
                        className={"h-12 text-base"}
                        error={errors.returnZipCode}
                        autoComplete="returnZipCode"
                      />
                    </div>
                    <Input
                      id="returnPhone"
                      placeholder="Phone"
                      {...register("returnPhone")}
                      className={"h-12 text-base"}
                      error={errors.returnPhone}
                      autoComplete="returnPhone"
                    />
                  </div>
                </div>
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
