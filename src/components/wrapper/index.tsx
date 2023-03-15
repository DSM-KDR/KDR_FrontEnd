import styled from "styled-components";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children }: WrapperProps) => {
  return <Container>{children}</Container>;
};

export default Wrapper;

const Container = styled.main`
  padding-top: 48px;

  height: auto;
  min-height: calc(100vh - 112px);

  > form {
    margin-top: 8px;

    :first-child {
      margin-top: 16px;
    }
  }

  > article,
  > section,
  > aside,
  > form,
  > hr {
    margin-left: 5vw;
    margin-right: 5vw;
  }

  > article,
  > section,
  > aside,
  > figure,
  > hr {
    margin-top: 8px;
  }
`;
