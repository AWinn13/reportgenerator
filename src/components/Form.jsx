import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { formFields } from "../data/fieldConfig";
import "../index.css";
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
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { refData } from "../data/referringinfo";
import dayjs, { Dayjs } from "dayjs";

// !! TODO weightLoss challenges multi select and free text
//!! second medical issue
//!! sleep apnea
//!! cpap
//!! current eating
//!! eating habits
//!! living situation
//!! include sentence
//!! sign off

function Form() {
  const [BMIBool, setBMIBool] = useState(false);

  const [today, setToday] = useState(dayjs("2024-01-01"));
  const [formData, setFormData] = useState({
    dateOfFax: "",
    patientFirstName: "",
    patientLastName: "",
    DOB: "",
    Age: 0,
    referringInfo: "",
    referringProvider: "",
    referringFacility: "",
    referringAddressA: "",
    referringAddressB: "",
    referringAddressC: "",
    referringCityState: "",
    referringFacilityFax: "",
    currentDate: "",
    gender: "",
    pronoun: "",
    capPronoun: "",
    possessive: "",
    genderContraction: "",
    evalDate: "",
    presentMood: "",
    heightFeet: 0,
    heightInches: 0,
    weight: 0,
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
    additionalWeightLossFreeText: "",
    cronicPainBool: false,
    cronicPainSentence: "",
    cronicPainText: "",
    replacementSurgeryBool: false,
    replacementSurgerySentence: "",
    diabetes: false,
    goalWeight: 0,
    goalBMI: 0,
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
    eatingHabits: "",
    caloricIntake: "",
    recentDiet: "",
    recentLoss: "",
    lossInMonths: "",
    patientCity: "",
    livingSituation: "",
    employStatus: "",
    employStatusText: "",
    yearsOfEmploy: "",
    yearsOfEmployText: "",
    degree: "",
    degreeText: "",
    includeSentence: false,
    signOff: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    switch (name) {
      case "gender":
        assignPronouns(value);
        break;
      case "referringInfo":
        parseReferringInfo(e.target.selectedIndex);
        break;
      case "weightLossAttempts":
        weightLossChange(e);
        break;
      case "DOB":
        calculateAge(value);
        break;
      case "goalWeight":
      case "weight":
        calculateBMI(name, value);
        break;
      case "certainFoodCravings":
        let str = "Regarding the latter, he has a particular affinity for";
        str = str.concat(value);
        setFormData((prevState) => ({
          ...prevState,
          certainFoodCravings: str,
        }));
        break;
      case "additionalWeightLossReasons":
        setAdditionalWeightLossReasons(e);
        break;
      case "sleepSatisfaction":
        if (checked){
          setFormData((prevState) => ({
            ...prevState,
            sleepSatisfactionText: "satisfied"
          }));
        };
      default:
        break;
    }
  };

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
  };

  const weightLossChange = (e) => {
    const { options } = e.target;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      weightLossAttempts: selectedOptions,
    }));
  };

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
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        BMI,
        BMIClassification,
      }));
    }
  };

  const assignPronouns = (value) => {
    let pronoun, capPronoun, possessive, genderContraction;
    if (value === "male") {
      pronoun = "he";
      capPronoun = "He";
      possessive = "his";
      genderContraction = "Mr.";
    } else if (value === "female") {
      pronoun = "she";
      capPronoun = "She";
      possessive = "her";
      genderContraction = "Ms.";
    } else if (value === "nonBinary") {
      pronoun = "they";
      capPronoun = "They";
      possessive = "their";
      genderContraction = "Mx.";
    }
    setFormData((prevState) => ({
      ...prevState,
      pronoun,
      possessive,
      genderContraction,
      capPronoun,
    }));
  };

  const parseReferringInfo = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      referringProvider: refData[index].provider,
      referringFacility: refData[index].facility,
      referringAddress: refData[index].address,
      referringCityState: refData[index].cityState,
      referringFacilityFax: refData[index].fax,
    }));
  };

  const setAdditionalWeightLossReasons = (e) => {
    const { options } = e.target;
    const selectedOptions = [];
    if (options) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          switch (options[i].value) {
            case "Self-worth":
              selectedOptions.push(
                `${formData.capPronoun} believes that weight loss will help to bolster his feelings of self-worth`
              );
              break;
            case "Self-confidence":
              selectedOptions.push(
                `${formData.capPronoun} believes that weight loss will bolster his feelings of self-confidence`
              );
              break;
            case "Energy":
              selectedOptions.push(
                `Currently, ${formData.pronoun} is easily fatigued and anticipates that weight loss will lead to a greater degree of physical stamina`
              );
              break;
            case "Fitness":
              selectedOptions.push(
                `Currently, ${formData.capPronoun} is seeking to achieve a greater level of physical fitness and stamina`
              );
              break;
            case "Mobility":
              selectedOptions.push(
                `Currently, ${formData.capPronoun} is seeking to achieve an improved level of physical mobility.`
              );
              break;
            default:
              break;
          }
        }
      }
      setFormData((prevState) => ({
        ...prevState,
        additionalWeightLossReasons: selectedOptions,
      }));
    }
    console.log(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value)
    );
    if (Object.keys(filteredData).length !== Object.keys(formData).length) {
      const emptyData = Object.keys(formData).filter(
        (key) => !filteredData.hasOwnProperty(key)
      );
      alert(
        "Please fill out all fields, the following are empty: " +
          emptyData.join(", ")
      );
      return;
    }
    if (formData.cronicPainBool) {
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

  const handlePain = () => {
    let painStr = `${formData.genderContraction}.${formData.patientLastName} also has chronic ${formData.cronicPainText} and anticipates that significant weight loss will help to alleviate his discomfort.`;
    setFormData((prevState) => ({
      ...prevState,
      cronicPainSentence: painStr,
    }));
  };

  const handleReplacement = () => {
    let replaceStr = `${formData.genderContraction}.${formData.patientLastName} also anticipates needing a hip replacement and needs to demonstrate some degree of weight loss before ${formData.pronoun} is a candidate for this procedure.`;
    setFormData((prevState) => ({
      ...prevState,
      replacementSurgerySentence: replaceStr,
    }));
  };

  const handleDiabetes = () => {
    let replaceStr = `${formData.genderContraction}.${formData.patientLastName} also has diabetes and seeks to better manage this condition via lifestyle change.`;
    setFormData((prevState) => ({
      ...prevState,
      replacementSurgerySentence: replaceStr,
    }));
  };

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
  }

    const handleHypnotics = () => {
      let hypStr = `This patient takes the following to help with sleep onset: ${formData.hypnoticsText}`;
      setFormData((prevState) => ({
        ...prevState,
        hypnoticsSentence: hypStr,
      }));
    }


  const handleDateChange = (name, date) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const displayBMI = () => {
    setBMIBool(true);
  };

  return (
    <div style={{ width: "75%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {formFields.map((field) => (
              <div key={field.name}>
                {field.type === "select" ? (
                  <div>
                    <FormControl fullWidth>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
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
                        multiple
                        native
                        inputProps={{
                          id: "select-multiple",
                        }}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
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
                      variant="outlined"
                    />
                  </div>
                ) : //--------------------------------------------------
                field.type === "date" ? (
                  <div>
                    <DatePicker
                      label={field.label}
                      value={today}
                      onChange={(date) => handleDateChange(field.name, date)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
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
                      variant="contained">
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
                      variant="outlined"
                    />
                  </div>
                )}
              </div>
            ))}
          </Stack>
          <Button variant="contained" color="amaranth" type="submit">
            Submit
          </Button>
        </form>
      </LocalizationProvider>
    </div>
  );
}

export default Form;
