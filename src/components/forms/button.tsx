import { FC, ReactNode } from 'react';
import { Button as RizzButton } from 'rizzui'


type ButtonProps = {
  children: ReactNode;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const Button: FC<ButtonProps> = ({ children, handleClick, type = 'button', className = '' }) => {
  return (
    <RizzButton
      type={type}
      onClick={handleClick}
      className={`${className} rounded-[16px] px-8`}
    >
      {children}
    </RizzButton>
  );
};

export default Button;
