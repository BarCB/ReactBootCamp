import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import useBudget from "../hooks/useBudget";

export default function ExpenseForm() {
    const { state, dispatch, remainingBudget } = useBudget();
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: "",
        amount: 0,
        category: "",
        date: new Date(),
    });

    const [previousAmount, setPreviousAmount] = useState(0);
    useEffect(() => {
        if (state.editingId) {
            const editableExpense = state.expenses.filter(
                (expense) => expense.id === state.editingId
            )[0];
            setExpense(editableExpense);
            setPreviousAmount(editableExpense.amount)
        }
    }, [state]);

    const [error, setError] = useState("");
    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const isAmountFiled = ["amount"].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountFiled ? Number(value) : value,
        });
    };

    const handleChangeDate = (value: Value) => {
        setExpense({ ...expense, date: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(expense).includes("")) {
            setError("Todos los campos son obligatorios");
            return;
        }

        if (expense.amount > remainingBudget + previousAmount) {
            setError("No se lo gaste caballo");
            return;
        }

        if (state.editingId) {
            dispatch({
                type: "edit-expense",
                payload: { expense: { ...expense, id: state.editingId } },
            });
        } else {
            dispatch({ type: "add-expense", payload: { expense: expense } });
        }
        setExpense({
            expenseName: "",
            amount: 0,
            category: "",
            date: new Date(),
        });
        setPreviousAmount(0);
    };
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editingId ? "Guardar Cambios" : "Nuevo Gasto"}
            </legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Nombre Gasto:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Cantidad:
                </label>
                <input
                    type="text"
                    id="amount"
                    placeholder="Añade la cantidad del gasto, ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">
                    Categoría:
                </label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">
                    Fecha Gasto:
                </label>
                <DatePicker
                    value={expense.date}
                    onChange={handleChangeDate}
                    className="bg-slate-100 p-2 border-0"
                />
            </div>
            <input
                type="submit"
                value={state.editingId ? "Guardar Cambios" : "Registrar Gasto"}
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            />
        </form>
    );
}
