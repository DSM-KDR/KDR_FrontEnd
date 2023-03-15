import { Menu } from "../../assets/images";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../dropdown";

const Navbar = () => {
  const [hideNavbarState, setHideNavbarState] = useState<boolean>(false);
  const [showDropdownState, setShowDropdownState] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    let prevScrollTop = 0;
    const toggleHeader = () => {
      const nextScrollTop = window.pageYOffset || 0;
      if (prevScrollTop > 45 && nextScrollTop > prevScrollTop) {
        setHideNavbarState(true);
      } else if (nextScrollTop < prevScrollTop) {
        setHideNavbarState(false);
      }
      prevScrollTop = nextScrollTop;
    };
    document.addEventListener("scroll", toggleHeader);
    return () => document.removeEventListener("scroll", toggleHeader);
  }, []);

  return (
    <header>
      <Wrapper
        hideNavbarState={showDropdownState === true ? false : hideNavbarState}
      >
        <button
          title="메뉴"
          type="button"
          onClick={() => {
            setShowDropdownState(!showDropdownState);
          }}
        >
          <img src={Menu} alt="메뉴" />
        </button>
        <h1 onClick={() => navigate("/")}>키다리아저씨</h1>
      </Wrapper>
      {showDropdownState && (
        <Dropdown setShowDropdownState={setShowDropdownState} />
      )}
    </header>
  );
};

export default Navbar;

interface WrapperProps {
  hideNavbarState: boolean;
}

const Wrapper = styled.nav<WrapperProps>`
  background-color: ${({ theme }) => theme.colors.main};

  position: fixed;
  ${(props) => (props.hideNavbarState ? `top: -48px;` : "top: 0;")}
  left: 0;

  padding-left: 5vw;
  padding-right: 5vw;

  width: 100vw;
  height: 48px;

  display: flex;
  align-items: center;

  transition: top 0.25s ease;
  z-index: 99;

  > button {
    background-color: transparent;

    position: absolute;

    width: 20px;
    height: 20px;

    border: none;

    ${({ theme }) => theme.common.hoverEffect}
  }

  > h1 {
    margin: auto;

    color: ${({ theme }) => theme.colors.white};
    font-family: "NP";

    ${({ theme }) => theme.common.hoverEffect}
  }
`;
