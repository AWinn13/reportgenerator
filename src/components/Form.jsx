import React, { useState } from "react";
import ReactDOM from "react-dom";
import { formFields } from "../data/fieldConfig";
import "../index.css";
import { refData } from "../data/referringinfo";

function Form() {
  const [BMIBool, setBMIBool] = useState(false);
  const [lossBool, setLossBool] = useState(true);
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
    cronicPainBool: "",
    cronicPainText: "",
    goalWeight: "",
    secondMedicalIssue: "",
    sleepSatisfaction: "",
    sleepApnea: "",
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
    signOff: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
          [name]: value,
        }));
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

  // !! TODO REFACTOR
  const calculateBMI = (e) => {
    e.preventDefault();
    let heightIn =
      parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches);
    let aWeight = formData.weight * 703;
    formData.BMI = aWeight / (heightIn * heightIn);
    setBMIBool(true);
  };
// !! TODO weightLoss challenges multi select and free text
//!! second medical issue
//!! sleep apnea
//!! cpap
//!! current eating
//!! eating habits
//!! living situation
//!! include sentence
//!! sign off
//!! FONT and styling 


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
    let emptyData = Object.values(formData).filter((data) => data === "");
    if (emptyData.length > 0) {
      alert("Please fill out all fields, the following are empty: " + emptyData);
      return;
    }

  };

  return (
    <div>
      <div>
        {formFields.map((field) => (
          <div className="field" key={field.name}>
            <label className="label">{field.label}</label>
            <div className="control">
              {field.type === "select" ? (
                <div className="select">
                  <select
                    name={field.name}
                    value={
                      Array.isArray(formData[field.name])
                        ? formData[field.name][0]
                        : formData[field.name]
                    }
                    onChange={handleChange}>
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ) : field.type === "multiSelect" ? (
                <div className="select">
                  <select
                    multiple
                    name={field.name}
                    value={
                      Array.isArray(formData[field.name])
                        ? formData[field.name][0]
                        : formData[field.name]
                    }
                    onChange={handleChange}>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ) : field.type === "textarea" ? (
                <textarea
                  className="textarea"
                  placeholder={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  className="input"
                  type={field.type}
                  placeholder={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Form;
