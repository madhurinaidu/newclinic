import { MagnifyingGlass } from '@phosphor-icons/react';
import { AutoCompleteOptionItem } from './AutoComplete';
const OptionItem = ({
  item,
  onSelect,
}: {
  item: AutoCompleteOptionItem;
  onSelect: (item: AutoCompleteOptionItem) => void;
}) => {
  return (
    <div
      key={item.value}
      className="flex items-center py-3 px-3 hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={() => onSelect(item)}
    >
      <MagnifyingGlass className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
      {item.label}
    </div>
  );
};

export default OptionItem;
