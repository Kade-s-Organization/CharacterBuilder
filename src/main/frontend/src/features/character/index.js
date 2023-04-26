import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Box, FormControlLabel, Switch, MenuItem, Select, Grid } from '@mui/material';
import * as Yup from "yup";
import { updateField, updatePreference } from './character';

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
        progressionType: Yup.number().oneOf([1, 2], "Please choose a valid advancement type"),
        hitPointType: Yup.number().oneOf([1, 2], "Please choose a valid hit point type"),
        enforceFeatRules: Yup.boolean(),
        enforceMulticlassRules: Yup.boolean(),
        showScaledSpells: Yup.boolean(),
        encumbranceType: Yup.number().oneOf([1, 2, 3], "Please choose a valid encumbrance type"),
        ignoreCoinWeight: Yup.boolean(),
        abilityScoreDisplayType: Yup.number().oneOf([1, 2], "Please choose a valid ability score/modifier display type"),
        privacyType: Yup.number().oneOf([1, 2], "Please choose a valid character privacy type")
    })
});
const CharacterHome = () => {
    const characterState = useSelector((state) => state.character);

    return (
        <Box m={3} p={3}>
            <Formik
                initialValues={characterState}
                // validationSchema={schema}
                // add once we create the rest of the fields
                onSubmit={(values, { setSubmitting }) => {
                    console.log('Form submitted:', values);
                    setSubmitting(false);
                }}
            >
                {({ values, errors, setFieldValue }) => {
                    console.log('Form Errors:', errors)
                    return (
                        <Form>
                            <Grid container spacing={2}>
                                {/* Character Name */}
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="name"
                                        label="Character Name"
                                    />
                                </Grid>


                                <Grid item xs={12}>
                                    <h2>Character Preferences</h2>
                                    <h3>Sources</h3>
                                    <p>Allow or restrict sources to be used for this character</p>
                                </Grid>

                                {/* Sources */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Field component={Switch} name="preferences.useHomebrewContent" checked={values.preferences.useHomebrewContent} />}
                                        label="Use Homebrew Content"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Field component={Switch} name="values.preferences.useCriticalRoleContent" checked={values.preferences.useCriticalRoleContent} />}
                                        label="Use Critical Role Content"
                                    />
                                </Grid>
                                {/* Add more sources here */}


                                {/* Dice Rolling */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Field component={Switch} name="preferences.diceRolling" />}
                                        label="Dice Rolling"
                                    />
                                </Grid>

                                {/* Optional Features */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Field component={Switch} name="preferences.enableOptionalClassFeatures" />}
                                        label="Enable Optional Class Features"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Field component={Switch} name="preferences.enableOptionalOrigins" />}
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
                                    >
                                        <MenuItem value={1}>Fixed</MenuItem>
                                        <MenuItem value={2}>Manual</MenuItem>
                                    </Field>
                                </Grid>

                                {/* Use Prerequisites */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Field component={Switch} name="preferences.enforceFeatRules" />}
                                        label="Enforce Feat Rules"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Field component={Switch} name="preferences.enforceMulticlassRules" />}
                                        label="Enforce Multiclass Rules"
                                    />
                                </Grid>
                                {/* Add more prerequisites here */}

                                {/* Show Level-Scaled Spells */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Field component={Switch} name="preferences.showScaledSpells" />}
                                        label="Show Level-Scaled Spells"
                                    />
                                </Grid>

                                {/* Encumbrance Type */}
                                <Grid item xs={12}>
                                    <Field
                                        component={Select}
                                        name="preferences.encumbranceType"
                                        label="Encumbrance Type"
                                    >
                                        <MenuItem value={1}>Use Encumbrance</MenuItem>
                                        <MenuItem value={2}>No Encumbrance</MenuItem>
                                        <MenuItem value={3}>Variant Encumbrance</MenuItem>
                                    </Field>
                                </Grid>

                                {/* Ignore Coin Weight */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Field component={Switch} name="preferences.ignoreCoinWeight" />}
                                        label="Ignore Coin Weight"
                                    /></Grid>

                                {/* Ability Score/Modifier Display */}
                                <Grid item xs={12}>
                                    <Field
                                        component={Select}
                                        name="preferences.abilityScoreDisplayType"
                                        label="Ability Score/Modifier Display"
                                    >
                                        <MenuItem value={1}>Modifiers Top</MenuItem>
                                        <MenuItem value={2}>Scores Top</MenuItem>
                                    </Field></Grid>

                                {/* Character Privacy */}
                                <Grid item xs={12}>
                                    <Field
                                        component={Select}
                                        name="preferences.privacyType"
                                        label="Character Privacy"
                                        value={values.preferences.privacyType}
                                    >
                                        <MenuItem value={1}>Private</MenuItem>
                                        <MenuItem value={2}>Public</MenuItem>
                                    </Field></Grid>

                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained">
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    );
};

export default CharacterHome;
