import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
  &:disabled {
    opacity: 0.6;
    pointer-events: none;
    user-select: none;
  }

  ${props => sizes[props.size]}
  ${props => variations[props.variation]}
  ${props =>
    props.isLoading &&
    css`
      pointer-events: none;
      opacity: 0.85;
      &::before {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: var(--color-brand-600);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        height: 24px;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 4px solid var(--color-brand-100);
        border-right-color: transparent;
        animation: spin 0.6s linear infinite;
      }
    `}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
