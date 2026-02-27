import { Header } from "@/layout/header";
import { Footer } from "@/layout/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="">
        {children}
      </main>
      <Footer />
    </>
  );
}
