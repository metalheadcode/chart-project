import { createContext, useEffect, useLayoutEffect, useState } from "react";

import Alert from "./components/Alert";
import Footer from "./screens/Footer";
import Header from "./screens/Header";
import MainScreen from "./screens/MainScreen";
import { useSelector } from "react-redux";

export const SizeContext = createContext();

function App() {
  const [errors, setErrors] = useState([]);
  const stocks = useSelector((state) => state.stocks);
  const news = useSelector((state) => state.news);

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    let errorsResult = [];
    if (stocks.error !== null) {
      errorsResult.push(stocks.error.message);
    }
    if (news.error !== null) {
      errorsResult.push(news.error.message);
    }

    setErrors(errorsResult);
  }, [stocks.error, news.error]);

  return (
    <SizeContext.Provider value={{ size }}>
      <div className="">
        <Header />
        <MainScreen />
        <Footer />
      </div>
      {errors.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-50 m-3">
          {errors.map((err, ind) => (
            <Alert
              key={ind}
              message={err}
              type="ERROR"
              onClose={() => setErrors([])}
            />
          ))}
        </div>
      )}
    </SizeContext.Provider>
  );
}

export default App;
