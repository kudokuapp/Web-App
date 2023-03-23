import { RenderCategory } from '$components/OneTransaction/atomic/RenderCategory';
import expenseCategory from '$utils/category/expense';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type Option = {
  name: string;
  icon: IconDefinition;
};

type Props = {
  initialOption: string;
  // eslint-disable-next-line no-unused-vars
  onCategorySelect: (category: string) => void;
};

const ExpenseCategoryDropdown: React.FC<Props> = ({
  initialOption,
  onCategorySelect,
}) => {
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions: { category: string; options: Option[] }[] =
    Object.entries(expenseCategory)
      .map(([category, options]) => ({
        category,
        options: options.filter(({ name }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter(({ options }) => options.length > 0);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onCategorySelect(option);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const renderCategoryColor = (category: string) => {
    switch (category) {
      case 'Good Life':
        return 'text-yellow-500';

      case 'Personal':
        return 'text-orange-500';

      case 'Home':
        return 'text-purple-500';

      case 'Transport':
        return 'text-blue-500';

      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="w-fit h-fit">
        <RenderCategory category={selectedOption} select={true} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full w-full z-10 bg-white border rounded-md shadow-md overflow-y-auto max-h-60"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="p-4 mb-4">
              <div className="px-4 py-2 flex items-center gap-4 text-onPrimaryContainer w-full border rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500">
                <FontAwesomeIcon icon={faSearch} />
                <input
                  className="focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  // onFocus={() => setIsOpen(true)}
                  // onBlur={() => setIsOpen(false)}
                />
              </div>
            </div>
            {filteredOptions.map(({ category, options }) => (
              <div key={category} className="p-4">
                <h4
                  className={`${renderCategoryColor(
                    category
                  )} uppercase font-bold`}
                >
                  {category}
                </h4>
                <ul className="mt-2">
                  {options.map(({ name, icon }) => (
                    <li
                      key={name}
                      className={`flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer ${
                        selectedOption === name ? 'bg-primary' : ''
                      }`}
                      onClick={() => handleSelectOption(name)}
                    >
                      <div className="w-[20px] h-[20px]">
                        <FontAwesomeIcon
                          icon={icon}
                          className={`${
                            selectedOption === name
                              ? 'text-onPrimary'
                              : 'text-gray-500'
                          }`}
                        />
                      </div>
                      <span
                        className={`${
                          selectedOption === name
                            ? 'text-onPrimary'
                            : 'text-onPrimaryContainer'
                        }`}
                      >
                        {name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseCategoryDropdown;
