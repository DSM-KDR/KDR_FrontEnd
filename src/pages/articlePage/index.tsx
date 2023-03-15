import styled from "styled-components";
import PageFrame from "../pageFrame";

interface ArticlePageProps {
  title: string;
  contents?: JSX.Element | JSX.Element[];
}

const ArticlePage = ({ title, contents }: ArticlePageProps) => {
  return (
    <PageFrame>
      <section>
        <article>
          <h2>{title}</h2>
        </article>
        {contents && <Contents>{contents}</Contents>}
      </section>
    </PageFrame>
  );
};

export default ArticlePage;

const Contents = styled.article`
  padding-top: 8px;
  margin-top: 8px;

  border-top: 1px solid ${({ theme }) => theme.colors.grey};
`;
