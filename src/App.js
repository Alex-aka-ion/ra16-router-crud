import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Route, BrowserRouter as Router} from "react-router-dom";
import CreateEditPage from "./components/CreateEditPage";
import ListPage from "./components/ListPage";
import ViewEditPage from "./components/ViewEditPage";
import React from "react";

function App() {
    return (
        <Router>
            <div>
                <Route path="/" exact component={ListPage}/>
                <Route path="/posts/new" exact component={CreateEditPage}/>
                <Route path="/posts/:id(\d+)"><ViewEditPage/></Route>
            </div>
        </Router>
    );
}

export default App;
