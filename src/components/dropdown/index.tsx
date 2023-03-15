import { Link } from "react-router-dom";
import styled from "styled-components";

interface DropdownProps {
  setShowDropdownState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown = ({ setShowDropdownState }: DropdownProps) => {
  return (
    <>
      <Filter onClick={() => setShowDropdownState(false)} />
      <Wrapper>
        <li>
          <Link to="/notice">공지사항</Link>
        </li>
        <li>
          <Link to="/product">제품소개</Link>
        </li>
        <li>
          <Link to="/contact">고객센터</Link>
        </li>
      </Wrapper>
    </>
  );
};

export default Dropdown;

const Filter = styled.div`
  position: fixed;

  background-color: ${({ theme }) => theme.colors.translucent};

  width: 100vw;
  height: 100vh;

  z-index: 98;
`;

const Wrapper = styled.ul`
  position: fixed;
  top: 48px;

  background-color: ${({ theme }) => theme.colors.bg1f};

  width: 100%;

  z-index: 99;

  > li {
    background-color: ${({ theme }) => theme.colors.bg1f};

    :nth-of-type(2n) {
      background-color: ${({ theme }) => theme.colors.bg2f};
    }

    > a {
      padding-left: 5vw;
      padding-right: 5vw;

      width: 100%;
      height: 36px;

      display: flex;
      align-items: center;

      color: ${({ theme }) => theme.colors.white};
      font-size: ${({ theme }) => theme.fontSizes.text};
    }
  }
`;
