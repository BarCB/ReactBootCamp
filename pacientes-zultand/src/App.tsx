import PacientForm from "./components/PacientForm";
import PacientList from "./components/PacientList";

function App() {
    return (
        <>
            <div className="containter mx-auto mt-20">
                <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
                    Seguimiento de Pacientes
                    <span className="text-indigo-700">Veterinaria</span>
                </h1>
                <div className="mt-12 md:flex">
                  <PacientForm/>
                  <PacientList/>
                </div>
            </div>
        </>
    );
}

export default App;
