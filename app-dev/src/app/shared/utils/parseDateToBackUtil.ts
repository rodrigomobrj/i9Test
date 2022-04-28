
export const parseDateToBackUtil = ((date: string): string => {
  if (!date)
    return null
  const day = date.substring(0,2);
  const month = date.substring(2,4);
  const year = date.substring(4);
  return `${year}-${month}-${day}`;
});

export const parseDateToFrontUtil = ((date: string): string => {
  if (!date)
    return null
  const year = date.substring(0,4);
  const month = date.substring(5,7);
  const day = date.substring(8,10);
  return `${day}${month}${year}`;
});


