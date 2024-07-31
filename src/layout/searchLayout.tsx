import { Header } from "@/components/Header";

interface ISearchLayoutProps {
  children: React.ReactElement;
}

export function SearchLayout({ children }: ISearchLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      {children}
    </div>
  );
}
