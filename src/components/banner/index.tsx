import styled from "styled-components";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import { BannerListStateAtom } from "../../atoms/bannerListState";
import { Link } from "react-router-dom";
import { BannerListAtomType } from "../../types/banner";
import useNoticeList from "../../hooks/useNoticeList";

const Banner = () => {
  const noticeQuery = useNoticeList({ page: 0, size: 5 });
  useLayoutEffect(() => {
    if (noticeQuery.data)
      setBannerListState((prevState) => {
        return {
          ...prevState,
          bannerResponses: noticeQuery.data.noticeResponses
            .map((v, i) => {
              return v.preview.startsWith("[") && v.preview.endsWith("]")
                ? {
                    id: i,
                    image: v.preview.replace(/\[|\]/g, ""),
                    to: v.id,
                  }
                : undefined;
            })
            .filter((v) => v !== undefined),
        };
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noticeQuery.data]);

  const [bannerListState, setBannerListState] =
    useRecoilState<BannerListAtomType>(BannerListStateAtom);
  useEffect(() => {
    if (bannerListState.bannerResponses.length > 1) {
      let compensator = 0;
      const timer = setInterval(
        () =>
          setBannerListState((prevState) => {
            if (prevState.currentIndex !== compensator) {
              compensator = prevState.currentIndex;
              return prevState;
            } else {
              if (
                prevState.currentIndex + 2 >
                prevState.bannerResponses.length
              ) {
                compensator = 0;
                return { ...prevState, currentIndex: 0 };
              }
              compensator += 1;
              return { ...prevState, currentIndex: prevState.currentIndex + 1 };
            }
          }),
        5000
      );
      return () => clearInterval(timer);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setBannerIndex = useCallback((index: number) => {
    setBannerListState((prevState: BannerListAtomType) => {
      return { ...prevState, currentIndex: index };
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    bannerListState.bannerResponses.length > 0 && (
      <figure>
        <Slide
          bannerIndex={bannerListState.currentIndex}
          bannerLength={bannerListState.bannerResponses.length}
        >
          {bannerListState.bannerResponses.map((v, i) => (
            <li key={`banner${i}`}>
              <Link to={`/notice/${v.to}`} aria-label={v.id.toString()}>
                <img src={v.image} alt="" height="200" />
              </Link>
            </li>
          ))}
        </Slide>
        {bannerListState.bannerResponses.length > 1 && (
          <Pagination bannerIndex={bannerListState.currentIndex}>
            {bannerListState.bannerResponses.map((v, i) => (
              <button
                key={`bannerMoveTo${i}`}
                title={`${v.id} 페이지`}
                type="button"
                onClick={() => setBannerIndex(i)}
              />
            ))}
          </Pagination>
        )}
      </figure>
    )
  );
};

export default Banner;

interface BannerIndexProps {
  bannerIndex: number;
  bannerLength?: number;
}

const Slide = styled.ul<BannerIndexProps>`
  position: relative;

  transform: translate3d(${(props) => props.bannerIndex * -100}vw, 0px, 0px);

  width: ${(props) => props.bannerLength * 100}%;
  height: 200px;

  display: flex;

  transition: transform 0.25s ease;

  > li {
    position: relative;
    float: left;

    width: 100%;

    list-style: none;

    img {
      width: 100%;

      object-fit: cover;
    }
  }
`;

const Pagination = styled.div<BannerIndexProps>`
  position: absolute;
  right: 16px;

  transform: translateY(-40px);

  background-color: ${({ theme }) => theme.colors.translucent};

  padding: 8px;

  display: flex;

  border-radius: 10px;

  > button {
    background-color: ${({ theme }) => theme.colors.translucent};

    margin-left: 8px;

    width: 24px;
    height: 12px;

    border: none;
    border-radius: 10px;

    ${({ theme }) => theme.common.hoverEffect}

    :first-of-type {
      margin-left: 0;
    }

    :nth-of-type(${(props) => props.bannerIndex + 1}) {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`;
