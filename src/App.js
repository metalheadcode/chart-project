import MainScreen from "./screens/MainScreen";
function App() {
  return (
    <div className="">
      <div className="p-2 flex">
        <div className="flex mr-2">
          <div className="h-4 w-4 bg-slate-50 mr-2" />
          <p className="text-slate-500 text-xs text-center font-light">
            ChartProject
          </p>
        </div>
      </div>
      <MainScreen />
      <div className="absolute bottom-0 left-0 right-0 bg-slate-900">
        <p className="text-slate-500 text-xs py-1 text-center font-light">
          Copyright Reserved MobileMind-Pro© 2024 . Visit www.mobilemind.pro for
          more info
        </p>
      </div>
    </div>
  );
}

export default App;
