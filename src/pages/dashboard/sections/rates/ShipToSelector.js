import { useMemo } from "react";
import { Input } from "../../../../components/ui/input";
import { Select } from "../../../../components/ui/select";
import { COUNTRIES } from "../../../../utils/countries";

export default function ShipToSelector({ loading, country, register, errors }) {
  const isZipCode = useMemo(
    () => COUNTRIES.find((item) => item.value === country)?.isZipCode,
    [country]
  );

  return (
    <div className="flex flex-col mb-6">
      <label className="block font-semibold mb-2">Ship To</label>
      {loading ? (
        <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
          <div className="flex h-14 bg-gray-200 rounded w-full" />
        </div>
      ) : (
        <div className="flex flex-row justify-start gap-4">
          <Select
            id="shipToCountry"
            placeholder="Country"
            values={COUNTRIES.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            {...register("shipToCountry")}
            className={"h-13 text-sm max-w-80"}
            error={errors.shipToCountry}
            autoComplete="shipToCountry"
          />
          {isZipCode && (
            <Input
              id="shipZipCode"
              placeholder="ZipCode"
              {...register("shipZipCode")}
              className="h-12 text-sm min-w-80 sm:max-w-80"
              error={errors.shipZipCode}
              autoComplete="shipZipCode"
            />
          )}
        </div>
      )}
    </div>
  );
}
