import { Input } from "../../../../components/ui/input";

export default function PackageWeightInput({
  loading,
  register,
  errors,
  validateWeight,
}) {
  return (
    <div className="flex-1 mb-10">
      <label className="block font-semibold mb-2">Package Weight</label>
      {loading ? (
        <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
          <div className="flex h-14 bg-gray-200 rounded w-full" />
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center justify-start gap-4">
            <Input
              id="pounds"
              placeholder="Pounds"
              {...register("pounds")}
              className="shadow-sm text-sm h-12"
              error={errors.pounds || validateWeight}
              showError={!validateWeight}
              autoComplete="pounds"
            />
            <span className="flex items-center text-gray-400 font-bold">+</span>
            <Input
              id="ounces"
              placeholder="Ounces"
              {...register("ounces")}
              className="shadow-sm text-sm h-12"
              error={errors.ounces || validateWeight}
              showError={!validateWeight}
              autoComplete="ounces"
            />
          </div>
          {!validateWeight?.isValid && (
            <div className="text-xs mt-1 text-red-500 text-start">
              {validateWeight?.message}
            </div>
          )}
        </>
      )}
    </div>
  );
}
