import React, { useState, ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
  component: React.ComponentType;
}

interface GenericDropdownProps {
  options: Option[];
}

const GenericDropdown: React.FC<GenericDropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault(); // Prevent default form submission
    setSelectedOption(event.target.value);
  };

  const renderComponent = (option: Option | undefined) => {
    if (!option) return null;

    const Component = option.component;
    return <Component />;
  };

  return (
    <div className='p-5 space-y-5 shadow-[rgba(149,157,165,0.2)_0px_8px_24px] mt-5 rounded-md'>
      <h3 className='text-[22px] font-semibold text-secondary'>Select Component</h3>
      <select id="generic-dropdown-select" className='border rounded-md border-solid border-[#BEBEBE] w-full p-[10px] focus:outline-none' value={selectedOption} onChange={handleSelectChange}>
        <option value="">Choose an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div style={{ marginTop: '20px' }}>
        {renderComponent(options.find((option) => option.value === selectedOption))}
      </div>
    </div>
  );
};

export default GenericDropdown;
