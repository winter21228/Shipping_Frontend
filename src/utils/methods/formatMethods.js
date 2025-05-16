export const convertOzToLbs = (oz) => {
  if (oz === null || oz === undefined) {
    return null;
  }

  const lbs = Math.floor(oz / 16);
  const ounces = oz % 16;
  return { lbs, ounces };
};

export const getDeliveryDateFormat = (isoString) => {
  const date = new Date(isoString);

  // Get day of the week
  const weekday = date.toLocaleDateString(undefined, { weekday: "long" });

  // Get MM/DD
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Format time as 12-hour (hh:mm AM/PM)
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12; // 0 becomes 12

  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return `${weekday} ${month}/${day} by ${formattedTime}`;
};
