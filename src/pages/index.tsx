import { Inter } from "next/font/google";
import LoginPage from "@/Components/login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <LoginPage />
    </>
  );
}
