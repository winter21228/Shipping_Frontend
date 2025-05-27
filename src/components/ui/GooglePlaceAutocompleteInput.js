// components/GooglePlaceAutocompleteInput.js
import React, { useEffect, useRef } from "react";

export default function GooglePlaceAutocompleteInput({ setValue }) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (event) => {
      const place = event.detail;
      if (!place?.address_components) {
        console.warn("No address components found.");
        return;
      }

      let street_number = "";
      let route = "";
      let city = "";
      let state = "";
      let country = "";
      let zip = "";

      for (const component of place.address_components) {
        const type = component.types[0];
        if (type === "street_number") street_number = component.long_name;
        if (type === "route") route = component.long_name;
        if (type === "locality" || type === "postal_town")
          city = component.long_name;
        if (type === "administrative_area_level_1") state = component.long_name;
        if (type === "country") country = component.long_name;
        if (type === "postal_code") zip = component.long_name;
      }

      setValue("shipToAddress1", `${street_number} ${route}`);
      setValue("shipToCity", city);
      setValue("shipToState", state);
      setValue("shipToCountry", country);
      setValue("shipToZipCode", zip);
    };

    el.addEventListener("gmp-placeautocomplete-placechange", handler);
    return () => {
      el.removeEventListener("gmp-placeautocomplete-placechange", handler);
    };
  }, [setValue]);

  return (
    <google-place-autocomplete id="shipToAddress1" ref={ref} class="w-full">
      <input
        className="w-full border p-2 rounded"
        placeholder="Enter shipping address"
      />
    </google-place-autocomplete>
  );
}
