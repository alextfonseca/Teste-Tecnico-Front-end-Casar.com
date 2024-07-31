import { Header } from "@/components/header";

interface ISearchLayoutProps {
  children: React.ReactElement;
}

export function SearchLayout({ children }: ISearchLayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
