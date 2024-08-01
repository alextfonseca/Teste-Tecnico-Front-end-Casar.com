import { format } from "date-fns";
import Image from "next/image";

// icons
import HearthGrayIcon from "../../public/icons/hearth-gray.svg";
import { DisavowRepositoryButton } from "./DisavowRepositoryButton";

interface IRepositoryCardProps {
  title: string;
  description: string;
  principalLanguage: string;
  updatedAt: string;
  isFavorite: boolean;
  owner: string;
  loadDataAfterUpdate?: () => void;
}

export function RepositoryCard({
  title,
  description,
  principalLanguage,
  updatedAt,
  isFavorite,
  owner,
  loadDataAfterUpdate,
}: IRepositoryCardProps) {
  const updatedAtFormatted = format(new Date(updatedAt), "dd MMM yyyy");

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
            Updated on {updatedAtFormatted}
          </span>
        </div>
      </div>

      <div>
        {isFavorite ? (
          <DisavowRepositoryButton
            repositoryName={title}
            owner={owner}
            loadDataAfterUpdate={loadDataAfterUpdate}
          />
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
