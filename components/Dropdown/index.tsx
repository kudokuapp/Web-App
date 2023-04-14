'use client';

import { useState } from 'react';
import { IDropdown } from './index.d';

const Dropdown: React.FC<IDropdown> = ({ options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<string>(options[0].value);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <select value={selectedValue} onChange={handleSelectChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
