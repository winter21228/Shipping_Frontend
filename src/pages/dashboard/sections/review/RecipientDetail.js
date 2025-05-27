import React, { useState } from "react";

import { PlusCircle, MinusCircle } from "lucide-react";
import TextWithLabel from "../../../../components/TextWithLabel";
import {
  formatWeight,
  toWeightObject,
} from "../../../../utils/methods/formatWeight";
import { formatCurrency } from "../../../../utils/methods/formatCurrency";

function RecipientDetail({
  recipient,
  shipFromAddress,
  packageData,
  rubberStamp,
}) {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">{recipient?.name || ""}</h1>
        <div className="flex flex-col gap-0">
          <span className="text-md leading-6">{recipient?.company || ""}</span>
          <span className="text-md leading-6">{recipient?.street1 || ""}</span>
          <span className="text-md leading-6">
            {recipient?.city || ""} {recipient?.state || ""}{" "}
            {recipient?.zip || ""}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="flex flex-row items-center font-medium text-md leading-5 gap-1 cursor-pointer"
          onClick={() => setIsOpenDetail(!isOpenDetail)}
        >
          {isOpenDetail ? (
            <MinusCircle size={20} strokeWidth={2} color="#999" />
          ) : (
            <PlusCircle size={20} strokeWidth={2} color="#999" />
          )}
          <span className="text-gray-700">Shipmment Details</span>
        </div>
        {isOpenDetail && (
          <div className="grid grid-cols-3 gap-6 mt-1 rounded-md p-4 bg-gray-100 border border-gray-300">
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <div className="flex flex-col gap-1">
                <TextWithLabel
                  label={"Recipient Details"}
                  className="text-gray-600 font-medium"
                />
                <div className="flex flex-col gap-0">
                  <TextWithLabel
                    label={"Email Address"}
                    value={recipient?.email}
                  />
                  <TextWithLabel
                    label={"Phone Number"}
                    value={recipient?.phone}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <TextWithLabel
                  label={"Ship From Address"}
                  value={shipFromAddress?.nickName}
                  className="text-gray-600 font-medium"
                  valueStyle="font-medium"
                />
                <div className="flex flex-col gap-0 font-regular">
                  <TextWithLabel value={shipFromAddress?.fullName} />
                  <TextWithLabel value={shipFromAddress?.company} />
                  <TextWithLabel value={shipFromAddress?.addressline1} />
                  <TextWithLabel
                    value={`${shipFromAddress?.city} ${shipFromAddress?.state} ${shipFromAddress?.zipCode}`}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-gray-400">
              <TextWithLabel
                label={"Package Details"}
                className="text-gray-600 font-medium"
              />
              <div className="flex flex-col gap-0">
                <TextWithLabel
                  label={"Package Type"}
                  value={packageData?.packageType?.title}
                />
                {(packageData?.parcel?.length ||
                  packageData?.parcel?.width ||
                  packageData?.parcel?.height) && (
                  <TextWithLabel
                    label={"Dimensions"}
                    value={`${packageData?.parcel?.length} x ${
                      packageData?.parcel?.width
                    }${
                      packageData?.parcel?.height
                        ? ` x${packageData?.parcel?.height}`
                        : ""
                    }"`}
                  />
                )}
                <TextWithLabel
                  label={"Weight"}
                  value={formatWeight(
                    toWeightObject(parseFloat(packageData?.parcel?.weight))
                  )}
                />
                <TextWithLabel label={"Free Online Delivery Confirmation"} />
                {packageData?.insurance && (
                  <TextWithLabel
                    label={"Declared Package Value"}
                    value={formatCurrency(packageData?.insurance)}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <div className="flex flex-col gap-1">
                <TextWithLabel
                  label={"Label Details"}
                  className="text-gray-600 font-medium"
                />
                <div className="flex flex-col gap-0">
                  <TextWithLabel label={"Label Size"} value={'4x6"'} />
                  <TextWithLabel label={"Label Filetype"} value={"PDF"} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <TextWithLabel
                  label={"Rubber Stamps"}
                  className="text-gray-600 font-medium"
                />
                <div className="flex flex-col gap-0 font-regular">
                  {rubberStamp?.rubberStamp1 && (
                    <TextWithLabel
                      label={"Rubber Stamp 1"}
                      value={rubberStamp?.rubberStamp1}
                    />
                  )}
                  {rubberStamp?.rubberStamp2 && (
                    <TextWithLabel
                      label={"Rubber Stamp 2"}
                      value={rubberStamp?.rubberStamp2}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipientDetail;
