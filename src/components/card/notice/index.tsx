import { Link } from "react-router-dom";
import styled from "styled-components";
import { ShortenedNoticeType } from "../../../types/notice/loadList/response";

interface NoticeCardProps {
  notice: ShortenedNoticeType;
  isAdminPage?: boolean;
  refObj: (node?: Element) => void;
}

const NoticeCard = ({ notice, isAdminPage, refObj }: NoticeCardProps) => {
  const imgSrc: string =
    notice.preview.startsWith("[") &&
    notice.preview.endsWith("]") &&
    notice.preview.replace(/\[|\]/g, "");

  return (
    <Wrapper ref={refObj}>
      <Link to={`${isAdminPage ? "/admin" : ""}/notice/${notice.id}`}>
        {imgSrc ? (
          <>
            <img src={imgSrc} alt={notice.title} />
            <h3>{notice.title}</h3>
            <span>게시일: {notice.date}</span>
          </>
        ) : (
          <>
            <h3>{notice.title}</h3>
            <span>게시일: {notice.date}</span>
          </>
        )}
      </Link>
    </Wrapper>
  );
};

export default NoticeCard;

const Wrapper = styled.li`
  padding-bottom: 8px;
  margin-bottom: 8px;

  width: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};

  a {
    padding: 8px;

    display: flex;
    flex-direction: column;

    ${({ theme }) => theme.common.boxShadow}

    :hover {
      filter: brightness(100%);
    }

    img {
      margin-bottom: 8px;

      height: 200px;

      border-radius: 10px;
    }

    h3 {
      margin-bottom: 8px;
    }
  }
`;
