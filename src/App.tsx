import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Alert from "./components/Alert";
import Footer from "./screens/Footer";
import Header from "./screens/Header";
import MainScreen from "./screens/MainScreen";
import { SizeContextType } from "./types/charts";
import { NewsState, StockState } from "./types/redux";

export const SizeContext = createContext<SizeContextType>({ size: { width: 0, height: 0 } });

const App: React.FC = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const stocks = useSelector((state: { stocks: StockState }) => state.stocks);
    const news = useSelector((state: { news: NewsState }) => state.news);

    const [size, setSize] = useState<SizeContextType['size']>({
        width: 0,
        height: 0,
    });

    useLayoutEffect(() => {
        function updateSize() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener("resize", updateSize);
        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        const errorsResult: string[] = [];

        if (stocks.error) {
            errorsResult.push(stocks.error);
        }

        if (news.error) {
            errorsResult.push(news.error);
        }

        setErrors(errorsResult);
    }, [stocks.error, news.error]);

    const handleErrorClose = () => {
        setErrors([]);
    };

    return (
        <SizeContext.Provider value={{ size }}>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    <MainScreen />
                </main>
                <Footer />
            </div>
            {errors.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 m-3 space-y-2">
                    {errors.map((err, index) => (
                        <Alert
                            key={`error-${index}`}
                            message={err}
                            type="ERROR"
                            onClose={handleErrorClose}
                        />
                    ))}
                </div>
            )}
        </SizeContext.Provider>
    );
};

export default App; 