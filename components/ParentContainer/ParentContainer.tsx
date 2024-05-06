import classNames from "classnames";
import { ReactNode, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties; 
};

export const ParentContainer = ({ children, className, style }: Props) => {
  return (
    <div
      className={classNames(
        "w-full px-[4%] md:px-[3%] lg:px-[3%] xl:px-[5%]",
        className
      )}
      style={style} 
    >
      {children}
    </div>
  );
};

