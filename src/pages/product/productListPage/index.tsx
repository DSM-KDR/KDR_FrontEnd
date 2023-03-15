import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CategoryStateAtom } from "../../../atoms/categoryState";
import { SearchQueryStateAtom } from "../../../atoms/searchQueryState";
import ProductCard from "../../../components/card/product";
import { SearchQueryAtomType } from "../../../types/searchQuery";
import SearchBar from "../../../components/searchBar";
import PageFrame from "../../pageFrame";
import useCategory from "../../../hooks/useCategory";
import useInfiniteProductList from "../../../hooks/useInfiniteProductList";

const ProductListPage = () => {
  const [categoryState, setCategoryState] =
    useRecoilState<number>(CategoryStateAtom);
  const [searchQueryState, setSearchQueryState] =
    useRecoilState<SearchQueryAtomType>(SearchQueryStateAtom);
  const categoryQuery = useCategory();
  const productQuery = useInfiniteProductList({
    size: 6,
    id: categoryState,
    name: searchQueryState.product,
  });

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) productQuery.fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, productQuery.data]);

  const isLoading =
    productQuery.status === "loading" ||
    (productQuery.status !== "success" && !productQuery.data);

  return (
    <PageFrame
      goBackTo="/"
      goBackTitle="홈페이지"
      pageHeadTitle="상품 소개"
      pageHeadDescription="키다리의 상품을 확인하실 수 있습니다."
      isLoading={isLoading}
    >
      <section>
        <SearchBar
          value={searchQueryState.product}
          setValue={(product) =>
            setSearchQueryState((prevState) => {
              return { ...prevState, product: product };
            })
          }
          refetch={() => setTimeout(() => productQuery.refetch(), 1)}
        />
        <Title>
          <p>
            {!isLoading &&
              (productQuery.data?.pages[0].totalPage - 1 > 0
                ? `${
                    (productQuery.data.pages[0].totalPage - 1) * 6
                  }개 이상의 상품이 있습니다.`
                : `${productQuery.data.pages[0].productResponses.length}개의 상품이 있습니다.`)}
          </p>
          <select
            value={categoryState}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCategoryState(() => {
                setTimeout(() => productQuery.refetch(), 1);
                return parseInt(e.currentTarget.value);
              })
            }
          >
            <option value={0}>전체상품</option>
            {!isLoading &&
              categoryQuery.data.map((v) => (
                <option key={`category${v.id}`} value={v.id}>
                  {v.category}
                </option>
              ))}
          </select>
        </Title>
      </section>
      <hr />
      <Contents>
        <ul>
          {!isLoading &&
            productQuery.data.pages?.map((page, pageIndex) =>
              page.productResponses.map((v, i) => (
                <ProductCard
                  refObj={
                    pageIndex === productQuery.data.pages.length - 1 &&
                    i === page.productResponses.length - 1
                      ? ref
                      : undefined
                  }
                  key={`product${v.id}`}
                  product={v}
                />
              ))
            )}
        </ul>
      </Contents>
    </PageFrame>
  );
};

export default ProductListPage;

const Title = styled.article`
  margin-top: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;

  select {
    padding-left: 4px;
    margin-left: 8px;

    width: 35%;
    height: 24px;

    font-size: ${({ theme }) => theme.fontSizes.subText};

    border: 1px solid ${({ theme }) => theme.colors.darkGrey};
    border-radius: 6px;
  }
`;

const Contents = styled.article`
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    list-style: none;
  }
`;
