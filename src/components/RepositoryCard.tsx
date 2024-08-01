import Image from "next/image";

// icons
import HearthFillIcon from "../../public/icons/hearth-fill.svg";
import HearthGrayIcon from "../../public/icons/hearth-gray.svg";

interface IRepositoryCardProps {
  title: string;
  description: string;
  principalLanguage: string;
  updatedAt: string;
  isFavorite: boolean;
}

export function RepositoryCard({
  title,
  description,
  principalLanguage,
  updatedAt,
  isFavorite,
}: IRepositoryCardProps) {
  return (
    <div className="flex justify-between rounded border border-line p-4">
      <div>
        <h2 className="text-lg font-semibold text-greyNeutral">{title}</h2>

        <p className="mt-[6px] max-w-[564px] text-sm text-greyNeutral">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-blue-500" />
            <span className="text-xs text-greyNeutral">
              {principalLanguage}
            </span>
          </div>

          <span className="text-xs text-greyNeutral">
            Updated on {updatedAt}
          </span>
        </div>
      </div>

      <div>
        {isFavorite ? (
          <button
            type={"button"}
            className="flex size-10 items-center justify-center rounded-full border border-primary transition-all hover:brightness-90"
          >
            <Image
              src={HearthFillIcon}
              alt={"Ícone de um coração preenchido na cor ver de água"}
            />
          </button>
        ) : (
          <button
            type={"button"}
            className="flex size-10 items-center justify-center rounded-full bg-whiteBackgroundMatte transition-all hover:brightness-90"
          >
            <Image
              src={HearthGrayIcon}
              alt={"Ícone de um coração na cor cinza"}
            />
          </button>
        )}
      </div>
    </div>
  );
}
