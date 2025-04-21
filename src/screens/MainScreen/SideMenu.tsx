import { useDispatch, useSelector } from "react-redux";
import { menuList } from "./MenuList";
import { getNewsBySymbolRequest } from '../../redux/slicers/news';
import { ApiResponse, NewsItem, StockState } from "types/redux";

function SideMenu({ activeMenu, setActiveMenu }: { activeMenu: number | null, setActiveMenu: (menu: number | null) => void }) {
  // HOOKS
  const dispatch = useDispatch();
  const { symbolStr } = useSelector((state: {
    stocks: StockState
  }) => state.stocks);

  // FUNCTIONS
  const fetchNews = (params: { page: number, tickers: string }) => {
    dispatch(getNewsBySymbolRequest({
      params,
      onCallback: (response: ApiResponse<NewsItem[]>) => {
        if (response.status === 1) {
          console.log("APA RESPONSE NEWS?", response.data);
        }
      },
    }));
  };

  return (
    <div className="border-b border-l border-slate-800 p-2 h-full flex flex-col gap-2">
      {menuList.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            if (activeMenu === item.id) {
              return setActiveMenu(null);
            } else {
              if (item.id === 3) {
                fetchNews({
                  page: 0,
                  tickers: symbolStr || "",
                });
              }
              return setActiveMenu(item.id);
            }
          }}
          className={`hover:bg-slate-800 border-2 rounded-lg flex justify-center items-center ${activeMenu === item.id
            ? "bg-slate-800 border-green-500"
            : "border-slate-800"
            }`}
          style={{ height: 43 }}
        >
          {activeMenu === item.id ? item.iconActive : item.icon}
        </button>
      ))}
    </div>
  );
}

export default SideMenu;
