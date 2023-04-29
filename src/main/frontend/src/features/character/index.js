import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import {
  Button,
  TextField,
  Box,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import * as Yup from "yup";
import { updateField, updatePreference } from "./character";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter a name for your character"),
  preferences: Yup.object().shape({
    useHomebrewContent: Yup.boolean(),
    useCriticalRoleContent: Yup.boolean(),
    useMagicTheGatheringContent: Yup.boolean(),
    useEberronContent: Yup.boolean(),
    useNoncoreDnDContent: Yup.boolean(),
    useDragonlanceContent: Yup.boolean(),
    useRickAndMortyContent: Yup.boolean(),
    useMinecraftContent: Yup.boolean(),
    useDigitalDice: Yup.boolean(),
    enableOptionalClassFeatures: Yup.boolean(),
    enableOptionalOrigins: Yup.boolean(),
    progressionType: Yup.number().oneOf(
      [1, 2],
      "Please choose a valid advancement type"
    ),
    hitPointType: Yup.number().oneOf(
      [1, 2],
      "Please choose a valid hit point type"
    ),
    enforceFeatRules: Yup.boolean(),
    enforceMulticlassRules: Yup.boolean(),
    showScaledSpells: Yup.boolean(),
    encumbranceType: Yup.number().oneOf(
      [1, 2, 3],
      "Please choose a valid encumbrance type"
    ),
    ignoreCoinWeight: Yup.boolean(),
    abilityScoreDisplayType: Yup.number().oneOf(
      [1, 2],
      "Please choose a valid ability score/modifier display type"
    ),
    privacyType: Yup.number().oneOf(
      [1, 2],
      "Please choose a valid character privacy type"
    ),
  }),
});
const CharacterHome = () => {
  const characterState = useSelector((state) => state.character);
  const dispatch = useDispatch();

  console.log("characterState:", characterState);

  //   The handleFieldChange function is a higher-order function that takes two arguments, field and categoryId, and returns another function that takes an event. This returned function is the actual event handler for the input component. When the input value changes, the event handler checks if the input type is a checkbox or not. If it's a checkbox, it uses the event.target.checked value; otherwise, it uses event.target.value.

  // If the field is "activeSourceCategories", the function updates the categories by either adding the categoryId to the activeSourceCategories array or removing it from the array, depending on the input value. Then, it dispatches an action to update the field with the modified categories array. If the field is not "activeSourceCategories", it directly dispatches an action to update the field with the input value.

  const handleFieldChange = (field, categoryId) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    if (field === "activeSourceCategories") {
      const updatedCategories = value
        ? [...characterState.activeSourceCategories, categoryId]
        : characterState.activeSourceCategories.filter(
            (id) => id !== categoryId
          );
      dispatch(updateField({ field, value: updatedCategories }));
    } else {
      dispatch(updateField({ field, value }));
    }
  };

  //   const handleFieldChange = (field, categoryId) => (event) => {
  //     const value =
  //       event.target.type === "checkbox"
  //         ? event.target.checked
  //         : event.target.value;

  //     if (field === "activeSourceCategories") {
  //       const updatedCategories = value
  //         ? [...new Set([...characterState.activeSourceCategories, categoryId])]
  //         : characterState.activeSourceCategories.filter(
  //             (id) => id !== categoryId
  //           );
  //       dispatch(updateField({ field, value: updatedCategories }));
  //     } else {
  //       dispatch(updateField({ field, value }));
  //     }
  //   };

  const handlePreferenceChange = (preference) => (event) => {
    console.log(
      "handlePreferenceChange called",
      preference,
      event.target.checked
    );
    dispatch(updatePreference({ preference, value: event.target.checked }));
  };

  return (
    <Box m={3} p={3}>
      <Formik
        initialValues={characterState}
        // validationSchema={schema}
        // add once we create the rest of the fields
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form submitted:", values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, setFieldValue }) => {
          console.log("Form Errors:", errors);
          return (
            // Some of these work and some don't. I'm not sure why. They all correctly load the right value, but some don't update the value when changed.
            <Form>
              {/* //this one works */}
              <Grid container spacing={2}>
                {/* Character Name */}
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="name"
                    label="Character Name"
                    onChange={handleFieldChange("name")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <h2>Character Preferences</h2>
                  <h3>Sources</h3>
                  <p>Allow or restrict sources to be used for this character</p>
                </Grid>
                {/* Sources */}
                {/* none of these work 
                
                
                This one does work

                <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="preferences.enforceFeatRules"
                        value={values.preferences.enforceFeatRules}
                        onChange={handlePreferenceChange("enforceFeatRules")}
                      />
                    }
                    label="Enforce Feat Rules"
                  />
                  and it looks just like the one below, so I don't know why it doesn't work
                  
    
                  
                  const preferences = {
  useHomebrewContent: false,
  progressionType: 2,
  encumbranceType: 1,
  ignoreCoinWeight: false,
  hitPointType: 2,
  showUnarmedStrike: false,
  showScaledSpells: true,
  primarySense: 1,
  primaryMovement: 1,
  privacyType: 1,
  sharingType: 2,
  abilityScoreDisplayType: 2,
  enforceFeatRules: true,
  enforceMulticlassRules: true,
  enableOptionalClassFeatures: true,
  enableOptionalOrigins: true,
  enableDarkMode: false,
  enableContainerCurrency: false,
};

                    it probably has something to do with the fact that the value is a boolean, but I don't know how to fix it


                  
                  */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="preferences.useHomebrewContent"
                        checked={values.preferences.useHomebrewContent}
                        onChange={handlePreferenceChange("useHomebrewContent")}
                      />
                    }
                    label="Use Homebrew Content!"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="activeSourceCategories"
                        checked={values.activeSourceCategories?.includes(2)}
                        onChange={handleFieldChange(
                          "activeSourceCategories",
                          2
                        )}
                      />
                    }
                    label="Use Critical Role Content"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="activeSourceCategories"
                        checked={values.activeSourceCategories?.includes(3)}
                        onChange={handleFieldChange(
                          "activeSourceCategories",
                          3
                        )}
                      />
                    }
                    label="Use Magic: The Gathering Content"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="activeSourceCategories"
                        checked={values.activeSourceCategories?.includes(4)}
                        onChange={handleFieldChange(
                          "activeSourceCategories",
                          4
                        )}
                      />
                    }
                    label="Use Eberron Content"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="activeSourceCategories"
                        checked={values.activeSourceCategories?.includes(5)}
                        onChange={handleFieldChange(
                          "activeSourceCategories",
                          5
                        )}
                      />
                    }
                    label="Use Noncore D&D Content"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="activeSourceCategories"
                        checked={values.activeSourceCategories?.includes(6)}
                        onChange={handleFieldChange(
                          "activeSourceCategories",
                          6
                        )}
                      />
                    }
                    label="Use Dragonlance Content"
                  />
                </Grid>
                <Grid item xs={12}>
                  <h3>Dice Rolling</h3>
                  <p>Allow or restrict optional features for this character.</p>
                </Grid>
                {/* Dice Rolling */}
                {/* 
                    This one toggles, but there isn't even a preferences.diceRolling field in the character state anymore
                */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="preferences.diceRolling"
                        checked={values.preferences.diceRolling}
                        onChange={handlePreferenceChange("diceRolling")}
                      />
                    }
                    label="Dice Rolling"
                  />
                </Grid>
                {/* Optional Features */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="preferences.enableOptionalClassFeatures"
                        checked={values.preferences.enableOptionalClassFeatures}
                        onChange={handlePreferenceChange(
                          "enableOptionalClassFeatures"
                        )}
                      />
                    }
                    label="Enable Optional Class Features"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="preferences.enableOptionalOrigins"
                        checked={values.preferences.enableOptionalOrigins}
                        onChange={handlePreferenceChange(
                          "enableOptionalOrigins"
                        )}
                      />
                    }
                    label="Enable Optional Origins"
                  />
                </Grid>
                {/* Add more optional features here */}
                {/* Advancement Type */}
                <Grid item xs={12}>
                  <Field
                    component={Select}
                    name="preferences.progressionType"
                    label="Advancement Type"
                    value={values.preferences.progressionType}
                    onChange={handlePreferenceChange("progressionType")}
                  >
                    <MenuItem value={1}>Milestone</MenuItem>
                    <MenuItem value={2}>XP</MenuItem>
                  </Field>
                </Grid>
                {/* Hit Point Type */}
                <Grid item xs={12}>
                  <Field
                    component={Select}
                    name="preferences.hitPointType"
                    label="Hit Point Type"
                    value={values.preferences.hitPointType}
                    onChange={handlePreferenceChange(
                      "preferences.hitPointType"
                    )}
                  >
                    <MenuItem value={1}>Fixed</MenuItem>
                    <MenuItem value={2}>Manual</MenuItem>
                  </Field>
                </Grid>
                {/* Use Prerequisites */}
                {/* 
                    this one works, and it's in the preferences object.

                    const preferences = {
  useHomebrewContent: false,
  progressionType: 2,
  encumbranceType: 1,
  ignoreCoinWeight: false,
  hitPointType: 2,
  showUnarmedStrike: false,
  showScaledSpells: true,
  primarySense: 1,
  primaryMovement: 1,
  privacyType: 1,
  sharingType: 2,
  abilityScoreDisplayType: 2,
  enforceFeatRules: true,
  enforceMulticlassRules: true,
  enableOptionalClassFeatures: true,
  enableOptionalOrigins: true,
  enableDarkMode: false,
  enableContainerCurrency: false,
};

it even updates the value in the character state. It functions exactly as it should. 


so let's thing, why would this one work and the others not?

I think it's because this one is a boolean, and the others are numbers.


                */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="preferences.enforceFeatRules"
                        value={values.preferences.enforceFeatRules}
                        onChange={handlePreferenceChange("enforceFeatRules")}
                      />
                    }
                    label="Enforce Feat Rules"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="preferences.enforceMulticlassRules"
                        value={values.preferences.enforceMulticlassRules}
                        onChange={handlePreferenceChange(
                          "enforceMulticlassRules"
                        )}
                      />
                    }
                    label="Enforce Multiclass Rules"
                  />
                </Grid>
                {/* Add more prerequisites here */}
                {/* Show Level-Scaled Spells */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="preferences.showScaledSpells"
                        value={values.preferences.showScaledSpells}
                        onChange={handlePreferenceChange("showScaledSpells")}
                      />
                    }
                    label="Show Level-Scaled Spells"
                  />
                </Grid>
                {/* Encumbrance Type */}
                <Grid item xs={12}>
                  <Field
                    component={Select}
                    name="preferences.encumbranceType"
                    label="Encumbrance Type"
                    value={values.preferences.encumbranceType}
                    onChange={handlePreferenceChange("encumbranceType")}
                  >
                    <MenuItem value={1}>Use Encumbrance</MenuItem>
                    <MenuItem value={2}>No Encumbrance</MenuItem>
                    <MenuItem value={3}>Variant Encumbrance</MenuItem>
                  </Field>
                </Grid>
                {/* Ignore Coin Weight */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        name="preferences.ignoreCoinWeight"
                        value={values.preferences.ignoreCoinWeight}
                        onChange={handleFieldChange("ignoreCoinWeight")}
                      />
                    }
                    label="Ignore Coin Weight"
                  />
                </Grid>
                {/* Ability Score/Modifier Display */}
                <Grid item xs={12}>
                  <Field
                    component={Select}
                    name="preferences.abilityScoreDisplayType"
                    label="Ability Score/Modifier Display"
                    value={values.preferences.abilityScoreDisplayType}
                    onChange={handlePreferenceChange("abilityScoreDisplayType")}
                  >
                    <MenuItem value={1}>Modifiers Top</MenuItem>
                    <MenuItem value={2}>Scores Top</MenuItem>
                  </Field>
                </Grid>
                {/* Character Privacy */}
                <Grid item xs={12}>
                  <Field
                    component={Select}
                    name="preferences.privacyType"
                    label="Character Privacy"
                    value={values.preferences.privacyType}
                    onChange={handlePreferenceChange("privacyType")}
                  >
                    <MenuItem value={1}>Private</MenuItem>
                    <MenuItem value={2}>Public</MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CharacterHome;
