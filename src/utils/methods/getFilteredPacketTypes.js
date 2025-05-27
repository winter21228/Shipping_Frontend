export const getFilteredPackageTypes = (data) => {
  return data.carriers
    ?.filter((car) => data.company.activeCarriers.includes(car.carrierKey))
    .map((car) => car.packageTypes)
    .flat()
    .reduce((prev, curr) => {
      if (
        prev.findIndex((pt) => pt.packageTypeKey === curr.packageTypeKey) > -1
      ) {
        return prev;
      }
      return [...prev, curr];
    }, []);
};
