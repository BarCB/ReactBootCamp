import type { Expense } from "../types";
import { formatDate } from "../helpers";
import AmountDisplay from "./AmountDisplay";
import { useMemo } from "react";
import { categories } from "../data/categories";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import useBudget from "../hooks/useBudget";

type ExpenseDetailProps = {
    expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
    const { dispatch } = useBudget();
    const categoryInfo = useMemo(
        () => categories.find((category) => category.id === expense.category),
        [expense]
    );
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() =>
                    dispatch({
                        type: "get-expense-by-id",
                        payload: { expenseId: expense.id },
                    })
                }
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() =>
                    dispatch({
                        type: "remove-expense",
                        payload: { expenseId: expense.id },
                    })
                }
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-10 w-full border-gray-200 flex gap-5 items-center border-b">
                    <div>
                        <img
                            src={`/icono_${categoryInfo!.icon}.svg`}
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">
                            {categoryInfo!.name}
                        </p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">
                            {formatDate(expense.date!.toString())}
                        </p>
                    </div>
                    <AmountDisplay amount={expense.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}
