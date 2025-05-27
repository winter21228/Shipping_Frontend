import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  getProcessingShipments,
  setShipment,
} from "../../../redux/slices/user";

import { PATH_DASHBOARD } from "../../../routes/paths";

import { ICON_URL_PREFIX } from "../../../utils/constant";
import { formatDate } from "../../../utils/methods/formatMethods";

function ShippingDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shipments } = useSelector((state) => state.user);

  const Steps = [
    {
      icon: `${ICON_URL_PREFIX}/single.png`,
      label: "Create a Single Label",
      path: PATH_DASHBOARD.singleShipping,
    },
    { icon: `${ICON_URL_PREFIX}/upload.png`, label: "Upload a Spreadsheet" },
    {
      icon: `${ICON_URL_PREFIX}/integration.png`,
      label: "Import from Integrations",
    },
  ];

  useEffect(() => {
    dispatch(getProcessingShipments());
  }, [dispatch]);

  const handleItemClick = (id) => {
    navigate(PATH_DASHBOARD.reviewShip(id));
  };

  return (
    <div className="flex flex-col gap-10 px-16">
      {/* Top Steps */}
      <div className="flex flex-row gap-10 justify-center py-12 bg-[repeating-linear-gradient(135deg,_#fbfbfb_0,_#fbfbfb_25px,_transparent_25px,_transparent_50px,_gray_50px)]">
        {Steps.map((step, idx) => (
          <Step key={idx} step={step} />
        ))}
      </div>

      <div className="flex flex-col gap-5 w-full ">
        {/* Search Bar */}
        <div className="w-full flex flex-row">
          <input
            type="text"
            placeholder="Search previous labels"
            className="w-full border-2 border-solid border-gray-400 px-3 py-4 rounded-s-md"
          />
          <span className="border-2 border-s-0 border-solid border-gray-400 px-4 py-4 rounded-e-md text-gray-400 bg-gray-300 cursor-pointer hover:bg-gray-400 transition-colors outline-none">
            🔍
          </span>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-row gap-4">
          <button className="w-full bg-sky-500 border-2 rounded-md border-solid border-sky-600 text-white py-4">
            End of Day
          </button>
          <button className="w-full bg-sky-500 border-2 rounded-md border-solid border-sky-600 text-white py-4">
            Schedule Pickup
          </button>
          <button
            className="w-full bg-green border-2 rounded-md border-solid border-greenButtonAccent text-white py-4 disabled:bg-darkGreen disabled:bg-opacity-60 disabled:border-greenButtonAccent"
            disabled
          >
            Print Selected Labels
          </button>
        </div>
      </div>

      <div className="flex flex-col border-y-2 border-x-none border-solid border-gray-200 divide-y-2 divide-solid divide-gray-200">
        {shipments &&
          shipments.length > 0 &&
          shipments.map((shipment) => (
            <LabelItem
              key={shipment.id}
              label={shipment}
              onClick={() => handleItemClick(shipment.id)}
            />
          ))}
      </div>
    </div>
  );
}

// Step component for the top icons
function Step({ step }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { icon, label, path } = step;
  return (
    <div
      onClick={() => {
        localStorage.removeItem("currentShipmentId");
        dispatch(setShipment(null));
        navigate(path);
      }}
      className="flex flex-col items-center justify-center rounded-full border-4 border-solid border-gray-100 bg-white h-[140px] w-[140px] px-4 cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <img className="w-[70px] h-[70px]" alt={label} src={icon} />
      <div className="text-sm font-bold text-gray-400 text-center">{label}</div>
    </div>
  );
}

function LabelItem({ label, onClick }) {
  const { createdAt, shipToAddress, status } = label;
  return (
    <div
      className="flex flex-row items-center justify-between py-4 pl-8 hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
        <span className="text-lg text-sky-500">{shipToAddress?.name}</span>
        <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
      </div>
      <div className="text-xs text-gray-400 font-bold">{status}</div>
      <button className="bg-sky-500 border-2 rounded-md px-32 border-solid border-sky-600 text-white py-4">
        Input Needed
      </button>
    </div>
  );
}

export default ShippingDashboardPage;
