import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Styles
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "./App.css";

// Components
import JsonLoader from "./components/JsonLoader/JsonLoader";
import WalletConnection from "./components/WalletConnection/WalletConnection";
import SurveyContainer from "./components/SurveyContainer/SurveyContainer";
import SubmitSurvey from "./components/SubmitSurvey/SubmitSurvey";
import Balance from "./components/Balance/Balance";

function App() {
  return (
    <div className="app-container">
      <Balance />
      <Router>
        <Switch>
          <Route path="/" exact component={JsonLoader} />
          <Route path="/wallet-connection" exact component={WalletConnection} />
          <Route path="/survey" exact component={SurveyContainer} />
          <Route path="/submit-survey" exact component={SubmitSurvey} />
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
