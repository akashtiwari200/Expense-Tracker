import React from 'react';
import styled from 'styled-components';

const ExpenseFilter = ({
  onCategoryChange,
  onStartDateChange,
  onEndDateChange,
  onSingleDateChange,
}) => {
  return (
    <FilterContainer>
      {/* Category Dropdown */}
      <StyledSelect onChange={(e) => onCategoryChange(e.target.value)}>
        <StyledOption value="">All Categories</StyledOption>
        <StyledOption value="education">Education</StyledOption>
        <StyledOption value="groceries">Groceries</StyledOption>
        <StyledOption value="health">Health</StyledOption>
        <StyledOption value="subscriptions">Subscriptions</StyledOption>
        <StyledOption value="takeaways">Takeaways</StyledOption>
        <StyledOption value="clothing">Clothing</StyledOption>
        <StyledOption value="travelling">Travelling</StyledOption>
        <StyledOption value="other">Other</StyledOption>
      </StyledSelect>

      {/* Single Date Input */}
      <StyledInput
        type="date"
        onChange={(e) => onSingleDateChange(e.target.value)}
        placeholder="Select Date"
      />

      {/* Start Date Input */}
      <StyledInput
        type="date"
        onChange={(e) => onStartDateChange(e.target.value)}
        placeholder="Start Date"
      />

      {/* End Date Input */}
      <StyledInput
        type="date"
        onChange={(e) => onEndDateChange(e.target.value)}
        placeholder="End Date"
      />
    </FilterContainer>
  );
};

// Styled Components
const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const StyledSelect = styled.select`
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  &:hover {
    border-color: #888;
  }
`;

const StyledOption = styled.option`
  padding: 10px;
  font-size: 16px;
  background-color: #fff;
  color: #333;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  &:hover {
    border-color: #888;
  }
`;

export default ExpenseFilter;