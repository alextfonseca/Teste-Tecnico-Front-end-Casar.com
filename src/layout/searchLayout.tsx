import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

interface ISearchLayoutProps {
  children: React.ReactElement;
}

export function SearchLayout({ children }: ISearchLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <div className="hidden lg:block">
        <Header />
      </div>
      {children}
      <div className="mt-auto block lg:hidden">
        <Navigation />
      </div>
    </div>
  );
}
