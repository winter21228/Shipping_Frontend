import { Input } from "../../../../components/ui/input";

export default function PackageDimensionsInput({
  loading,
  selectedPacketType,
  register,
  errors,
  validateSize,
}) {
  if (selectedPacketType.predefined_package) return null;
  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">
        Package Dimensions (Inches)
      </label>
      {loading ? (
        <div className="border rounded-lg shadow-sm bg-white w-full animate-pulse">
          <div className="flex h-14 bg-gray-200 rounded w-full" />
        </div>
      ) : (
        <>
          <div className="flex gap-4">
            <Input
              id="length"
              placeholder="Length"
              {...register("length")}
              className="h-12 text-sm"
              error={errors.length || validateSize}
              showError={!validateSize}
              autoComplete="length"
            />
            <span className="flex items-center text-gray-400 font-bold">×</span>
            <Input
              id="width"
              placeholder="Width"
              {...register("width")}
              className="h-12 text-sm"
              error={errors.width || validateSize}
              showError={!validateSize}
              autoComplete="width"
            />
            {selectedPacketType.isHeight !== "NOT" && (
              <span className="flex items-center text-gray-400 font-bold">
                ×
              </span>
            )}
            {selectedPacketType.isHeight !== "NOT" && (
              <Input
                id="height"
                placeholder="Height"
                {...register("height")}
                className="h-12 text-sm"
                error={errors.height || validateSize}
                showError={!validateSize}
                autoComplete="height"
              />
            )}
          </div>
          {!validateSize?.isValid && (
            <div className="text-xs mt-1 text-red-500 text-end">
              {validateSize?.message}
            </div>
          )}
        </>
      )}
    </div>
  );
}
