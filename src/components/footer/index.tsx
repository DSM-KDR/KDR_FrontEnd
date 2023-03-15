import { Link } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "../../assets/images";

const Footer = () => {
  return (
    <Wrapper>
      <aside>
        <Link to="/notice">공지사항</Link>
        <Link to="/product">제품소개</Link>
        <Link to="/contact">고객센터</Link>
      </aside>
      <article>
        <img src={Logo} alt="키다리아저씨 푸드 로고" width="48" height="48" />
        <div>
          <div>
            <Link to="/pouec">이메일 무단 수집 거부</Link>
            <Link to="/contact">고객센터</Link>
            <Link to="/admin">관리자 페이지</Link>
          </div>
          <p>Copyright 2023. 키다리아저씨 Co. all rights reserved.</p>
        </div>
      </article>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.main};

  height: 112px;

  > aside a {
    width: 33.333%;
    height: 32px;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${({ theme }) => theme.colors.grey};

    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.subText};

    ${({ theme }) => theme.common.hoverEffect}

    :nth-of-type(2) {
      border-left: none;
      border-right: none;
    }
  }

  article {
    padding: 16px;
    padding-left: 5vw;
    padding-right: 5vw;

    height: 80px;

    display: flex;

    img {
      border-radius: 50%;
    }

    > div {
      margin-left: 8px;

      display: flex;
      flex-direction: column;

      div {
        margin-bottom: 8px;

        display: flex;

        a {
          padding-right: 8px;
          margin-right: 8px;

          color: ${({ theme }) => theme.colors.grey};

          border-right: 1px solid ${({ theme }) => theme.colors.grey};

          :last-of-type {
            padding-right: 0;
            margin-right: 0;

            border-right: none;
          }
        }
      }
    }

    p {
      color: ${({ theme }) => theme.colors.white};
      font-size: ${({ theme }) => theme.fontSizes.subText};
    }
  }
`;
