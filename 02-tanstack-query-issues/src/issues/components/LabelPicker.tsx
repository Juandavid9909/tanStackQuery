import { LoadingSpinner } from "../../shared";
import { useLabels } from "../hooks/useLabels";

export const LabelPicker = () => {
  const { labelsQuery } = useLabels();

  if(labelsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-52">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {
        labelsQuery.data?.map((label) => (
          <span
            className="animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white"
            key={ label.id }
            style={{ border: `1px solid #${label.color}`, color: '#ffccd3' }}
          >
            { label.name }
          </span>
        ))
      }
    </div>
  );
};
