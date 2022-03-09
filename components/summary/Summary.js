import { useState, useEffect, useCallback } from "react";
import ExpenseTable from "./ExpenseTable";
import IncomeStats from "./IncomeStats";
import { Stack } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

export default function Summary() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /******************** DISPLAY FUNCS ********************/
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const accumAnnualAmount = (items) =>
    items.reduce((sum, i) => i.annualAmountNum + sum, 0);
  const calcAnnualAmount = (amount, frequency) => {
    switch (frequency) {
      case "daily":
        return amount * 365;
      case "weekly":
        return amount * 52;
      case "biweekly":
        return amount * 26;
      case "monthly":
        return amount * 12;
      case "annually":
        return amount;
      default:
        return amount;
    }
  };
  const calcRemainingBalance = (incomes, expenses) => {
    return accumAnnualAmount(incomes) - accumAnnualAmount(expenses);
  };

  /******************** DATA SETUP ********************/
  const fetchBudgetHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // TODO: get user id
    try {
      const userId = "1";
      const response = await fetch(`/api/summary/${userId}`);
      if (!response.ok) throw new Error("Failed to get user budget data");
      const data = await response.json();

      const loadedIncomes = [];
      for (const key in data.incomes) {
        let income = data.incomes[key];
        loadedIncomes.push({
          id: key,
          name: income.name,
          amountNum: income.amount,
          amount: formatter.format(income.amount),
          frequency: income.frequency,
          annualAmountNum: calcAnnualAmount(income.amount, income.frequency),
          annualAmount: formatter.format(
            calcAnnualAmount(income.amount, income.frequency)
          ),
        });
      }
      setIncomes(loadedIncomes);

      const loadedExpenses = [];
      for (const key in data.expenses) {
        let expense = data.expenses[key];
        loadedExpenses.push({
          id: key,
          name: expense.name,
          amountNum: expense.amount,
          amount: formatter.format(expense.amount),
          frequency: expense.frequency,
          category: expense.category,
          annualAmountNum: calcAnnualAmount(expense.amount, expense.frequency),
          annualAmount: formatter.format(
            calcAnnualAmount(expense.amount, expense.frequency)
          ),
        });
      }
      setExpenses(loadedExpenses);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBudgetHandler();
  }, [fetchBudgetHandler]);

  const [isSmallScreen] = useMediaQuery("(max-width: 1280px)");

  return (
    <Stack
      direction={isSmallScreen ? "column" : "row"}
      padding="1rem"
      spacing="1rem"
      justify="space-around"
    >
      <ExpenseTable expenses={expenses} />
      <IncomeStats
        incomes={incomes}
        totalIncome={formatter.format(accumAnnualAmount(incomes))}
        remainingBalance={formatter.format(
          calcRemainingBalance(incomes, expenses)
        )}
      />
    </Stack>
  );
}
