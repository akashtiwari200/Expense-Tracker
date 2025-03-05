import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import ExpenseFilter from './ExpenseFilter';

function Expenses() {
  const { expenses, getExpenses, deleteExpense } = useGlobalContext();
  const [filteredExpenses, setFilteredExpenses] = useState([]); // State for filtered expenses
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter
  const [startDateFilter, setStartDateFilter] = useState(''); // State for start date filter
  const [endDateFilter, setEndDateFilter] = useState(''); // State for end date filter
  const [singleDateFilter, setSingleDateFilter] = useState(''); // State for single date filter

  // Fetch expenses on component mount
  useEffect(() => {
    getExpenses();
  }, []);

  // Apply filters whenever expenses, categoryFilter, startDateFilter, endDateFilter, or singleDateFilter changes
  useEffect(() => {
    let filtered = expenses;

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter((expense) => expense.category === categoryFilter);
    }

    // Filter by single date
    if (singleDateFilter) {
      const selectedDate = new Date(singleDateFilter);
      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.date);
        // Strip time component for accurate comparison
        expenseDate.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
        return expenseDate.getTime() === selectedDate.getTime();
      });
    }

    // Filter by date range (if single date filter is not applied)
    if (startDateFilter && endDateFilter && !singleDateFilter) {
      const startDate = new Date(startDateFilter);
      const endDate = new Date(endDateFilter);

      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.date);
        // Strip time component for accurate comparison
        expenseDate.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        return expenseDate >= startDate && expenseDate <= endDate;
      });
    }

    // Update filtered expenses
    setFilteredExpenses(filtered);
  }, [expenses, categoryFilter, startDateFilter, endDateFilter, singleDateFilter]);

  // Calculate total expenses based on filteredExpenses
  const calculateTotalExpenses = () => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>

        {/* Filter Section */}
        <ExpenseFilter
          onCategoryChange={setCategoryFilter}
          onStartDateChange={setStartDateFilter}
          onEndDateChange={setEndDateFilter}
          onSingleDateChange={setSingleDateFilter}
        />

        {/* Total Expenses */}
        <h2 className="total-income">
          Total Expense: <span>₹{calculateTotalExpenses()}</span>
        </h2>

        {/* Expenses Content */}
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {filteredExpenses.map((income) => {
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
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

// Styled Components
const ExpenseStyled = styled.div`
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

export default Expenses;