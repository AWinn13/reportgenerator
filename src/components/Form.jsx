import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { formFields } from "../data/fieldConfig";
import "../renderer/index.css";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { refData } from "../data/referringinfo";
import dayjs, { Dayjs } from "dayjs";
const { ipcRenderer } = window.require("electron");
const fs = window.require("fs");

/**
 * Represents a form component.
 *
 * @returns {JSX.Element} The form component.
 */
function Form() {
  const [BMIBool, setBMIBool] = useState(false);
  const todaysDate = new Date();
  const [today, setToday] = useState(dayjs(todaysDate));
  const [formData, setFormData] = useState({
    dateOfFax: today,
    patientFirstName: "",
    patientLastName: "",
    DOB: today,
    Age: 0,
    referringInfo: "",
    referringProvider: "",
    referringFacility: "",
    referringAddressA: "",
    referringAddressB: "",
    referringAddressC: "",
    referringCityState: "",
    referringFacilityFax: "",
    currentDate: today,
    gender: "",
    pronoun: "",
    capPronoun: "",
    capPossessive: "",
    possessive: "",
    genderContraction: "",
    evalDate: today,
    presentMood: "",
    heightFeet: "0",
    heightInches: "0",
    weight: "0",
    BMI: 0,
    BMIClassification: "",
    owText: "",
    owDuration: "",
    weightLossAttempts: [],
    weightLossAttemptsFreeText: "",
    weightChallenges: [],
    certainFoodCravings: "",
    otherWeightChallenges: "",
    medicalIssues: "",
    additionalWeightLossReasons: [],
    additionalWeightLossReasonsDisplay: [],
    additionalWeightLossFreeText: "",
    chronicPainBool: false,
    chronicPainSentence: "",
    chronicPainText: "",
    replacementSurgeryBool: false,
    replacementSurgerySentence: "",
    diabetes: false,
    diabetesSentence: false,
    goalWeight: "0",
    goalBMI: "0",
    goalBMIClassification: "",
    secondMedicalIssue: "",
    sleepSatisfaction: false,
    sleepSatisfactionText: "dissatisfied",
    sleepApnea: false,
    sleepApneaSentence: "",
    cpap: false,
    hypnotics: false,
    hypnoticsText: "",
    hypnoticsSentence: "",
    tstFreeText: "",
    medications: "",
    currentEating: "",
    currentEatingAlt: "",
    numMeals: "",
    snacks: "",
    eatingHabits: [],
    caloricIntake: "",
    recentDiet: "",
    recentLoss: "0",
    lossInMonths: "0",
    patientCity: "",
    livingSituation: "",
    employStatus: "",
    yearsOfEmploy: "",
    employStatusText: "",
    formerEmploy: "",
    degree: "",
    degreeText: "",
    includeSentence: false,
    sentenceIncluded: "",
    signOff1Bool: false,
    signOff1: "",
    signOff2Bool: false,
    signOff2: "",
  });

// !!SLEEP APNEA  & hypnoitcs

  /**
   * Handles the change event for form inputs.
   * @param {Event} e - The change event object.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    switch (name) {
      case "gender":
        assignPronouns(value);
        break;
      case "referringInfo":
        parseReferringInfo(e.target.value);
        break;
      case "additionalWeightLossReasonsDisplay":
      case "weightLossAttempts":
      case "weightChallenges":
      case "eatingHabits":
        multiSelectChange(e);
        break;
      case "DOB":
        calculateAge(value);
        break;
      case "weight":
      case "goalWeight":
        calculateBMI(name, value);
        break;
      case "certainFoodCravings":
        let str = "Regarding the latter, he has a particular affinity for";
        str = str.concat(value);
        setFormData((prevState) => ({
          ...prevState,
          certainFoodCravings: value,
          certainFoodCravingsSentence:str
        }));
        break;
      case "sleepSatisfaction":
        if (checked) {
          setFormData((prevState) => ({
            ...prevState,
            sleepSatisfaction: true,
            sleepSatisfactionText: "satisfied",
          }));
        }
        break;
      case "includeSentence":
        setFormData((prevState) => ({
          ...prevState,
          includeSentence: checked,
          sentenceIncluded: `To ${formData.possessive} credit, ${formData.pronoun} has recently implemented a number of healthful lifestyle and dietary changes, resulting in significant weight loss`,
        }));
        break;
      case "signOff1Bool":
        if (checked) {
          setFormData((prevState) => ({
            ...prevState,
            signOff1: "Thank you for this referral",
            signOff1Bool: checked,
          }));
        }
        break;
      case "signOff2Bool":
        if (checked) {
          setFormData((prevState) => ({
            ...prevState,
            signOff2: `It was a pleasure evaluating ${formData.genderContraction}.${formData.patientLastName}`,
            signOff2Bool: checked,
          }));
        }
        break;
      case "hypnotics":
      case "sleepApnea":
      case "chronicPainBool":
      case "replacementSurgeryBool":
      case "diabetes":
      case "cpap":
      case "hypnoticsText":
        setFormData((prevState) => ({
          ...prevState,
          [name]: type === "checkbox" ? checked : value,
        }));
        handleHandles();
        break
      default:
        setFormData((prevState) => ({
          ...prevState,
          [name]: type === "checkbox" ? checked : value,
        }));
        break;
    }
  };

  /**
   * Handles the change of a date value in the form.
   * date.$D = day, date.$M+1 = month, date.$y = year
   *
   * @param {string} name - The name of the date field.
   * @param {Date} date - The new date value.
   */
  const handleDateChange = (name, date) => {
    if (name === "DOB") {
      calculateAge(date);
    }
      let month = parseInt(date.$M) + 1;
      let day = parseInt(date.$D);
      let year = parseInt(date.$y);
      date = `${month}/${day}/${year}`; // convert to Date object
      setFormData((prevState) => ({
        ...prevState,
        [name]: date,
      }));
    
   
  };

  /**
   * Calculates the age based on the given date of birth.
   * @param {string} dob - The date of birth in string format (e.g., "YYYY-MM-DD").
   */
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    setFormData((prevState) => ({
      ...prevState,
      Age: age,
    }));
    let month = parseInt(dob.$M) + 1;
      let day = parseInt(dob.$D);
      let year = parseInt(dob.$y);
      let date = `${month}/${day}/${year}`; // convert to Date object
      setFormData((prevState) => ({
        ...prevState,
        DOB: date,
      }));
  };

  /**
   * Handles the change event for the weight loss select input.
   * Updates the weight loss attempts in the form data state.
   *
   * @param {Event} e - The change event object.
   */
  const multiSelectChange = (e) => {
    const options = e.target.value;
    let selectedOptions = [...formData[e.target.name]];
    for (let i = 0; i < options.length; i++) {
      if (!selectedOptions.includes(options[i])) {
        selectedOptions.push(options[i]);
      }
    }
    selectedOptions = [...new Set(selectedOptions)];
    switch (e.target.name) {
      case "additionalWeightLossReasonsDisplay":
        setAdditionalWeightLossReasons(selectedOptions);
        break;
      case "weightLossAttempts":
        setFormData((prevState) => ({
          ...prevState,
          weightLossAttempts: selectedOptions,
        }));
        break;
      case "weightChallenges":
        setFormData((prevState) => ({
          ...prevState,
          weightChallenges: selectedOptions,
        }));
        break;
      case "eatingHabits":
        setFormData((prevState) => ({
          ...prevState,
          eatingHabits: selectedOptions,
        }));
        break;
    }
  };

  /**
   * Calculates the BMI (Body Mass Index) based on the provided weight and height values.
   * Updates the BMI and BMIClassification in the form data.
   *
   * @param {string} name - The name of the input field.
   * @param {string} value - The value of the input field.
   * @returns {void}
   */
  const calculateBMI = (name, value) => {
    let weight = parseInt(value);
    let heightIn =
      parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches);
    let aWeight = weight * 703;
    let BMI = aWeight / (heightIn * heightIn);

    let BMIClassification = "";

    switch (true) {
      case BMI < 25:
        BMIClassification = "normal weight";
        break;
      case BMI >= 25 && BMI < 30:
        BMIClassification = "overweight";
        break;
      case BMI >= 30 && BMI < 35:
        BMIClassification = "obese, classification I";
        break;
      case BMI >= 35.1 && BMI < 39.9:
        BMIClassification = "obese, classification II";
        break;
      case BMI >= 40:
        BMIClassification = "severely obese, classification III";
        break;
      default:
        BMIClassification = "unknown";
        break;
    }
    BMI = parseInt(BMI, 10);
    if (name === "goalWeight") {
      setFormData((prevState) => ({
        ...prevState,
        goalBMI: BMI,
        goalBMIClassification: BMIClassification,
        goalWeight: weight,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        BMI,
        BMIClassification,
        weight: weight,
      }));
    }
  };

  /**
   * Assigns pronouns based on the given value.
   *
   * @param {string} value - The value representing the gender.
   */
  const assignPronouns = (value) => {
    let pronoun, capPronoun, possessive, genderContraction, capPossessive;
    if (value === "male") {
      pronoun = "he";
      capPronoun = "He";
      possessive = "his";
      genderContraction = "Mr.";
      capPossessive = "His";
    } else if (value === "female") {
      pronoun = "she";
      capPronoun = "She";
      possessive = "her";
      genderContraction = "Ms.";
      capPossessive = "Her";
    } else if (value === "nonBinary") {
      pronoun = "they";
      capPronoun = "They";
      possessive = "their";
      genderContraction = "Mx.";
      capPossessive = "Their";
    }
    setFormData((prevState) => ({
      ...prevState,
      pronoun,
      possessive,
      genderContraction,
      capPronoun,
      gender: value,
      capPossessive,
    }));
  };

  /**
   * Parses the referring information based on the given index and updates the form data.
   * @param {number} index - The index of the referring information to parse.
   */
  const parseReferringInfo = (value) => {
    let index;
    let fieldOptions = formFields[4].options;
    for (let i = 0; i < fieldOptions.length; i++) {
      if (value.includes(fieldOptions[i])) {
        index = i;
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      referringProvider: refData[index].provider,
      referringFacility: refData[index].facility,
      referringAddress: refData[index].address,
      referringCityState: refData[index].cityState,
      referringFacilityFax: refData[index].fax,
      referringInfo: value,
    }));
  };

  /**
   * Sets the additional weight loss reasons based on the selected options.
   *
   * @param {Array} selectedOptions - The event object representing the change event.
   * @returns {void}
   */
  const setAdditionalWeightLossReasons = (selectedOptions) => {
    let optionsForForm = [
      ...formData.additionalWeightLossReasons,
    ];
      for (let i = 0; i < selectedOptions.length; i++) {
          switch (selectedOptions[i]) {
            case "Self-worth":
              optionsForForm.push(
                `${formData.capPronoun} believes that weight loss will help to bolster his feelings of self-worth`
              );
              break;
            case "Self-confidence":
              optionsForForm.push(
                `${formData.capPronoun} believes that weight loss will bolster his feelings of self-confidence`
              );
              break;
            case "Energy":
              optionsForForm.push(
                `Currently, ${formData.pronoun} is easily fatigued and anticipates that weight loss will lead to a greater degree of physical stamina`
              );
              break;
            case "Fitness":
              optionsForForm.push(
                `Currently, ${formData.capPronoun} is seeking to achieve a greater level of physical fitness and stamina`
              );
              break;
            case "Mobility":
              optionsForForm.push(
                `Currently, ${formData.capPronoun} is seeking to achieve an improved level of physical mobility.`
              );
              break;
            default:
              break;
          }
      setFormData((prevState) => ({
        ...prevState,
        additionalWeightLossReasons: optionsForForm,
        additionalWeightLossReasonsDisplay:selectedOptions,
      }));
    }
  };

  /**
   * Handles the form submission.
   *
   * @param {Event} e - The form submission event.
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const filePath = ipcRenderer.invoke("generate-docx", formData);
      console.log("Document generated at:", filePath);
    } catch (error) {
      console.error("Error generating document:", error);
    }
  };

const handleHandles = () => {
  if (formData.chronicPainBool) {
    handlePain();
  }
  if (formData.replacementSurgeryBool) {
    handleReplacement();
  }
  if (formData.diabetes) {
    handleDiabetes();
  }
  if (formData.sleepApnea) {
    handleApnea();
  }
  if (formData.hypnotics) {
    handleHypnotics();
  }
};

  /**
   * Handles the pain data and updates the form data state.
   */
  const handlePain = () => {
    let painStr = `${formData.genderContraction}.${formData.patientLastName} also has chronic ${formData.chronicPainText} and anticipates that significant weight loss will help to alleviate his discomfort.`;
    setFormData((prevState) => ({
      ...prevState,
      chronicPainSentence: painStr,
    }));
  };

  /**
   * Handles the replacement surgery sentence generation.
   */
  const handleReplacement = () => {
    let replaceStr = `${formData.genderContraction}.${formData.patientLastName} also anticipates needing a hip replacement and needs to demonstrate some degree of weight loss before ${formData.pronoun} is a candidate for this procedure.`;
    setFormData((prevState) => ({
      ...prevState,
      replacementSurgerySentence: replaceStr,
    }));
  };

  /**
   * Handles the diabetes condition for the patient.
   */
  const handleDiabetes = () => {
    let replaceStr = `${formData.genderContraction}.${formData.patientLastName} also has diabetes and seeks to better manage this condition via lifestyle change.`;
    setFormData((prevState) => ({
      ...prevState,
      replacementSurgerySentence: replaceStr,
    }));
  };

  /**
   * Handles the sleep apnea logic and updates the form data accordingly.
   */
  const handleApnea = () => {
    let apneaStr;
    if (formData.cpap) {
      apneaStr = `This patient has sleep apnea and regularly wears ${formData.possessive} CPAP device`;
    } else {
      apneaStr = "This patient has sleep apnea but does not use a CPAP device";
    }
    setFormData((prevState) => ({
      ...prevState,
      sleepApneaSentence: apneaStr,
    }));
  };

  /**
   * Handles the action for hypnotics.
   */
  const handleHypnotics = () => {
    let hypStr = `This patient takes the following to help with sleep onset: ${formData.hypnoticsText}`;
    setFormData((prevState) => ({
      ...prevState,
      hypnoticsSentence: hypStr,

    }));
  };

  /**
   * Displays the BMI.
   */
  const displayBMI = () => {
    setBMIBool(true);
  };

  return (
    <div style={{ width: "85%" }}>
      <h2>Fill out all relavant fields, and hit submit to review</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {formFields.map((field) => (
              <div key={field.name}>
                {field.type === "select" ? (
                  <div>
                    <FormControl fullWidth>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        variant="filled"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}>
                        {field.options.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>Select an option</FormHelperText>
                    </FormControl>
                  </div>
                ) : //--------------------------------------------------
                field.type === "multiSelect" ? (
                  <div>
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="select-multiple">
                        {field.label}
                      </InputLabel>
                      <Select
                        variant="filled"
                        multiple
                        inputProps={{
                          id: "select-multiple",
                        }}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}>
                        {field.options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>Select multiple options</FormHelperText>
                    </FormControl>
                  </div>
                ) : //--------------------------------------------------
                field.type === "textarea" ? (
                  <div>
                    <TextField
                      label={field.label}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      multiline
                      fullWidth
                      variant="filled"
                    />
                  </div>
                ) : //--------------------------------------------------
                field.type === "date" ? (
                  <div>
                    <DatePicker
                      variant="filled"
                      label={field.label}
                      value={today}
                      onChange={(date) => handleDateChange(field.name, date)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth variant="filled" />
                      )}
                    />
                  </div>
                ) : //--------------------------------------------------
                field.type == "checkbox" ? (
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={field.name}
                          checked={formData[field.name]}
                          onChange={handleChange}
                        />
                      }
                      label={field.label}
                      labelPlacement="start"
                    />
                  </div>
                ) : //--------------------------------------------------
                field.type == "button" ? (
                  <div>
                    <Button
                      name={field.name}
                      checked={formData[field.name]}
                      onClick={displayBMI}
                      type="button"
                      variant="contained"
                      color="davygray">
                      {field.label}
                    </Button>
                    {BMIBool && (
                      <div>
                        <p>BMI: {formData.BMI}</p>
                        <p>BMI Classification: {formData.BMIClassification}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  //--------------------------------------------------
                  <div>
                    <TextField
                      label={field.label}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      fullWidth
                      variant="filled"
                    />
                  </div>
                )}
              </div>
            ))}
          </Stack>
          <div className="buttonContainer">
            <Button size="large" variant="contained" color="lavenderblush" type="submit" >
              Submit
            </Button>
          </div>
        </form>
      </LocalizationProvider>
    </div>
  );
}

export default Form;
