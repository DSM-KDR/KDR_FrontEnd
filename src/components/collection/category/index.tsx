import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { LeftArrow, RightArrow } from "../../../assets/images";
import { CategoryStateAtom } from "../../../atoms/categoryState";
import useCategory from "../../../hooks/useCategory";
import { CategoryType } from "../../../types/category/loadList/response";
import Spinner from "../../spinner";

const CategoryCollection = () => {
  const categoryQuery = useCategory();
  const [categoryPage, setCategoryPage] = useState<CategoryType[][]>([]);
  const [categoryPageIndex, setCategoryPageIndex] = useState<number>(0);
  useLayoutEffect(() => {
    if (categoryQuery.data && categoryQuery.data.length) {
      let clonedCategoryQuery = JSON.parse(JSON.stringify(categoryQuery.data)),
        temp = [];
      while (clonedCategoryQuery.length > 0)
        temp.push(clonedCategoryQuery.splice(0, 8));
      setCategoryPage(temp);
    }
  }, [categoryQuery.data]);

  const [, setCategoryState] = useRecoilState<number>(CategoryStateAtom);

  return (
    <>
      {categoryQuery.status === "loading" && <Spinner displayType="contain" />}
      {categoryQuery.status === "error" && (
        <article>
          <Warning>{(categoryQuery.error as Error).message}</Warning>
        </article>
      )}
      {categoryQuery.status === "success" && categoryPage ? (
        <Wrapper>
          <Arrow type="button">
            <img src={LeftArrow} alt="이전 페이지" />
          </Arrow>
          <Contents
            categoryIndex={categoryPageIndex}
            categoryLength={categoryPage.length}
          >
            {categoryPage.map((page, pageIndex) => (
              <li
                key={`categoryPage${pageIndex}`}
                onClick={() => setCategoryPageIndex(pageIndex)}
              >
                <ul>
                  {page.map((v, i) => (
                    <li key={`category${pageIndex}-${i}`}>
                      <Link
                        to="/product"
                        onClick={() => setCategoryState(v.id)}
                      >
                        <img
                          src={v.image}
                          alt={v.category}
                          width="50"
                          height="50"
                        />
                        <h2>{v.category}</h2>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </Contents>
          <Arrow type="button">
            <img src={RightArrow} alt="다음 페이지" />
          </Arrow>
        </Wrapper>
      ) : (
        categoryQuery.status !== "loading" &&
        !categoryQuery.error && (
          <article>
            <Warning>조회된 데이터가 없습니다</Warning>
          </article>
        )
      )}
    </>
  );
};

export default CategoryCollection;

const Warning = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.text};
`;

const Wrapper = styled.article`
  display: flex;
  align-items: center;
`;

const Arrow = styled.button`
  background-color: transparent;

  display: flex;

  border: none;

  ${({ theme }) => theme.common.hoverEffect}
`;

interface CategoryIndexProps {
  categoryIndex: number;
  categoryLength?: number;
}

const Contents = styled.ul<CategoryIndexProps>`
  position: relative;

  transform: translate3d(${(props) => props.categoryIndex * -100}vw, 0px, 0px);

  padding-left: 5vw;
  padding-right: 5vw;

  width: ${(props) => props.categoryLength * 100}%;

  display: flex;

  transition: transform 0.25s ease;

  > li {
    position: relative;
    float: left;

    width: 100%;

    list-style: none;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    > li {
      padding: 8px;

      width: calc(25% - 6px);

      display: flex;
      justify-content: center;

      border-radius: 10px;
      gap: 8px;

      ${({ theme }) => theme.common.hoverEffect}

      a {
        :hover {
          filter: brightness(100%);
        }

        img {
          border-radius: 50%;
          object-fit: cover;
        }

        h2 {
          font-size: ${({ theme }) => theme.fontSizes.subText};
          text-align: center;
        }
      }
    }
  }
`;
