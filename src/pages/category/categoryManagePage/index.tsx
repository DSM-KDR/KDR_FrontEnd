import styled from "styled-components";
import CategoryCard from "../../../components/card/category";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { SearchQueryAtomType } from "../../../types/searchQuery";
import { SearchQueryStateAtom } from "../../../atoms/searchQueryState";
import PageFrame from "../../pageFrame";
import useCategory from "../../../hooks/useCategory";
import SearchBar from "../../../components/searchBar";

const CategoryManagePage = () => {
  const categoryQuery = useCategory();

  const [searchQueryState, setSearchQueryState] =
    useRecoilState<SearchQueryAtomType>(SearchQueryStateAtom);

  const isLoading =
    categoryQuery.status === "loading" ||
    (categoryQuery.status !== "success" && !categoryQuery.data);

  return (
    <PageFrame
      goBackTo="/admin"
      goBackTitle="관리자 페이지"
      isLoading={isLoading}
      isAdminPage={true}
    >
      <Title>
        <strong>카테고리 목록</strong>
        <Link to="/admin/category/create">+ 카테고리 생성</Link>
      </Title>
      <SearchBar
        value={searchQueryState.category}
        setValue={(category) =>
          setSearchQueryState((prevState) => {
            return { ...prevState, category: category };
          })
        }
        refetch={() => setTimeout(() => categoryQuery.refetch(), 1)}
      />
      <hr />
      <Contents>
        <ul>
          {!isLoading &&
            categoryQuery.data.map((v) => (
              <CategoryCard key={`category${v.id}`} category={v} />
            ))}
        </ul>
      </Contents>
    </PageFrame>
  );
};

export default CategoryManagePage;

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
