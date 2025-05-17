import { v4 } from "uuid";
import { DraftExpense, Expense } from "../types";

export type BudgetAction =
    | { type: "add-butget"; payload: { budget: number } }
    | { type: "show-modal" }
    | { type: "close-modal" }
    | { type: "add-expense"; payload: { expense: DraftExpense } }
    | { type: "remove-expense"; payload: { expenseId: Expense["id"] } }
    | { type: "get-expense-by-id"; payload: { expenseId: Expense["id"] } }
    | { type: "edit-expense"; payload: { expense: Expense } }
    | { type: "reset-app" }
    | { type: "filter-expenses"; payload: { categoryId: string}};

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingId: Expense["id"];
    categoryIdFilter: String;
};

const BudgetInit = () => {
    const localStorageBudget = localStorage.getItem("budget");
    return localStorageBudget ? +localStorageBudget : 0;
};

const ExpensesInit = () => {
    const localStorageExpenses = localStorage.getItem("expenses");
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState = {
    budget: BudgetInit(),
    modal: false,
    expenses: ExpensesInit(),
    editingId: "",
    categoryIdFilter: '',
};

function createExpense(draftExpense: DraftExpense) {
    return { ...draftExpense, id: v4() };
}

export const BudgetReducer = (state: BudgetState, action: BudgetAction) => {
    if (action.type === "add-butget") {
        return { ...state, budget: action.payload.budget };
    }

    if (action.type === "show-modal") {
        return { ...state, modal: true };
    }

    if (action.type === "close-modal") {
        return { ...state, modal: false, editingId: "" };
    }

    if (action.type === "add-expense") {
        return {
            ...state,
            expenses: [
                ...state.expenses,
                createExpense(action.payload.expense),
            ],
            modal: false,
        };
    }

    if (action.type === "remove-expense") {
        return {
            ...state,
            expenses: state.expenses.filter(
                (expense) => expense.id !== action.payload.expenseId
            ),
        };
    }

    if (action.type === "get-expense-by-id") {
        return {
            ...state,
            editingId: action.payload.expenseId,
            modal: true,
        };
    }

    if (action.type === "edit-expense") {
        return {
            ...state,
            modal: false,
            editingId: "",
            expenses: state.expenses.map((expense) =>
                expense.id === action.payload.expense.id
                    ? action.payload.expense
                    : expense
            ),
        };
    }

    if (action.type === "reset-app") {
        return {
            ...state,
            budget: 0,
            expenses: [],
        };
    }

    if(action.type === 'filter-expenses') {
        return {...state, categoryIdFilter: action.payload.categoryId}
    }

    return state;
};
