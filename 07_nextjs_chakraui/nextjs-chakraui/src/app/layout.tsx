import Header from "../components/Header";
import Main from "../components/Main";
import Provider from "../components/Provider";
import "./globals.css";

export const metadata = {
  title: "MapApp",
  description: "Create map for drone",
  themeColor: "rgb(255, 101, 117)",
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
