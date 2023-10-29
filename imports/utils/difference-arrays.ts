interface IDifferenceArrays<T> {
  prevArray: T[];
  nextArray: T[];
}
interface IDifferenceResult<T> {
  difference: T[] | null;
  change: "added" | "removed" | "same";
}
export default function getDifference<T extends {_id?: string}>({
  prevArray,
  nextArray,
}: IDifferenceArrays<T>): IDifferenceResult<T> {
  if (!prevArray[0]?._id || !nextArray[0]?._id) {
    return {
      difference: null,
      change: "same",
    };
  }
  const prevArrayIds = prevArray.map((item) => item?._id);
  const nextArrayIds = nextArray.map((item) => item?._id);
  const difference = nextArray.filter(
    (item) => !prevArrayIds.includes(item._id)
  );
  if (difference.length > 0) {
    return {
      difference,
      change: "added",
    };
  }
  const difference2 = prevArray.filter(
    (item) => !nextArrayIds.includes(item._id)
  );
  if (difference2.length > 0) {
    return {
      difference: difference2,
      change: "removed",
    };
  }
  return {
    difference: null,
    change: "same",
  };
}
