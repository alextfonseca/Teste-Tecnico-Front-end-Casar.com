import Image from "next/image";
import NoUsersFoundImage from "../../public/images/no-users-found.svg";

export function NoUsersFound() {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-semibold text-primary">“MHshdahsudl”</span>
      <h1 className="text-xl font-semibold text-greyNeutral">
        Nenhum usuário encontrado
      </h1>
      <p className="text-greyNeutral">
        Verifique se a escrita está correta ou tente novamente
      </p>

      <Image
        className="mt-8"
        src={NoUsersFoundImage}
        alt={"Ilustração de um ovni abduzindo um alien"}
      />
    </div>
  );
}
