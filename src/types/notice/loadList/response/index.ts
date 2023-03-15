export interface ShortenedNoticeType {
  id: number;
  preview: string;
  title: string;
  date: string;
}

export interface NoticeLoadListResponseType {
  totalPage: number;
  noticeResponses: ShortenedNoticeType[];
}
