
export const adjustmentMaskWeightUtil = ((weightInText: string): number => {
  const firstValue = weightInText.substring(0, weightInText.length - 1);
  const lastValue = weightInText.substr(-1);
  const weightInNumber = `${firstValue}.${lastValue}`;
  return Number(weightInNumber);
});
