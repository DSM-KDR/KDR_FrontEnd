import styled from "styled-components";

interface SpinnerProps {
  displayType: "cover" | "contain";
}

const Spinner = ({ displayType }: SpinnerProps) => {
  return (
    <Wrapper displayType={displayType}>
      <canvas />
    </Wrapper>
  );
};

export default Spinner;

const Wrapper = styled.div<SpinnerProps>`
  ${(props) =>
    props.displayType === "cover" &&
    `position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;`}

  background-color: ${({ theme }) => theme.colors.translucent};

  ${(props) =>
    props.displayType === "contain" &&
    `margin-top: 8px;
  margin-left: 5vw;
  margin-right: 5vw;

  width: calc(100% - 10vw);
  height: 80px;

  border-radius: 10px;`}

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;

  canvas {
    position: absolute;

    width: 48px;
    height: 48px;

    border-radius: 50%;
    border: 3px solid ${({ theme }) => theme.colors.white};
    border-top: 3px solid ${({ theme }) => theme.colors.translucent};

    animation: spinner 2s linear infinite;
  }

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
