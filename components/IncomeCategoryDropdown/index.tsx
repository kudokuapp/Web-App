'use client';

import incomeCategory from '$utils/kudoku/category/income';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import RenderCategory from '../RenderCategory';
import type { IIncomeCategoryDropdown } from './index.d';

const IncomeCategoryDropdown: React.FC<IIncomeCategoryDropdown> = ({
  initialOption,
  onCategorySelect,
}) => {
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = incomeCategory.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onCategorySelect(option);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="w-fit h-fit">
        <RenderCategory category={selectedOption} select={true} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full w-96 z-10 bg-white border rounded-md shadow-md overflow-y-auto max-h-60"
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

            <div className="p-4">
              <h4 className={`text-green-600 uppercase font-bold`}>Income</h4>

              <ul className="mt-2">
                {filteredOptions.map(({ name, icon }, index) => {
                  return (
                    <li
                      key={index}
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
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IncomeCategoryDropdown;
