// React
import ReactDOM from "react-dom/client";
// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
//Router
import { BrowserRouter } from "react-router-dom";
//App
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
