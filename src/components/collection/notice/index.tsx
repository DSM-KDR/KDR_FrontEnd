import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Bell } from "../../../assets/images";
import { NoticeListStateAtom } from "../../../atoms/noticeListState";
import useNoticeList from "../../../hooks/useNoticeList";
import { NoticeListAtomType } from "../../../types/notice";
import Spinner from "../../spinner";

const NoticeCollection = () => {
  const noticeQuery = useNoticeList({ page: 0, size: 10, title: "" });
  useEffect(() => {
    if (noticeQuery.data)
      setNoticeListState((prevState) => {
        return { ...prevState, noticeLength: noticeQuery.data.totalPage };
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noticeQuery.data]);

  const [noticeListState, setNoticeListState] =
    useRecoilState<NoticeListAtomType>(NoticeListStateAtom);
  useEffect(() => {
    if (noticeListState.noticeLength > 1) {
      const timer = setInterval(
        () =>
          setNoticeListState((prevState) => {
            if (prevState.currentIndex + 2 > prevState.noticeLength)
              return { ...prevState, currentIndex: 0 };
            else
              return { ...prevState, currentIndex: prevState.currentIndex + 1 };
          }),
        5000
      );
      return () => clearInterval(timer);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasData =
    noticeQuery.data?.noticeResponses &&
    noticeQuery.data.noticeResponses.length > 0;

  return (
    <>
      {noticeQuery.status === "loading" && <Spinner displayType="contain" />}
      <Wrapper>
        <h2>
          <span>[</span>
          <img src={Bell} alt="" height="16" /> 키다리 소식
          <span>]</span>
        </h2>
        {noticeQuery.status === "error" && (
          <p>{(noticeQuery.error as Error).message}</p>
        )}
        {noticeQuery.status === "success" && hasData ? (
          <>
            <Slide
              noticeIndex={noticeListState.currentIndex}
              noticeLength={noticeListState.noticeLength}
            >
              {noticeQuery.data.noticeResponses.map((v, i) => (
                <li key={`notice${i}`}>
                  <Link to={`/notice/${v.id}`}>{v.title}</Link>
                </li>
              ))}
            </Slide>
            <Link to="/notice">더보기 +</Link>
          </>
        ) : (
          noticeQuery.status !== "loading" &&
          !noticeQuery.error && <p>조회된 데이터가 없습니다</p>
        )}
      </Wrapper>
    </>
  );
};

export default NoticeCollection;

interface SlideProps {
  noticeIndex: number;
  noticeLength: number;
}

const Slide = styled.ul<SlideProps>`
  transform: translate3d(
    0px,
    ${(props) => 24 + props.noticeIndex * -24}px,
    0px
  );

  width: 100%;
  height: ${(props) => props.noticeLength * -24}px;

  display: flex;
  flex-direction: column;

  transition: transform 0.25s ease;

  > li {
    height: 24px;

    display: flex;
    align-items: center;
  }
`;

const Wrapper = styled.article`
  height: 24px;

  display: flex;
  align-items: center;

  overflow: hidden;

  > p {
    color: ${({ theme }) => theme.colors.darkGrey};
    font-size: ${({ theme }) => theme.fontSizes.subText};
  }

  h2 {
    margin-right: 8px;

    min-width: max-content;

    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.colors.darkGrey};
    font-size: ${({ theme }) => theme.fontSizes.subText};

    img {
      margin-right: 4px;

      @keyframes bellRing {
        0% {
          transform: rotate(12.5deg);
        }
        50% {
          transform: rotate(-12.5deg);
        }
        100% {
          transform: rotate(12.5deg);
        }
      }

      animation: bellRing 2s ease infinite;
    }

    span {
      :first-of-type {
        margin-right: 4px;
      }

      :last-of-type {
        margin-left: 4px;
      }
    }
  }

  > a {
    margin-left: 8px;

    min-width: max-content;
  }
`;
