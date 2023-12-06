import { NoMicro, u } from "@libs/types";
import { demicrofy } from "./demicrofy";
import { microfy } from "./microfy";

export const normalize = <T>(
  amount: u<T>,
  fromDecimals: number,
  toDecimals: number
): u<T> => {
  const demicrofied = demicrofy(amount, fromDecimals) as u<T & NoMicro>;
  return microfy(demicrofied, toDecimals);
};
