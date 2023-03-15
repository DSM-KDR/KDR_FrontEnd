import { atom } from "recoil";

export const CategoryStateAtom = atom<number>({
  key: "categoryState",
  default: 0,
});
