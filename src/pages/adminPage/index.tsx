import { Link } from "react-router-dom";
import styled from "styled-components";
import PageFrame from "../pageFrame";

const AdminPage = () => {
  return (
    <PageFrame
      goBackTo="/"
      goBackTitle="홈페이지"
      pageHeadTitle="관리자 페이지"
      pageHeadDescription="외부인 출입이 제한된 페이지입니다."
    >
      <hr />
      <Contents>
        <ul>
          <li>
            <Link to="/admin/notice">
              <h2>공지사항 관리</h2>
              <p>공지사항을 생성, 수정, 삭제합니다.</p>
            </Link>
          </li>
          <li>
            <Link to="/admin/product">
              <h2>상품 관리</h2>
              <p>상품을 생성, 수정, 삭제합니다.</p>
            </Link>
          </li>
          <li>
            <Link to="/admin/category">
              <h2>카테고리 관리</h2>
              <p>카테고리를 생성, 삭제합니다.</p>
            </Link>
          </li>
        </ul>
      </Contents>
    </PageFrame>
  );
};

export default AdminPage;

const Contents = styled.article`
  ul {
    list-style: none;
  }

  li {
    background-color: ${({ theme }) => theme.colors.white};

    padding: 8px;
    margin-bottom: 8px;

    border-radius: 10px;

    ${({ theme }) => theme.common.boxShadow}

    :last-of-type {
      margin-bottom: 0;
    }

    h2 {
      font-size: ${({ theme }) => theme.fontSizes.text};
    }

    p {
      margin-top: 4px;

      color: ${({ theme }) => theme.colors.darkGrey};
      font-size: ${({ theme }) => theme.fontSizes.subText};
    }
  }
`;
