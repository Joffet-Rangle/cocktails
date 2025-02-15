import React from "react";

import {
  Radio,
  RadioGroup,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Grid,
  Switch,
  Paper,
  Button,
  FormControl,
  Typography
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IngredientPicker from "./IngredientPicker";
import { updateFilter } from "../actions";
import { getCategories, getGlasses } from "../utilities/cocktail.utils";
import { removeOrAddItemFromArray } from "../utilities/util";

const styles = theme => ({
  filter: {
    ...theme.mixins.gutters,
    justifyContent: "center",
    padding: "1em 2em"
  },
  heading: {
    fontSize: 16
  },
  radioGroup: {
    display: "inline-block"
  },
  checkboxOptionContainer: {
    marginTop: "1.5em"
  }
});

const CocktailFilter = ({
  allCocktails,
  updateFilter,
  filterOptions: {
    categories,
    glasses,
    ingredientsRule,
    ingredients: selectedIngredients,
    barOnly
  },
  classes
}) => {
  const allCategories = getCategories(allCocktails);
  const allGlasses = getGlasses(allCocktails);

  return (
    <Paper square={true} elevation={24} className={classes.filter}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Ingredients</FormLabel>

        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={barOnly}
                onChange={e => updateFilter({ barOnly: !barOnly })}
                value={barOnly}
              />
            }
            label={
              <Typography component="span">
                Only include drinks I can make from{" "}
                <Link to="/my-bar" style={{ textDecoration: "none" }}>
                  <Typography
                    component="span"
                    color="secondary"
                    style={{ display: "inline" }}
                  >
                    my bar
                  </Typography>
                </Link>
              </Typography>
            }
          />
        </FormGroup>

        <RadioGroup value={ingredientsRule} className={classes.radioGroup}>
          <FormControlLabel
            value="mustInclude"
            control={<Radio />}
            label="Must Include all of the following..."
            onClick={e =>
              ingredientsRule !== "mustInclude" &&
              updateFilter({ ingredientsRule: "mustInclude" })
            }
          />
          <FormControlLabel
            value="canInclude"
            control={<Radio />}
            label="Can Include any of the following..."
            onClick={e =>
              ingredientsRule !== "canInclude" &&
              updateFilter({ ingredientsRule: "canInclude" })
            }
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <IngredientPicker
          selectedIngredients={selectedIngredients}
          onIngredientsChange={selectedIngredients => {
            updateFilter({ ingredients: selectedIngredients });
          }}
        />
        <Button
          color="secondary"
          onClick={() => {
            updateFilter({ ingredients: [] });
          }}
        >
          Clear Ingredients
        </Button>
      </FormControl>

      <Grid container>
        <Grid item md={6} xs={12} className={classes.checkboxOptionContainer}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Category</FormLabel>
            <FormGroup row>
              {allCategories.map(category => {
                return (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={categories.includes(category)}
                        onChange={() =>
                          updateFilter({
                            categories: removeOrAddItemFromArray(
                              category,
                              categories
                            )
                          })
                        }
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label={category}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12} className={classes.checkboxOptionContainer}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Glass</FormLabel>
            <FormGroup row>
              {allGlasses.map(glass => {
                return (
                  <FormControlLabel
                    key={glass}
                    control={
                      <Checkbox
                        checked={glasses.includes(glass)}
                        onChange={() =>
                          updateFilter({
                            glasses: removeOrAddItemFromArray(glass, glasses)
                          })
                        }
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label={glass}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = state => ({
  filterOptions: state.filterOptions,
  allCocktails: state.db.cocktails
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CocktailFilter));
