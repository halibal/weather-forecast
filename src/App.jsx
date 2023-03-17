import StoreProvider from "./context/store-context";
import { Home } from "./pages";

function App() {
    return (
        <StoreProvider>
            <div className="App">
                <Home />
            </div>
        </StoreProvider>
    );
}

export default App;
