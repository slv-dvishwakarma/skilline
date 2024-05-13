"use client";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface ProvidersInterface {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersInterface) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
