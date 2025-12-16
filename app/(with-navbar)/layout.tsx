import { ReactNode } from "react";
import NavBar from "../components/navbar";
import Header from "../components/header";

export default function Layout({ children }: { children: ReactNode }) {
  return <div><Header />{children}<NavBar /></div>;
}
