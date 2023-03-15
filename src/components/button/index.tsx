import styled from "styled-components";

interface ButtonProps {
  labelText?: string;
  buttonType: "button" | "submit" | "error";
}

const Button = ({ labelText, buttonType }: ButtonProps) => {
  return (
    <Wrapper
      type={buttonType === "error" ? "button" : buttonType}
      buttonType={buttonType}
    >
      {labelText}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.white};

  padding: 8px;
  margin-top: 8px;

  width: 100%;

  ${({ theme }) =>
    (props) =>
      props.buttonType === "error" && `color: ${theme.colors.error}`};

  border: none;
  border-radius: 10px;

  ${({ theme }) => theme.common.boxShadow};
  ${({ theme }) => theme.common.hoverEffect};
`;
