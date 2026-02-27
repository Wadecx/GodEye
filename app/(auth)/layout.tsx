import { montserrat } from "@/utils/fonts";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${montserrat.variable}`}>
      {children}
    </div>
  );
}
