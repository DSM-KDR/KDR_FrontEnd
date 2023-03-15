import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CategoryStateAtom } from "../../../atoms/categoryState";
import useProductList from "../../../hooks/useProductList";
import Spinner from "../../spinner";

const ProductCollection = () => {
  const productQuery = useProductList({
    page: 0,
    size: 6,
    id: 1,
  });

  const [, setCategoryState] = useRecoilState<number>(CategoryStateAtom);

  const hasData =
    productQuery.data?.productResponses &&
    productQuery.data.productResponses.length > 0;

  return (
    <>
      {productQuery.status === "loading" && <Spinner displayType="contain" />}
      {productQuery.status === "error" && (
        <article>
          <Warning>{(productQuery.error as Error).message}</Warning>
        </article>
      )}
      {productQuery.status === "success" && hasData ? (
        <article>
          <Title>
            가장 많이 찾으시는 상품
            <Link to="/product" onClick={() => setCategoryState(1)}>
              더보기 +
            </Link>
          </Title>
          <Contents>
            {productQuery.data &&
              productQuery.data.productResponses.map((v) => (
                <Wrapper key={`product${v.id}`}>
                  <Link to={`/product/${v.id}`}>
                    <img src={v.image} alt={v.name} />
                    <h3>{v.name}</h3>
                  </Link>
                </Wrapper>
              ))}
          </Contents>
        </article>
      ) : (
        productQuery.status !== "loading" &&
        !productQuery.error && (
          <article>
            <Warning>조회된 데이터가 없습니다</Warning>
          </article>
        )
      )}
    </>
  );
};

export default ProductCollection;

const Warning = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.text};
`;

const Title = styled.h2`
  margin-bottom: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSizes.text};
`;

const Contents = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  list-style: none;
`;

const Wrapper = styled.li`
  width: calc(33% - 4.75px);

  a {
    display: flex;
    flex-direction: column;

    img {
      width: 100%;

      border-radius: 10px;
      object-fit: cover;

      @supports (aspect-ratio: 1 / 1) {
        aspect-ratio: 1 / 1;
      }

      @supports not (aspect-ratio: 1 / 1) {
        height: 110px;
      }
    }

    h3 {
      padding-top: 8px;
      padding-bottom: 8px;

      font-size: ${({ theme }) => theme.fontSizes.subText};
    }
  }
`;
