import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import { fontAwesomeIcon } from "@fontawesome/react-fontawesome";
import { faTrash, faSignOutAlt, faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faTrash,
  faSignOutAlt,
  faEdit,
  faSpinner,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

import PortfolioManager from ".pages/portfolio-manager";
import PortfolioContainer from "./portfolio/portfolio-container";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/Auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";

library.add(faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle);

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleSuccessfullogin = this.handleSuccessfullogin.bind(this);
    this.handleUnSuccessfullogin = this.handleUnSuccessfullogin.bind(this);
    this.handleUSuccessfullogout = this.handleUSuccessfullogout.bind(this);

  }

  handleSuccessfullogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnSuccessfullogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleUSuccessfullogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus() {
    return axios.get("https://api.devcamp.space/logged_in", { 
      withCredentials: true 
    })
    .then(response => {
      const loggedIn = response.data.logged_In;
      const loggedInStatus = this.state.loggedInStatus;

      // If loggedIn and status is LOGGED_IN => return data
      // If loggedIn status NOT_LOGGED_IN => update state
      // If not loggedIn and status LOGGED_IN => update state

      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.state({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      }
    })
    .catch(error => {
      console.log("Error", error);
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

authorizdPages() {
  return [<Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />];
}

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer 
              loggedInStatus={this.state.loggedInStatus} 
              handleUSuccessfullogout ={this.handleUSuccessfullogout}
              />

            <Switch>
              <Route exact path="/" component={Home} />

                <Route 
                  path="/auth"
                  render={props => (
                    <Auth 
                      {...props}
                      handleSuccessfullogin={this.handleSuccessfullogin}
                      handleUnSuccessfullogin={this.handleUnSuccessfullogin}
                    />
                  )}
                />

              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />

              <Route path="/blog" 
              render={props => (
                <Blog {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />

              <Route 
              path="/b/:slug" 
              render={...props => (
                <Blog { ...props} loggedInStatus={this.state.loggedInStatus} />
              )}
              />

              {this.state.loggedInStatus === "LOGGED_IN" ? (this.authorizedPages()): null}
              <Route path="/portfolio/:slug" component={PortfolioDetail} />
              <Route component={NoMatch} />

            </Switch>  
          </div>  
        </Router>
        
        <PortfolioContainer />
      </div>
    );
  }
}