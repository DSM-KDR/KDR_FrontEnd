import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SearchQueryStateAtom } from "../../../atoms/searchQueryState";
import NoticeCard from "../../../components/card/notice";
import { SearchQueryAtomType } from "../../../types/searchQuery";
import PageFrame from "../../pageFrame";
import useInfiniteNoticeList from "../../../hooks/useInfiniteNoticeList";
import SearchBar from "../../../components/searchBar";

const NoticeManagePage = () => {
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
  }, [inView]);

  const isLoading =
    noticeQuery.status === "loading" ||
    (noticeQuery.status !== "success" && !noticeQuery.data);

  return (
    <PageFrame
      goBackTo="/admin"
      goBackTitle="관리자 페이지"
      isLoading={isLoading}
      isAdminPage={true}
    >
      <Title>
        <strong>공지사항 목록</strong>
        <Link to="/admin/notice/create">+ 공지사항 생성</Link>
      </Title>
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
                  isAdminPage={true}
                />
              ))
            )}
        </ul>
      </Contents>
    </PageFrame>
  );
};

export default NoticeManagePage;

const Title = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const Contents = styled.article`
  ul {
    display: flex;
    flex-wrap: wrap;

    list-style: none;
  }
`;
