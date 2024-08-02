import Image from "next/image";
import NoUsersFoundImage from "../../public/images/no-users-found.svg";

interface INoUsersFoundProps {
  userName: string | null;
}

export function NoUsersFound({ userName }: INoUsersFoundProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-semibold text-primary">“{userName}”</span>
      <h1 className="text-xl font-semibold text-greyNeutral">
        Nenhum usuário encontrado
      </h1>
      <p className="text-center text-greyNeutral lg:text-left">
        Verifique se a escrita está correta ou tente novamente
      </p>

      <Image
        className="mt-8 hidden lg:block"
        src={NoUsersFoundImage}
        alt={"Ilustração de um ovni abduzindo um alien"}
      />
    </div>
  );
}
