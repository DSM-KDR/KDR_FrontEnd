import { atom } from "recoil";
import { SearchQueryAtomType } from "../../types/searchQuery";

export const SearchQueryStateAtom = atom<SearchQueryAtomType>({
  key: "searchQueryState",
  default: {
    main: "",
    category: "",
    notice: "",
    product: "",
  },
});
