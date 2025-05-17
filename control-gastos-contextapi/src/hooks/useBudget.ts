import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function useBudget() {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error("useBudget must be used inside a BudgetProvider");
    }
    return context;
}
