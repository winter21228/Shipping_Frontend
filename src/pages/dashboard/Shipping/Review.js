import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getShipment } from "../../../redux/slices/user";
import RecipientDetail from "../sections/review/RecipientDetail";
import RateSelector from "../sections/review/RateSelector";
import { formatCurrency } from "../../../utils/methods/formatCurrency";
import { PATH_DASHBOARD } from "../../../routes/paths";

function ShippingReviewPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedRate, setSelectedRate] = React.useState(null);
  const { shipment, rates } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getShipment(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (rates && rates.length > 0) {
      setSelectedRate(rates[0]);
    }
  }, [rates]);

  const onPreviousStep = () => {
    localStorage.setItem("currentShipmentId", id);
    navigate(PATH_DASHBOARD.singleShipping);
  };
  const onCancel = () => {
    // Logic to cancel and delete the label
  };

  return (
    <div className="p-8">
      {shipment ? (
        <div className="flex flex-col gap-8">
          <RecipientDetail
            shipFromAddress={shipment?.shipFromAddress}
            recipient={shipment?.shipToAddress}
            packageData={shipment?.package}
            rubberStamp={shipment?.rubberStamp}
          />
          <RateSelector
            rates={rates}
            selectedRate={selectedRate}
            setSelectedRate={setSelectedRate}
          />
          <div>
            <span className="font-medium text-md leading-5 text-gray-700">
              Finish Purchase
            </span>
            <div className="flex flex-row items-center justify-between p-2 w-full border-2 border-gray-300 font-medium rounded-sm text-left outline-none bg-[linear-gradient(to_bottom,_#fff_24%,_#eee_100%)]">
              <span>Total Cost</span>
              <span>{formatCurrency(parseFloat(selectedRate?.rate))}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span
                className="text-sm leading-4 underline underline-offset-1 text-sky-600 cursor-pointer"
                onClick={() => {
                  onPreviousStep();
                }}
              >
                Previous Step
              </span>
              <span
                className="text-sm leading-4 underline underline-offset-1 text-red cursor-pointer"
                onClick={() => {
                  onCancel();
                }}
              >
                Cancel & Delete Label
              </span>
            </div>
            <button
              type="submit"
              className="bg-green hover:bg-greenButtonAccent text-white font-bold text-xxl px-20 py-8 rounded-lg shadow-lg disabled:bg-gray-500"
            >
              Buy Label
            </button>
          </div>
        </div>
      ) : (
        <p>Loading shipment details...</p>
      )}
    </div>
  );
}

export default ShippingReviewPage;
