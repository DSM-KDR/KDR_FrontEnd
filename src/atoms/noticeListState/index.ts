import { atom } from "recoil";
import { NoticeListAtomType } from "../../types/notice";

export const NoticeListStateAtom = atom<NoticeListAtomType>({
  key: "noticeListState",
  default: {
    currentIndex: 0,
    noticeLength: 0,
  },
});
