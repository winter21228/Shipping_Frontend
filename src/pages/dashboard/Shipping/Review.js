import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { buyLabel, getShipment, setSuccess } from "../../../redux/slices/user";

import RecipientDetail from "../sections/review/RecipientDetail";
import RateSelector from "../sections/review/RateSelector";

import { formatCurrency } from "../../../utils/methods/formatCurrency";

import { PATH_DASHBOARD } from "../../../routes/paths";
import { STRIPE_PUBLISHABLE_KEY } from "../../../config-global";
import { Input } from "../../../components/ui/input";

function ShippingReview() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [selectedRate, setSelectedRate] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [downloadLinkModalOpen, setDownloadLinkModalOpen] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { shipment, rates, isLoading, isSuccess, downloadPDFLink } =
    useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getShipment(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (rates && rates.length > 0) {
      setSelectedRate(rates[0]);
    }
  }, [rates]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSuccess(false));
      handleConfirmModalOpen();
    }
  }, [isSuccess, dispatch]);

  const onPreviousStep = () => {
    localStorage.setItem("currentShipmentId", id);
    navigate(PATH_DASHBOARD.singleShipping);
  };

  const onCancel = () => {
    // Logic to cancel and delete the label
  };

  const handleBuyLabel = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmModalOpen = () => {
    setDownloadLinkModalOpen(true);
  };

  const handleConfirmModalClose = () => {
    setDownloadLinkModalOpen(false);
  };

  const handlePurchaseLabel = async () => {
    if (!cardholderName) {
      setError({ message: "Cardholder Name is required" });
      return;
    }
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: cardholderName,
        email: user?.email.toLowerCase(),
      },
    });

    if (error) {
      setError(error);
      return;
    }

    const data = {
      paymentMethod: paymentMethod,
      amount: selectedRate.rate,
      id: shipment?.id,
      shipmentId: shipment?.shipment_id,
      rateId: selectedRate.id,
      ...(shipment?.package?.isIncludeInsurance && {
        insurance: shipment?.package?.insurance,
      }),
    };
    dispatch(buyLabel(data));
    setModalOpen(false);
  };

  const handleFinish = () => {
    handleCloseModal();
    handleConfirmModalClose();
    navigate(PATH_DASHBOARD.ship);
  };

  return (
    <div className="p-8">
      <FullScreenModal open={modalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <h2 className="text-3xl font-bold mb-4">Add New Card</h2>
          <div className="w-full flex flex-col gap-1">
            <Input
              className="h-12 text-md"
              placeholder="Name on Card"
              value={cardholderName}
              error={error}
              onChange={(e) => {
                setError(null);
                setCardholderName(e.target.value);
              }}
            />

            <div className="w-full border-grey20 rounded-md border-solid border">
              <CardElement
                className="p-4 border-none text-gray-500 text-md"
                options={{
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                  hidePostalCode: true,
                }}
              />
            </div>
          </div>
          <button
            className="bg-green hover:bg-greenButtonAccent border-darkGreen text-white px-8 py-4 rounded-md text-2xl font-bold"
            onClick={handlePurchaseLabel}
          >
            Submit & Buy Label
          </button>
        </div>
      </FullScreenModal>
      <FullScreenModal
        open={downloadLinkModalOpen}
        onClose={handleConfirmModalClose}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 max-w-md">
          <h2 className="text-3xl font-bold mb-4">Purchase Completed!</h2>
          <div className="w-full flex flex-col gap-1">
            <span></span>
            <a
              href={downloadPDFLink}
              target="_blank"
              download={true}
              className="underline text-blue hover:text-blueButtonAccent text-wrap max-w-full "
            >
              You can download label pdf by clicking.
            </a>
          </div>
          <button
            className="w-full bg-green hover:bg-greenButtonAccent border-darkGreen text-white px-8 py-4 rounded-md text-2xl font-bold"
            onClick={handleFinish}
          >
            Finish Shipping
          </button>
        </div>
      </FullScreenModal>
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
              type="button"
              className="bg-green hover:bg-greenButtonAccent text-white font-bold text-xxl px-20 py-8 rounded-lg shadow-lg disabled:bg-gray-500"
              onClick={() => handleBuyLabel()}
            >
              {isLoading ? "...." : "Buy Label"}
            </button>
          </div>
        </div>
      ) : (
        <p>Loading shipment details...</p>
      )}
    </div>
  );
}

function FullScreenModal({ open, onClose, children }) {
  const [show, setShow] = useState(open);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);
      setAnimate(true);
    } else if (show) {
      setAnimate(false);
      const timer = setTimeout(() => setShow(false), 500); // 2s fade out
      return () => clearTimeout(timer);
    }
  }, [open, show]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-2000 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className="relative w-full flex items-center justify-center min-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="bg-white max-w-lg w-full mx-4 p-8 rounded-lg shadow-lg flex flex-col relative transition-all duration-2000"
          style={{
            transform: animate ? "scale(1)" : "scale(0.95)",
            opacity: animate ? 1 : 0,
          }}
        >
          <button
            className="absolute top-4 right-4 text-2xl font-bold text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ShippingReviewPage() {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    setStripePromise(loadStripe(STRIPE_PUBLISHABLE_KEY));
  }, []);

  if (!stripePromise) return null;

  return (
    <Elements stripe={stripePromise}>
      {/* Move this inside the <Elements> wrapper */}
      <ShippingReview />
    </Elements>
  );
}
