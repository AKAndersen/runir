import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar"; // import your navbar
import Footer from "../components/Footer"; // import your navbar

export default function App({ Component, pageProps }: AppProps) {
    return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}
