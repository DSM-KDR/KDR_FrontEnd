import { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useNotice from "../../../hooks/useNotice";
import { paraphraseText } from "../../../libs/utils/paraphraseText";
import PageFrame from "../../pageFrame";

const NoticeDetailPage = () => {
  const params = useParams();
  const noticeQuery = useNotice({ id: params.id });

  const description = useMemo(
    () => noticeQuery.data && paraphraseText(noticeQuery.data.content),
    [noticeQuery.data]
  );
  const isLoading =
    noticeQuery.status === "loading" ||
    (noticeQuery.status !== "success" && !noticeQuery.data);

  return (
    <PageFrame goBackTo="/notice" goBackTitle="공지사항" isLoading={isLoading}>
      <section>
        <Title>
          <h2>{noticeQuery.data && noticeQuery.data.title}</h2>
          <p>게시일: {noticeQuery.data && noticeQuery.data.date}</p>
        </Title>
        <Contents>{description}</Contents>
      </section>
    </PageFrame>
  );
};

export default NoticeDetailPage;

const Title = styled.article`
  padding-bottom: 8px;
  margin-bottom: 8px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};

  p {
    margin-top: 8px;

    color: ${({ theme }) => theme.colors.darkGrey};
    font-size: ${({ theme }) => theme.fontSizes.subText};
  }
`;

const Contents = styled.article`
  p,
  img {
    margin-bottom: 8px;

    width: 100%;
  }
`;
