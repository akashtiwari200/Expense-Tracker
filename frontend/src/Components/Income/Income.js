import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import IncomeFilter from './IncomeFilter'; // New component for filtering

function Income() {
  const { addIncome, incomes, getIncomes, deleteIncome } = useGlobalContext();
  const [filteredIncomes, setFilteredIncomes] = useState([]); // State for filtered incomes
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter
  const [startDateFilter, setStartDateFilter] = useState(''); // State for start date filter
  const [endDateFilter, setEndDateFilter] = useState(''); // State for end date filter
  const [singleDateFilter, setSingleDateFilter] = useState(''); // State for single date filter

  // Fetch incomes on component mount
  useEffect(() => {
    getIncomes();
  }, []);

  // Apply filters whenever incomes, categoryFilter, startDateFilter, endDateFilter, or singleDateFilter changes
  useEffect(() => {
    let filtered = incomes;

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter((income) => income.category === categoryFilter);
    }

    // Filter by single date
    if (singleDateFilter) {
      const selectedDate = new Date(singleDateFilter);
      filtered = filtered.filter((income) => {
        const incomeDate = new Date(income.date);
        // Strip time component for accurate comparison
        incomeDate.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
        return incomeDate.getTime() === selectedDate.getTime();
      });
    }

    // Filter by date range (if single date filter is not applied)
    if (startDateFilter && endDateFilter && !singleDateFilter) {
      const startDate = new Date(startDateFilter);
      const endDate = new Date(endDateFilter);

      filtered = filtered.filter((income) => {
        const incomeDate = new Date(income.date);
        // Strip time component for accurate comparison
        incomeDate.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        return incomeDate >= startDate && incomeDate <= endDate;
      });
    }

    // Update filtered incomes
    setFilteredIncomes(filtered);
  }, [incomes, categoryFilter, startDateFilter, endDateFilter, singleDateFilter]);

  // Calculate total income based on filteredIncomes
  const calculateTotalIncome = () => {
    return filteredIncomes.reduce((total, income) => total + income.amount, 0);
  };

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>

        {/* Filter Section */}
        <IncomeFilter
          onCategoryChange={setCategoryFilter}
          onStartDateChange={setStartDateFilter}
          onEndDateChange={setEndDateFilter}
          onSingleDateChange={setSingleDateFilter}
        />

        {/* Total Income */}
        <h2 className="total-income">
          Total Income: <span>₹{calculateTotalIncome()}</span>
        </h2>

        {/* Incomes Content */}
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {filteredIncomes.map((income) => {
              const { _id, title, amount, date, category, description, type } = income;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

// Styled Components
const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Income;