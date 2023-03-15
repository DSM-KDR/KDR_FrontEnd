import { Link } from "react-router-dom";
import styled from "styled-components";
import { CategoryType } from "../../../types/category/loadList/response";

interface CategoryCardProps {
  category: CategoryType;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Wrapper>
      <Link to={`/admin/category/${category.id}`}>
        <img src={category.image} alt={category.category} />
        <h3>{category.category}</h3>
      </Link>
    </Wrapper>
  );
};

export default CategoryCard;

const Wrapper = styled.li`
  width: calc(33% - 4.75px);

  a {
    padding: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 10px;

    ${({ theme }) => theme.common.boxShadow}

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
      margin-top: 8px;

      font-size: ${({ theme }) => theme.fontSizes.subText};
    }
  }
`;
