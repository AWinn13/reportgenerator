import React, { useState } from "react";
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
  //!! fix checkbox




function Form() {
  const [BMIBool, setBMIBool] = useState(false);
  const [lossBool, setLossBool] = useState(true);

  const [today, setToday] = useState(dayjs("2024-01-01"));
  const [formData, setFormData] = useState({
    dateOfFax: "",
    patientFirstName: "",
    patientLastName: "",
    DOB: "",
    referringInfo: "",
    referringProvider: "",
    referringFacility: "",
    referringAddress: "",
    referringCityState: "",
    referringFacilityFax: "",
    currentDate: "",
    gender: "",
    pronoun: "",
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
    weightChallenges: "",
    otherWeightChallenges: "",
    medicalIssues: "",
    aditionalWeightLoss: "",
    cronicPainBool: false,
    cronicPainText: "",
    goalWeight: "",
    secondMedicalIssue: "",
    sleepSatisfaction: "",
    sleepApnea: false,
    cpap: "",
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
    includeSentence: "",
    signOff: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
      default:
        setFormData((prevState) => ({
          ...prevState,
          [name]: type === 'checkbox' ? checked : value,
        }));
        console.log(formData);
        console.log(`${name}: ${type === 'checkbox' ? checked : value}`); // Log the checkbox state
        break;
    }
  };

  const weightLossChange = (e) => {
    e.preventDefault();
    let options = e.target.options;
    options.forEach((option) => {
      if (option.selected) {
        formData.weightLossAttempts.push(option.value);
      }
    });
  };

  const calculateBMI = () => {
    let heightIn =
      parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches);
    let aWeight = formData.weight * 703;
    formData.BMI = aWeight / (heightIn * heightIn);
    switch (true) {
      case formData.BMI < 25:
        formData.BMIClassification = "normal weight";
        break;
      case formData.BMI >= 25 && formData.BMI < 30:
        formData.BMIClassification = "overweight";
        break;
      case formData.BMI >= 30 && formData.BMI < 35:
        formData.BMIClassification = "obese, classification I";
        break;
      case formData.BMI >= 35.1 && formData.BMI < 39.9:
        formData.BMIClassification = "obese, classification II";
        break;
      case formData.BMI >= 40:
        formData.BMIClassification = "severely obese, classification III";
        break;
      default:
        formData.BMIClassification = "unknown";
        break;
    }
    console.log(formData);
    setBMIBool(true);
  };

  const assignPronouns = (value) => {
    switch (value) {
      case "male":
        formData.pronoun = "he";
        formData.possessive = "his";
        formData.genderContraction = "Mr.";
        break;
      case "female":
        formData.pronoun = "she";
        formData.possessive = "her";
        formData.genderContraction = "Ms.";
        break;
      case "nonBinary":
        formData.pronoun = "they";
        formData.possessive = "their";
        formData.genderContraction = "Mx.";
        break;
    }
  };

  const parseReferringInfo = (index) => {
    formData.referringProvider = refData[index].provider;
    formData.referringFacility = refData[index].facility;
    formData.referringAddress = refData[index].address;
    formData.referringCityState = refData[index].cityState;
    formData.referringFacilityFax = refData[index].fax;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let emptyData = [];
    for (const key in formData) {
      formData[key] ? null : emptyData.push(key);
    }
    console.log(emptyData);
    if (emptyData.length > 0) {
      alert(
        "Please fill out all fields, the following are empty: " + emptyData
      );
      return;
    }
    calculateBMI();
  };

  const Item = styled("div")(({ theme }) => ({
    // backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    padding: 20,
  }));

  return (
    <div style={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {formFields.map((field) => (
              <div key={field.name}>
                {field.type === "select" ? (
                  <Item>
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
                  </Item>
                ) : field.type === "multiSelect" ? (
                  <Item>
                    <FormControl fullWidth>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        multiple
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
                  </Item>
                ) : field.type === "textarea" ? (
                  <Item>
                    <TextField
                      label={field.label}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      multiline
                      fullWidth
                      variant="outlined"
                    />
                  </Item>
                ) : field.type === "date" ? (
                  <Item>
                    <DatePicker
                      label={field.label}
                      value={today}
                      onChange={(date) => handleDateChange(field.name, date)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Item>
                ) : field.type == "checkbox" ? (
                  <Item>
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
                  </Item>
                ) : (
                  <Item>
                    <TextField
                      label={field.label}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Item>
                )}
              </div>
            ))}
          </Stack>
          <Button variant="contained" color="mossgreen" type="submit">
            Submit
          </Button>
        </form>
      </LocalizationProvider>
    </div>
  );
}

export default Form;
