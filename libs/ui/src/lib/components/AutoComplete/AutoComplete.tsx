'use client';
import { AnimatePresence, motion } from 'framer-motion'; // Import AnimatePresence
import PropTypes from 'prop-types'; // Import PropTypes
import { useEffect, useRef, useState } from 'react';
import { Input, InputProps } from '../Input/Input';
import OptionItem from './OptionItem'; // Import the new OptionItem component

// Define types for the options
export type AutoCompleteOptionItem = {
  value: string; // Adjust type as necessary
  label: string;
};

type OptionSection = {
  label: string;
  items: AutoCompleteOptionItem[];
};

const AutoComplete = ({
  options,
  placeholder = 'Search...',
  withSection = false,
  inputProps,
  onSelect,
}: {
  options?: AutoCompleteOptionItem[] | OptionSection[];
  placeholder?: string;
  withSection?: boolean;
  inputProps?: InputProps;
  onSelect?: (item: AutoCompleteOptionItem) => void;
}) => {
  const [selectedOption, setSelectedOption] =
    useState<AutoCompleteOptionItem | null>(null); // Track selected option
  const [inputValue, setInputValue] = useState(
    selectedOption ? selectedOption.label : ''
  ); // Initialize inputValue with selectedOption
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown

  const handleInputClick = () => {
    handleInputFocus(); // Call handleInputFocus to open dropdown on click
  };

  const handleInputFocus = () => {
    setIsOpen(true); // Open dropdown on input focus
  };

  const handleInputBlur = () => {
    setIsOpen(false); // Close dropdown on input blur
  };

  const handleOptionSelect = (item: AutoCompleteOptionItem) => {
    // Function to handle option selection
    setSelectedOption(item);
    setInputValue(item.label); // Set input value to selected option label
    setIsOpen(false); // Close the dropdown
    onSelect?.(item);
  };

  //   const filteredOptions = (options || []).flatMap((section) => {
  //     // Check if section is of type OptionSection
  //     if ('items' in section) {
  //       return section.items
  //         .filter((item) =>
  //           item.label.toLowerCase().includes(inputValue.toLowerCase())
  //         )
  //         .map((item) => ({ ...item, sectionLabel: section.label }));
  //     }
  //     return []; // Return an empty array if section is not OptionSection
  //   });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative text-left text-gray-900 dark:text-gray-300`}
    >
      <Input
        type="text"
        value={inputValue}
        onClick={handleInputClick}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        {...inputProps}
      />
      <AnimatePresence>
        {isOpen && options && options.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            style={{ top: 'calc(100% + 9px)' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} // Exit animation
            transition={{ duration: 0.2 }} // Optional: control the duration of the animation
            className="absolute z-10 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg"
          >
            {withSection && Array.isArray(options) && options.length > 0
              ? options.map((section) => {
                  // Type guard to check if section is OptionSection
                  if ('items' in section) {
                    const sectionItems = section.items.filter((item) =>
                      item.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    );

                    return sectionItems.length > 0 ? (
                      <div key={section.label}>
                        <h3 className="font-normal text-sm p-2 px-3 bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          {section.label}
                        </h3>
                        {sectionItems.map((item) => (
                          <OptionItem
                            key={item.value}
                            item={item}
                            onSelect={handleOptionSelect}
                          /> // Use OptionItem component
                        ))}
                      </div>
                    ) : null;
                  }
                  return null; // Ensure a value is returned for non-OptionSection
                })
              : (options as AutoCompleteOptionItem[])
                  .filter((item) =>
                    item.label.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((item) => (
                    <OptionItem
                      key={item.value}
                      item={item}
                      onSelect={handleOptionSelect}
                    /> // Use OptionItem component
                  ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Add prop types validation
AutoComplete.propTypes = {
  options: PropTypes.array.isRequired,
};

export default AutoComplete;
