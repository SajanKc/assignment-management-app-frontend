import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AssignmentList from "./components/AssignmentList";
import AddAssignment from "./components/AddAssignment";
import Assignment from "./components/Assignment";
import { Link, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <a href="/assignments" className="navbar-brand">
            AMA
          </a>
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/assignments"} className="nav-link">
                Assignments
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route
            exact
            path={["/", "/assignments"]}
            component={AssignmentList}
          />
          <Route exact path="/add" component={AddAssignment} />
          <Route path="/assignments/:id" component={Assignment} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
