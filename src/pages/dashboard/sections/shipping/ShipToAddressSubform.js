import GooglePlaceAutocompleteInput from "../../../../components/ui/GooglePlaceAutocompleteInput";
import { Input } from "../../../../components/ui/input";
import { Select } from "../../../../components/ui/select";
import { COUNTRIES } from "../../../../utils/countries";

export default function ShipToAddressSubformComponent({
  loading,
  register,
  errors,
  setValue,
}) {
  return (
    <div>
      <div className="flex items-center mb-2">
        <label className="font-semibold text-base mr-2">Ship To</label>
      </div>
      {loading ? (
        <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
          <div className="flex h-28 bg-gray-200 rounded w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            id="shipToEmail"
            name="shipToEmail"
            placeholder="Email (Optional)"
            {...register("shipToEmail")}
            className={"h-12 text-base"}
            error={errors.shipToEmail}
            autoComplete="shipToEmail"
          />
          <Input
            id="shipToPhone"
            name="shipToPhone"
            placeholder="Phone (Optional)"
            {...register("shipToPhone")}
            className={"h-12 text-base"}
            error={errors.shipToPhone}
            autoComplete="shipToPhone"
          />
          <Input
            id="shipToName"
            name="shipToName"
            placeholder="Name"
            {...register("shipToName")}
            className={"h-12 text-base"}
            error={errors.shipToName}
            autoComplete="shipToName"
          />
          <Input
            id="shipToCompany"
            name="shipToCompany"
            placeholder="Company (Optional)"
            {...register("shipToCompany")}
            className={"h-12 text-base"}
            error={errors.shipToCompany}
            autoComplete="shipToCompany"
          />
          <Input
            id="shipToAddress1"
            name="shipToAddress1"
            placeholder="Address"
            {...register("shipToAddress1")}
            className={"h-12 text-base"}
            error={errors.shipToAddress1}
            autoComplete="shipToAddress1"
          />
          {/* <GooglePlaceAutocompleteInput
            setValue={setValue}
            register={register}
            errors={errors}
          /> */}
          <Input
            id="shipToAddress2"
            placeholder="Apt / Unit / Suite / etc. (optional)"
            {...register("shipToAddress2")}
            className={"h-12 text-base"}
            error={errors.shipToAddress2}
            autoComplete="shipToAddress2"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <Input
              id="shipToCity"
              placeholder="City"
              {...register("shipToCity")}
              className={"h-12 text-base"}
              error={errors.shipToCity}
              autoComplete="shipToCity"
            />
            <Input
              id="shipToState"
              placeholder="State"
              {...register("shipToState")}
              className={"h-12 text-base"}
              error={errors.shipToState}
              autoComplete="shipToState"
            />
            <Input
              id="shipToZipCode"
              placeholder="ZipCode"
              {...register("shipToZipCode")}
              className={"h-12 text-base"}
              error={errors.shipToZipCode}
              autoComplete="shipToZipCode"
            />
          </div>
          <Select
            id="shipToCountry"
            placeholder="Country"
            values={COUNTRIES}
            {...register("shipToCountry")}
            className={"h-12 text-base"}
            error={errors.shipToCountry}
            autoComplete="shipToCountry"
          />
        </div>
      )}
    </div>
  );
}
