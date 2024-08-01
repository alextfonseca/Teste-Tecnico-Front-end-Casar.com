interface ISearchLayoutProps {
  children: React.ReactElement;
}

export function SearchLayout({ children }: ISearchLayoutProps) {
  return <div className="flex h-screen flex-col">{children}</div>;
}
