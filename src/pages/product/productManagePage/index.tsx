import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SearchQueryStateAtom } from "../../../atoms/searchQueryState";
import ProductCard from "../../../components/card/product";
import { SearchQueryAtomType } from "../../../types/searchQuery";
import PageFrame from "../../pageFrame";
import SearchBar from "../../../components/searchBar";
import { Link } from "react-router-dom";
import useInfiniteProductList from "../../../hooks/useInfiniteProductList";

const ProductManagePage = () => {
  const [searchQueryState, setSearchQueryState] =
    useRecoilState<SearchQueryAtomType>(SearchQueryStateAtom);
  const productQuery = useInfiniteProductList({
    size: 6,
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
      goBackTo="/admin"
      goBackTitle="관리자 페이지"
      isLoading={isLoading}
      isAdminPage={true}
    >
      <Title>
        <strong>상품 목록</strong>
        <Link to="/admin/product/create">+ 상품 생성</Link>
      </Title>
      <SearchBar
        value={searchQueryState.notice}
        setValue={(notice) =>
          setSearchQueryState((prevState) => {
            return { ...prevState, notice: notice };
          })
        }
        refetch={() => setTimeout(() => productQuery.refetch(), 1)}
      />
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
                  isAdminPage={true}
                />
              ))
            )}
        </ul>
      </Contents>
    </PageFrame>
  );
};

export default ProductManagePage;

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
    gap: 8px;

    list-style: none;
  }
`;
