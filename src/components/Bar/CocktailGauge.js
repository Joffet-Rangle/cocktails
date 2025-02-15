import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { withTheme } from "@material-ui/core/styles";

const styles = theme => ({
  title: {
    fontSize: "1.5rem",
    margin: "1rem 0"
  },
  progressBar: {
    padding: "0 2em",
    fontFamily: "Roboto"
  }
});

const CocktailGauge = ({ allCocktails, makeableCocktails, classes, theme }) => {
  const progressBarStyles = {
    path: {
      // Path color
      stroke: theme.palette.primary.main
    },
    trail: {
      stroke: theme.palette.grey[50]
    },
    text: {
      fill: theme.palette.primary.main
    }
  };

  const totalCocktailCount = allCocktails.length;
  const makeableCocktailCount = makeableCocktails.length;

  return (
    <div>
      <Typography variant="h3" className={classes.title} gutterBottom>
        Cocktail Gauge
      </Typography>
      <Typography component="p" paragraph>
        How many cocktails can you make with what's in your bar?
      </Typography>

      <CircularProgressbar
        styles={progressBarStyles}
        className={classes.progressBar}
        value={makeableCocktailCount}
        maxValue={totalCocktailCount}
        text={makeableCocktailCount || "0"}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  allCocktails: state.db.cocktails,
  bar: state.bar
});

export default connect(mapStateToProps)(
  withTheme(withStyles(styles)(CocktailGauge))
);
