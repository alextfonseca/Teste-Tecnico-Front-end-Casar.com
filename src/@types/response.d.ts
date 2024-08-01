export interface IRepositoryProps {
  id: number;
  name: string;
  description: string;
  language: string;
  updated_at: string;
  owner: {
    login: string;
  };
}

export interface IUserDataProps {
  id: number;
  avatar_url: string;
  bio: string;
  login: string;
  name: string;
}
