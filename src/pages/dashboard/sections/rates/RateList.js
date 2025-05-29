import ShippingRateCard from "../../../../components/cards/RateCard";

export default function RateList({ isLoading, rateList, onShipNow }) {
  if (isLoading || !rateList || rateList.length === 0) return null;
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 mt-6 gap-4">
      {rateList.map((item, idx) => (
        <ShippingRateCard key={idx} rateData={item} onShipNow={onShipNow} />
      ))}
    </div>
  );
}
