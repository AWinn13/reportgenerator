import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import SectionOne from "./SectionOne.jsx";
import SectionTwo from "./SectionTwo.jsx";
import SectionThree from "./SectionThree.jsx";
import SectionFour from "./SectionFour.jsx";
import "../index.css";
import data from "../assets/referringinfo.json" 

function Form() {
  const navigate = useNavigate();
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
    BMIClassification:"",
    owText: "",
    owDuration: "",
    weightLossAttempts: [],
    weightLossAttemptsFreeText:"",
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
    if (formData[name] == formData.gender) {
      assignPronouns(value);
    }
    if(formData[name] == formData.referringInfo){
      parseReferringInfo(value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const parseReferringInfo = (value) => {
    switch (value) {
      case "A":
        formData.referringProvider = data.A.provider;
        formData.referringFacility = data.B.facility;
        formData.referringAddress = data.A.address;
        formData.referringCityState = data.A.cityState;
        formData.referringFacilityFax = data.A.fax;
        break;
      case "B":
        formData.referringProvider = data.B.provider;
        formData.referringFacility = data.B.facility;
        formData.referringAddress = data.B.address;
        formData.referringCityState = data.B.cityState;
        formData.referringFacilityFax = data.B.fax;
        console.log(formData);
        break;
      case "C":
        formData.referringProvider = data.C.provider;
        formData.referringFacility = data.C.facility;
        formData.referringAddress = data.C.address;
        formData.referringCityState = data.C.cityState;
        formData.referringFacilityFax = data.C.fax;
        break;
      case "D":
        formData.referringProvider = data.D.provider;
        formData.referringFacility = data.D.facility;
        formData.referringAddress = data.D.address;
        formData.referringCityState = data.D.cityState;
        formData.referringFacilityFax = data.D.fax;
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <h2 className="subtitle is-3">
        Fill out all fields, hit submit for field validation and download the
        document
      </h2>
      <form id="form" onSubmit={handleSubmit}>
        <SectionOne formData={formData} handleChange={handleChange} />
        <SectionTwo formData={formData} handleChange={handleChange} />
        <SectionThree formData={formData} handleChange={handleChange} />
        <SectionFour formData={formData} handleChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;