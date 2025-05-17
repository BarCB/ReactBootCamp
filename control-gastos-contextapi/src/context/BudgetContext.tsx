import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import {
    BudgetAction,
    BudgetReducer,
    BudgetState,
    initialState,
} from "../reducers/budget-reducer";
import { Expense } from "../types";

type BudgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetAction>;
    totalExpend: number;
    remainingBudget: number;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

type BudgetProviderProps = {
    children: ReactNode;
};

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(BudgetReducer, initialState);
    const totalExpend = useMemo(
        () =>
            state.expenses.reduce(
                (total:number, expense:Expense) => total + expense.amount,
                0
            ),
        [state.expenses]
    );
    const remainingBudget = state.budget - totalExpend;
    return (
        <BudgetContext.Provider
            value={{ state, dispatch, totalExpend, remainingBudget }}
        >
            {children}
        </BudgetContext.Provider>
    );
};
