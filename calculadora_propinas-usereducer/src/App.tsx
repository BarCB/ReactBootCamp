import { useReducer } from "react";
import MenuItem from "./components/MenuItem";
import OrderContent from "./components/OrderContent";
import OrderTotals from "./components/OrderTotals";
import TipsPercentageForm from "./components/TipsPercentageForm";
import { menuItems } from "./data/db";
import { initialState, orderReducer } from "./reducers/order-reducer";

function App() {
    const [state, dispatch] = useReducer(orderReducer, initialState);
    return (
        <>
            <header className="bg-teal-400 py-5">
                <h1 className="text-center text-4xl font-black">
                    Calculadora de Propinas y Consumo
                </h1>
            </header>
            <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2 gap-3">
                <div>
                    <h1 className="text-4xl font-black pb-5">Menú</h1>
                    {menuItems.map((item) => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            dispatch={dispatch}
                        ></MenuItem>
                    ))}
                </div>
                <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
                    <h1 className="text-4xl font-black pb-5">Consumo</h1>
                    {state.order.length ? (
                        <>
                            <OrderContent
                                order={state.order}
                                dispatch={dispatch}
                            />
                            <TipsPercentageForm
                                tip={state.tip}
                                dispatch={dispatch}
                            />
                            <OrderTotals
                                order={state.order}
                                tip={state.tip}
                                dispatch={dispatch}
                            />
                        </>
                    ) : (
                        <p className="text-center">La orden está vacía</p>
                    )}
                </div>
            </main>
        </>
    );
}

export default App;
