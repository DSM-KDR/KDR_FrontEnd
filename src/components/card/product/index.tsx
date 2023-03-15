import { Link } from "react-router-dom";
import styled from "styled-components";
import { ShortenedProductType } from "../../../types/product/loadList/response";

interface ProductCardProps {
  product: ShortenedProductType;
  isAdminPage?: boolean;
  refObj: (node?: Element) => void;
}

const ProductCard = ({ product, isAdminPage, refObj }: ProductCardProps) => {
  return (
    <Wrapper ref={refObj}>
      <Link to={`${isAdminPage ? "/admin" : ""}/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
    </Wrapper>
  );
};

export default ProductCard;

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
