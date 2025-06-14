import { LoadingSpinner } from "../../shared";
import { useLabels } from "../hooks";

interface Props {
  selectedLabels: string[];
  onLabelSelected: (label: string) => void;
}

export const LabelPicker = ({ selectedLabels, onLabelSelected }: Props) => {
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
            className={
              `animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white ${ selectedLabels.includes(label.name) ? "selected-label" : "" }`
            }
            key={ label.id }
            onClick={ () => onLabelSelected(label.name) }
            style={{ border: `1px solid #${label.color}`, color: '#ffccd3' }}
          >
            { label.name }
          </span>
        ))
      }
    </div>
  );
};
