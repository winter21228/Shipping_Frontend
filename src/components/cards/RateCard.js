import { CARRIER_LOGO_PREFIX } from "../../utils/constant";
import { getDeliveryDateFormat } from "../../utils/methods/formatMethods";

export default function ShippingRateCard({ rateData, onShipNow }) {
  const {
    service,
    rate,
    carrier,
    retail_rate,
    delivery_date,
    discount_rate,
    tags,
  } = rateData;
  return (
    <div className="border rounded-lg shadow-sm bg-white">
      <div className="flex items-start gap-3 p-4">
        {/* <img src={carrierLogo} alt="Carrier" className="w-10 h-10 mt-1" /> */}
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <img
                src={`${CARRIER_LOGO_PREFIX}/${carrier}.png`}
                alt="Carrier"
                className="h-5"
              />
              <span className="text-md leading-5 font-bold">{service}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              {tags.indexOf("cheapest") > -1 && (
                <span className="bg-green text-white px-2 py-0.5 rounded font-bold">
                  CHEAPEST
                </span>
              )}
              {tags.indexOf("fastest") > -1 && (
                <span className="bg-sky-600 text-white px-2 py-0.5 rounded font-bold">
                  FASTEST
                </span>
              )}
              <span className="py-0.5">
                Zone 5, Instant Access, Deep Discounts
              </span>
            </div>
          </div>
          <div className="font-bold text-base mt-2">{`Estimated delivery ${getDeliveryDateFormat(
            delivery_date
          )} if shipped today`}</div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-green-100 px-4 py-3 border-t">
        <div>
          {!!discount_rate && (
            <div className="text-green-700 font-bold text-lg">
              Save {parseInt(discount_rate)}%
            </div>
          )}
          {!!retail_rate && (
            <div className="text-gray-400 line-through text-sm">
              ${retail_rate.toFixed(2)} retail
            </div>
          )}
        </div>
        <div className="text-3xl font-extrabold text-gray-800">
          ${rate.toFixed(2)}
        </div>
      </div>
      <div className="flex items-center justify-end px-4 py-3">
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-5 py-2 rounded transition"
          onClick={() => {
            onShipNow();
          }}
        >
          Ship now
        </button>
      </div>
    </div>
  );
}
