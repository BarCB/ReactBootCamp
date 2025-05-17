import { useMemo } from "react";
import useBudget from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
    const { state } = useBudget();
    const filteredExpense = useMemo(
        () =>
            state.categoryIdFilter
                ? state.expenses.filter(
                      (expense) => expense.category === state.categoryIdFilter
                  )
                : state.expenses,
        [state.categoryIdFilter, state.expenses]
    );

    const isEmpty = useMemo(
        () => filteredExpense.length === 0,
        [filteredExpense]
    );
    return (
        <div className="mt-10">
            {isEmpty ? (
                <p className="text-gray-600 text-2xl font-bold">
                    No hay gastos
                </p>
            ) : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">
                        Listado de Gastos
                    </p>
                    {filteredExpense.map((expense) => (
                        <ExpenseDetail key={expense.id} expense={expense} />
                    ))}
                </>
            )}
        </div>
    );
}
