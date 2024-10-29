import { FC, ReactNode } from 'react';
import { Button as RizzButton } from 'rizzui'


type ButtonProps = {
  children: ReactNode;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  [key: string]: any;
};

const Button: FC<ButtonProps> = ({ children, handleClick, type = 'button', className = '', ...props }) => {
  return (
    <RizzButton
      type={type}
      onClick={handleClick}
      className={`${className} rounded-[16px] px-8 w-44 bg-playden-primary `}
      {...props}
    >
      {children}
    </RizzButton>
  );
};

export default Button;
