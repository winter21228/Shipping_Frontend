import { Input } from "../../../../components/ui/input";

export default function RubberStampSubformComponent({
  includeRubberStamp,
  setIncludeRubberStamp,
  register,
  errors,
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="includeRubberStamp"
          checked={includeRubberStamp}
          onChange={(e) => setIncludeRubberStamp(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="includeRubberStamp" className="text-xs text-grey60">
          <span className="text-md text-black">Rubber Stamps</span> Print extra
          information on the label.
        </label>
      </div>
      {includeRubberStamp && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input
            id="rubberStamp1"
            name="rubberStamp1"
            placeholder="Rubber Stamp / Custom Reference 1"
            {...register("rubberStamp1")}
            className={"h-12 text-base"}
            error={errors.rubberStamp1}
            autoComplete="rubberStamp1"
          />
          <Input
            id="rubberStamp2"
            name="rubberStamp2"
            placeholder="Rubber Stamp / Custom Reference 2"
            {...register("rubberStamp2")}
            className={"h-12 text-base"}
            error={errors.rubberStamp2}
            autoComplete="rubberStamp2"
          />
        </div>
      )}
    </div>
  );
}
