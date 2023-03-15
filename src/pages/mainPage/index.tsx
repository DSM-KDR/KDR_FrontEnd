import CategoryCollection from "../../components/collection/category";
import PageFrame from "../pageFrame";
import ProductCollection from "../../components/collection/product";
import Banner from "../../components/banner";
import NoticeCollection from "../../components/collection/notice";
import SearchBar from "../../components/searchBar";
import { useRecoilState } from "recoil";
import { SearchQueryAtomType } from "../../types/searchQuery";
import { SearchQueryStateAtom } from "../../atoms/searchQueryState";

const MainPage = () => {
  const [searchQueryState, setSearchQueryState] =
    useRecoilState<SearchQueryAtomType>(SearchQueryStateAtom);

  return (
    <PageFrame>
      <SearchBar
        value={searchQueryState.main}
        setValue={(main) =>
          setSearchQueryState((prevState) => {
            return { ...prevState, main: main };
          })
        }
      />
      <NoticeCollection />
      <Banner />
      <CategoryCollection />
      <hr />
      <ProductCollection />
    </PageFrame>
  );
};

export default MainPage;
