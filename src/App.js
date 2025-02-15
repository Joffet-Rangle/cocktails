import React from "react";
import Theme from "./theme";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import CocktailIcon from "@material-ui/icons/LocalBar";
import DrinkIcon from "@material-ui/icons/LocalDrink";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import Hidden from "@material-ui/core/Hidden";
import CocktailBrowser from "./components/CocktailBrowser";
import CocktailPage from "./components/CocktailPage";
import Bar from "./components/Bar";
import Settings from "./components/Settings";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  mainTitle: {
    color: "white",
    fontSize: 20,
    textTransform: "capitalize",
    marginLeft: ".5em",
  },
  menuButtonText: {
    color: "white",
    fontSize: 14,
    marginLeft: ".5em",
  },
  textBackground: {
    marginLeft: "0.2em",
    paddingTop: ".3em",
    paddingBottom: ".3em",
  },
  /** Pride specific styles */
  prideBackground: {
    background: `linear-gradient(to bottom,
        #e70000 0,
        #e70000 17%,
        #ff8c00 16%,
        #ff8c00 32%,
        #ffd400 32%,
        #ffd400 48%,
        #00811f 48%,
        #00811f 66%,
        #0044ff 66%,
        #0044ff 86%,
        #760089 86%) no-repeat`,
  },
  prideTextBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
};

function App({ pride, classes }) {
  const backgroundClass = pride ? classes.prideBackground : null;
  const textBackgroundClass = [
    classes.textBackground,
    pride ? classes.prideTextBackground : null,
  ].join(" ");

  return (
    <Theme>
      <Router>
        <AppBar position="sticky" className={backgroundClass}>
          <Toolbar>
            <div className={classes.root}>
              <Button
                className={textBackgroundClass}
                component={Link}
                to="/cocktails"
                color="inherit"
              >
                <CocktailIcon />
                <Typography className={classes.mainTitle} component="h1">
                  <Hidden xsDown>Cocktail Browser</Hidden>
                </Typography>
              </Button>
            </div>
            <Button
              className={textBackgroundClass}
              component={Link}
              to="/cocktails"
              color="inherit"
            >
              <SearchIcon />
              <Hidden xsDown>
                <Typography className={classes.menuButtonText}>
                  Browse
                </Typography>
              </Hidden>
            </Button>
            <Button
              className={textBackgroundClass}
              component={Link}
              to="/my-bar"
              color="inherit"
            >
              <DrinkIcon />
              <Hidden xsDown>
                <Typography className={classes.menuButtonText}>Bar</Typography>
              </Hidden>
            </Button>
            <Button
              className={textBackgroundClass}
              component={Link}
              to="/settings"
              color="inherit"
            >
              <SettingsIcon />
              <Hidden xsDown>
                <Typography className={classes.menuButtonText}>
                  Settings
                </Typography>
              </Hidden>
            </Button>
          </Toolbar>
        </AppBar>
        {
          // Routes
        }
        <Route exact path={["/", "/cocktails"]} component={CocktailBrowser} />
        <Route path="/my-bar" component={Bar} />
        <Route path={"/cocktails/:slug"} component={CocktailPage} />
        <Route path="/settings" component={Settings} />
      </Router>
    </Theme>
  );
}

const mapStateToProps = (state) => ({
  pride: state.settings.pride,
});

export default connect(mapStateToProps)(withStyles(styles)(App));
