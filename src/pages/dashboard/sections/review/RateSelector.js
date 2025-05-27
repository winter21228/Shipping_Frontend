import React, { useEffect, useRef, useState } from "react";
import { getDeliveryDateFormat } from "../../../../utils/methods/formatMethods";
import { CARRIER_LOGO_PREFIX } from "../../../../utils/constant";

function RateSelector({ rates, selectedRate, setSelectedRate }) {
  const rateRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (rateRef.current && !rateRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const RateItem = (item) => {
    const {
      service,
      rate,
      retail_rate,
      delivery_date,
      discount_rate,
      tags,
      carrier,
    } = item;
    return (
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-row items-center gap-2">
            <img
              src={`${CARRIER_LOGO_PREFIX}/${carrier}.png`}
              alt="Carrier"
              className="h-5"
            />
            <span className="text-md leading-5">{service}</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            {tags.indexOf("cheapest") > -1 && (
              <span className="bg-green text-white px-2 py-0.5 rounded text-sm leading-4 font-bold">
                CHEAPEST
              </span>
            )}
            {tags.indexOf("fastest") > -1 && (
              <span className="bg-sky-600 text-white px-2 py-1 rounded text-sm leading-4 font-bold">
                FASTEST
              </span>
            )}
            <span className="font-regular text-sm leading-6 text-gray-400">{`Estimated delivery ${getDeliveryDateFormat(
              delivery_date
            )} if shipped today`}</span>
          </div>
          {!!discount_rate && (
            <span className="font-regular text-sm leading-6 text-gray-400">{`Save ${parseInt(
              discount_rate
            )}% • Deepest discount available`}</span>
          )}
        </div>
        <div className="flex flex-col items-center justify-between">
          {!!retail_rate && (
            <span className="text-gray-400 line-through text-sm leading-4">
              ${retail_rate.toFixed(2)} retail
            </span>
          )}
          <span className="text-xxl leading-8 font-extrabold text-gray-800">
            ${rate.toFixed(2)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <span className="font-medium text-md leading-5 text-gray-700">
        Choose a Service
      </span>
      <div
        className={`flex flex-col rounded-md border-2 overflow-hidden ${
          open ? "border-sky-500" : "border-gray-300"
        }`}
        ref={rateRef}
      >
        <button
          type="button"
          className={`relative w-full pl-3 pr-10 py-3 rounded-sm text-left outline-none bg-[linear-gradient(to_bottom,_#fff_24%,_#eee_100%)]`}
          onClick={() => setOpen((o) => !o)}
        >
          {selectedRate && RateItem(selectedRate)}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path
                d={open ? "M7 14l5-5 5 5" : "M7 10l5 5 5-5"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        {open && (
          <div className="w-full bg-white border border-sky-200 shadow-lg max-h-80 overflow-auto">
            {rates
              ?.filter((s) => s.id !== selectedRate?.id)
              .map((s) => (
                <div
                  key={s.id}
                  className={`pl-3 pr-10 py-3 cursor-pointer border hover:bg-sky-50 transition-colors`}
                  onClick={() => {
                    setSelectedRate(s);
                    setOpen(false);
                  }}
                >
                  {RateItem(s)}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RateSelector;
