import { ReactNode } from "react";
import './Profile.css';

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="profileContainer">
      {children}
    </h1>
  );
}
