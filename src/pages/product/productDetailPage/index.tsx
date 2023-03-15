import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ContactContents from "../../../libs/constants/contact";
import { Hashtag, Origin, Weight } from "../../../assets/images";
import { paraphraseText } from "../../../libs/utils/paraphraseText";
import PageFrame from "../../pageFrame";
import useProduct from "../../../hooks/useProduct";

const ProductDetailPage = () => {
  const [articleState, setArticleState] = useState<"detail" | "contact">(
    "detail"
  );

  const params = useParams();
  const productQuery = useProduct({ id: params.id });

  const description = useMemo(
    () => productQuery.data && paraphraseText(productQuery.data.description),
    [productQuery.data]
  );
  const isLoading =
    productQuery.status === "loading" ||
    (productQuery.status !== "success" && !productQuery.data);

  return (
    <PageFrame goBackTo="/" goBackTitle="홈페이지" isLoading={isLoading}>
      <Title>
        <figure>
          <img src={productQuery.data.image} alt="상품 사진" />
        </figure>
        <h2>
          {productQuery.data.category.includes("선물용상품") && (
            <strong className="GIFT">선물용</strong>
          )}
          {productQuery.data.category.includes("신규상품") && (
            <strong className="NEW">신규</strong>
          )}
          {productQuery.data.category.includes("베스트상품") && (
            <strong className="BEST">베스트</strong>
          )}
          {productQuery.data.name}
        </h2>
        <p>₩{productQuery.data.price.toLocaleString()}</p>
        <article>
          <img src={Origin} alt="원산지" />
          <h3>원산지</h3>
          <p>{productQuery.data.origin}</p>
        </article>
        <article>
          <img src={Weight} alt="중량" />
          <h3>중량</h3>
          <p>{productQuery.data.capacity}g</p>
        </article>
        <article>
          <img src={Hashtag} alt="분류" />
          <h3>분류</h3>
          <p>{productQuery.data.category.join(", ")}</p>
        </article>
      </Title>
      <section>
        <Contents>
          <nav>
            <button
              type="button"
              onClick={() => setArticleState("detail")}
              className={articleState === "detail" ? "active" : undefined}
            >
              상세정보
            </button>
            <button
              type="button"
              onClick={() => setArticleState("contact")}
              className={articleState === "contact" ? "active" : undefined}
            >
              문의
            </button>
          </nav>
          {articleState === "detail" && <article>{description}</article>}
          {articleState === "contact" && <ContactContents />}
        </Contents>
      </section>
    </PageFrame>
  );
};

export default ProductDetailPage;

const Title = styled.article`
  figure {
    height: 224px;

    img {
      width: 100%;
      height: 100%;

      border-radius: 10px;

      ${({ theme }) => theme.common.boxShadow}
    }
  }

  .GIFT {
    background-color: #852999;
  }
  .NEW {
    background-color: #3e6d9c;
  }
  .BEST {
    background-color: #dc0000;
  }

  strong {
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 4px;

    color: ${({ theme }) => theme.colors.white};

    border-radius: 10px;
  }

  h2,
  > p {
    margin-top: 8px;
  }

  h2 {
    display: flex;
    align-items: center;
  }

  > p {
    padding-bottom: 8px;
    margin-bottom: 8px;

    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }

  article {
    margin-bottom: 8px;

    display: flex;

    :last-of-type {
      margin-bottom: 0;
    }

    img {
      width: 16px;
      height: 19px;
    }

    h3 {
      padding-right: 8px;
      margin-left: 8px;
      margin-right: 8px;

      min-width: 54.13px;

      border-right: 1px solid ${({ theme }) => theme.colors.grey};
    }
  }
`;

const Contents = styled.article`
  nav {
    margin-bottom: 8px;

    button {
      background-color: ${({ theme }) => theme.colors.white};

      width: 50%;
      height: 48px;

      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.darkGrey};

      cursor: pointer;
    }

    .active {
      border-bottom: 3px solid #2d84d5;
    }
  }

  p,
  img {
    margin-bottom: 8px;

    width: 100%;
  }
`;
