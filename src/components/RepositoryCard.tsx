import { format } from "date-fns";

// icons
import { returnHexadecimalFromLanguages } from "@/utils/returnHexadecimalFromLanguages";
import { DisavowRepositoryButton } from "./DisavowRepositoryButton";
import { FavoriteRepositoryButton } from "./FavoriteRepositoryButton";

interface IRepositoryCardProps {
  title: string;
  description: string;
  principalLanguage: string;
  updatedAt: string;
  isFavorite: boolean;
  owner: string;
  loadDataAfterUpdate: () => void;
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

        <div className="mt-4 flex flex-col gap-1 md:flex-row md:gap-6">
          <div className="flex items-center gap-2">
            <div
              className={`size-4 rounded-full`}
              style={{
                backgroundColor:
                  returnHexadecimalFromLanguages(principalLanguage),
              }}
            />
            <span className="text-xs text-greyNeutral">
              {principalLanguage || "Não informado"}
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
          <FavoriteRepositoryButton
            owner={owner}
            repositoryName={title}
            loadDataAfterUpdate={loadDataAfterUpdate}
          />
        )}
      </div>
    </div>
  );
}
