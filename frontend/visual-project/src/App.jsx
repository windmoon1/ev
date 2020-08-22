import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import LoginView from "./views/LoginPages/LoginView";
import CaseListLayout from "./layouts/CaseListLayout";
import ModelLayout from "./layouts/ModelLayout";
import { createBrowserHistory } from "history";
import { UserContext } from "./util/context/Context";

const hist = createBrowserHistory();

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#2196F3",
      },
      secondary: {
        main: "#F50057",
      },
      error: {
        main: "#F44336",
      },
    },
  });

  const [user, setUser] = React.useState("user");

  const [caseId, setCaseId] = React.useState(0);

  const toggleUser = (username) => {
    setUser(username);
  };

  const toggleCase = (caseId) => {
    setCaseId(caseId);
  };

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <UserContext.Provider
          value={{
            user,
            caseId,
            toggleUser,
            toggleCase,
          }}
        >
          <Router history={hist}>
            <Switch>
              <Route exact path="/login" component={LoginView} />
              <Route path="/cases" component={CaseListLayout} />
              <Route path="/model" component={ModelLayout} />
              <Redirect from="/" to="/login" />
            </Switch>
          </Router>
        </UserContext.Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
