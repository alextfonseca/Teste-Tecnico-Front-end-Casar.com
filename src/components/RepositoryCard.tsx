import { format } from "date-fns";

// icons
import { IRepositoryProps } from "@/@types/response";
import { returnHexadecimalFromLanguages } from "@/utils/returnHexadecimalFromLanguages";
import { DisavowRepositoryButton } from "./DisavowRepositoryButton";
import { FavoriteRepositoryButton } from "./FavoriteRepositoryButton";

interface IRepositoryCardProps {
  repositoryData: IRepositoryProps;
  loadDataAfterUpdate: () => void;
}

export function RepositoryCard({
  repositoryData,
  loadDataAfterUpdate,
}: IRepositoryCardProps) {
  const updatedAtFormatted = format(
    new Date(repositoryData.updated_at),
    "dd MMM yyyy",
  );

  return (
    <div className="flex justify-between rounded border border-line p-4">
      <div className="w-full">
        <h2
          className="text-lg font-semibold text-greyNeutral"
          data-testid="repository-title"
        >
          {repositoryData.name}
        </h2>

        <p
          className="mt-[6px] max-w-none text-sm text-greyNeutral lg:max-w-[80%]"
          data-testid="repository-description"
        >
          {repositoryData.description}
        </p>

        <div className="mt-4 flex flex-col gap-1 md:flex-row md:gap-6">
          <div className="flex items-center gap-2">
            <div
              className={`size-4 rounded-full`}
              style={{
                backgroundColor: returnHexadecimalFromLanguages(
                  repositoryData.language,
                ),
              }}
            />
            <span className="text-xs text-greyNeutral">
              {repositoryData.language || "Não informado"}
            </span>
          </div>

          <span className="text-xs text-greyNeutral">
            Updated on {updatedAtFormatted}
          </span>
        </div>
      </div>

      <div>
        {repositoryData.isStarred ? (
          <DisavowRepositoryButton
            repositoryData={repositoryData}
            loadDataAfterUpdate={loadDataAfterUpdate}
          />
        ) : (
          <FavoriteRepositoryButton
            repositoryData={repositoryData}
            loadDataAfterUpdate={loadDataAfterUpdate}
          />
        )}
      </div>
    </div>
  );
}
