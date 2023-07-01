import Header from "../components/Header";
import Main from "../components/Main";
import Provider from "../components/Provider";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head />
      <body>
        <Provider>
          <Header />
          <Main>{children}</Main>
          {/* <Footer /> */}
        </Provider>
      </body>
    </html>
  );
}