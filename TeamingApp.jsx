import { Provider } from "react-redux";
import { store } from "./slices/store";
import Home from "./pages/Home";

import "./styles/homePage.css";
import "./styles/card.css";
import "./styles/mediaQueries.css";

const TeamingApp = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default TeamingApp;
