import React from "react";
import { categories } from "../data/categories";
import useBudget from "../hooks/useBudget";

export default function FilterByCategory() {
    const { dispatch } = useBudget();
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: "filter-expenses",
            payload: { categoryId: e.target.value },
        });
    };
    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar Gastos</label>
                    <select
                        onChange={(e) => handleChange(e)}
                        id="category"
                        className="bg-slate-100 p3 flex-1 rounded"
                    >
                        <option value="">Filtra categorías</option>
                        {categories.map((category) => (
                            <option id={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
}
