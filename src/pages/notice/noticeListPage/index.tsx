import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SearchQueryStateAtom } from "../../../atoms/searchQueryState";
import NoticeCard from "../../../components/card/notice";
import { SearchQueryAtomType } from "../../../types/searchQuery";
import PageFrame from "../../pageFrame";
import SearchBar from "../../../components/searchBar";
import useInfiniteNoticeList from "../../../hooks/useInfiniteNoticeList";

const NoticeListPage = () => {
  const [searchQueryState, setSearchQueryState] =
    useRecoilState<SearchQueryAtomType>(SearchQueryStateAtom);

  const noticeQuery = useInfiniteNoticeList({
    size: 6,
    title: searchQueryState.notice,
  });

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) noticeQuery.fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, noticeQuery.data]);

  const isLoading =
    noticeQuery.status === "loading" ||
    (noticeQuery.status !== "success" && !noticeQuery.data);

  return (
    <PageFrame
      goBackTo="/"
      goBackTitle="홈페이지"
      pageHeadTitle="공지사항"
      pageHeadDescription="키다리의 소식을 확인하실 수 있습니다."
      isLoading={isLoading}
    >
      <SearchBar
        value={searchQueryState.notice}
        setValue={(notice) =>
          setSearchQueryState((prevState) => {
            return { ...prevState, notice: notice };
          })
        }
        refetch={() => setTimeout(() => noticeQuery.refetch(), 1)}
      />
      <hr />
      <Contents>
        <ul>
          {!isLoading &&
            noticeQuery.data.pages?.map((page, pageIndex) =>
              page.noticeResponses.map((v, i) => (
                <NoticeCard
                  refObj={
                    pageIndex === noticeQuery.data.pages.length - 1 &&
                    i === page.noticeResponses.length - 1
                      ? ref
                      : undefined
                  }
                  key={`notice${v.id}`}
                  notice={v}
                />
              ))
            )}
        </ul>
      </Contents>
    </PageFrame>
  );
};

export default NoticeListPage;

const Contents = styled.article`
  ul {
    display: flex;
    flex-wrap: wrap;

    list-style: none;
  }
`;
