import { atom } from "recoil";
import { BannerListAtomType } from "../../types/banner";

export const BannerListStateAtom = atom<BannerListAtomType>({
  key: "bannerListState",
  default: {
    currentIndex: 0,
    bannerResponses: [],
  },
});
