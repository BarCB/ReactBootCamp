import MenuItem from "./components/MenuItem";
import OrderContent from "./components/OrderContent";
import OrderTotals from "./components/OrderTotals";
import TipsPercentageForm from "./components/TipsPercentageForm";
import { menuItems } from "./data/db";
import useOrder from "./hooks/useOrder";

function App() {
    const { order, addItem, removeOrder, tip, setTip, placeOrder } = useOrder();

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
                            addItem={addItem}
                        ></MenuItem>
                    ))}
                </div>
                <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
                    <h1 className="text-4xl font-black pb-5">Consumo</h1>
                    {order.length ? (
                        <>
                            <OrderContent
                                order={order}
                                removeOrder={removeOrder}
                            />
                            <TipsPercentageForm tip={tip} setTip={setTip} />
                            <OrderTotals
                                order={order}
                                tip={tip}
                                placeOrder={placeOrder}
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
