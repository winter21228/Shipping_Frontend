import { FaRegCheckCircle } from "react-icons/fa";
import { getDeliveryDateFormat } from "../../utils/methods/formatMethods";

export default function ShippingRateCard({ rateData }) {
  const { service, rate, retail_rate, delivery_date, discount_rate, tags } =
    rateData;
  return (
    <div className="border rounded-lg shadow-sm bg-white">
      <div className="flex items-start gap-3 p-4">
        {/* <img src={carrierLogo} alt="Carrier" className="w-10 h-10 mt-1" /> */}
        <div className="flex-1">
          <div className="text-xl font-bold">{service}</div>
          <div className="flex items-center gap-2 mt-1 text-xs">
            {tags.indexOf("cheapest") > -1 && (
              <span className="bg-green-600 text-white px-2 py-0.5 rounded font-bold">
                CHEAPEST
              </span>
            )}
            {tags.indexOf("fastest") > -1 && (
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-bold">
                FASTEST
              </span>
            )}
            <span className="py-0.5">
              Zone 5, Instant Access, Deep Discounts
            </span>
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
      <div className="flex items-center justify-between px-4 py-3">
        <a href="#" className="text-blue-600 underline text-sm">
          Learn more & view rates
        </a>
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-5 py-2 rounded transition">
          Ship now
        </button>
      </div>
    </div>
  );
}
