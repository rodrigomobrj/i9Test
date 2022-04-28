
export const adjustmentMaskHeightUtil = ((heightInText: string): number => {
  const firstValue = heightInText.substring(1, 0);
  const lastValue = heightInText.substring(3, 1);
  const heightInNumber = `${firstValue}.${lastValue}`;
  return Number(heightInNumber);
});
