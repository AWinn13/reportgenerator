export const formFields = [
  // Section 1
  { label: 'Date of Fax', type: 'date', name: 'dateOfFax' },
  { label: 'Patient First Name', type: 'text', name: 'patientFirstName' },
  { label: 'Patient Last Name', type: 'text', name: 'patientLastName' },
  { label: 'DOB', type: 'date', name: 'DOB' },
  { label: 'Referring Provider/Facility', type: 'select', name: 'referringInfo',  options: ['Troy Houseworth, MD Virginia Mason Fransciscan Center for Weight Management 34503 9th Ave S. #220 Federal Way, WA. 98003 Fax: 253-944-2093', 'Haroon Anwar Virginia Mason Fransciscan Center for Weight Management 34503 9th Ave S. #220 Federal Way, WA. 98003 253-944-2093', 'Monica Young, MD 3920 Capital Mall Dr. SW Olympia, WA  98502 360-596-4881', 'Multicare Rockwood Clinic 400 East 5th Ave. Spokane, WA  99202 509-342-2272 Attn: Stacy'] },
  { label: 'Current Date', type: 'date', name: 'currentDate' },
  { label: 'Gender', type: 'select', name: 'gender', options: ['male', 'female', 'nonBinary'] },
  { label: 'Evaluation Date', type: 'date', name: 'evalDate' },

  // Section 2
  { label: 'Present Mood', type: 'textarea', name: 'presentMood' },
  { label: 'Height - feet', type: 'text', name: 'heightFeet' },
  { label: 'Height - Inches', type: 'text', name: 'heightInches' },
  { label: 'Weight', type: 'text', name: 'weight' },
  { label: 'Overweight Text', type: 'textarea', name: 'owText' },
  { label: 'Overweight Duration', type: 'text', name: 'owDuration' },
  { label: 'Weight Loss Attempts', type: 'multiSelect', name: 'weightLossAttempts', options: ['calories restriction', 'physical exercise', 'a low-carbohydrate diet', 'a low-fat diet', 'a Weight Watcher’s membership', 'the SlimFast meal replacement program', 'the Jenny Craig weight loss program', 'a Nutrisystem membership', 'intermittent fasting', 'a ketogenic diet', 'over-the-counter appetite suppressant supplements', 'over-the-counter, “fat burner,” supplements', 'the prescription weight loss medication', 'the GLP-1 agonist', 'FREE TEXT'] },
  { label: 'Weight Loss Attempts Free Text', type: 'textarea', name: 'weightLossAttemptsFreeText' },
  { label: 'Weight Challenges', type: 'text', name: 'weightChallenges' },
  { label: 'Other Weight Challenges', type: 'textarea', name: 'otherWeightChallenges' },
  { label: 'Medical Issues', type: 'textarea', name: 'medicalIssues' },
  { label: 'Additional Weight Loss', type: 'textarea', name: 'aditionalWeightLoss' },
  { label: 'Chronic Pain (Yes/No)', type: 'checkbox', name: 'cronicPainBool' },
  { label: 'Chronic Pain Details', type: 'text', name: 'cronicPainText' },
  { label: 'Goal Weight', type: 'number', name: 'goalWeight' },
  { label: 'Second Medical Issue', type: 'text', name: 'secondMedicalIssue' },

  // Section 3
  { label: 'Sleep Satisfaction', type: 'text', name: 'sleepSatisfaction' },
  { label: 'Sleep Apnea', type: 'checkbox', name: 'sleepApnea' },
  { label: 'CPAP (Yes/No)', type: 'text', name: 'cpap' },
  { label: 'TST Free Text', type: 'text', name: 'tstFreeText' },
  { label: 'Medications', type: 'textarea', name: 'medications' },
  { label: 'Current Eating', type: 'text', name: 'currentEating' },
  { label: 'Current Eating (Alternative)', type: 'textarea', name: 'currentEatingAlt' },
  { label: 'Number of Meals', type: 'number', name: 'numMeals' },
  { label: 'Snacks', type: 'text', name: 'snacks' },
  { label: 'Eating Habits', type: 'text', name: 'eatingHabits' },
  { label: 'Caloric Intake', type: 'textarea', name: 'caloricIntake' },
  { label: 'Recent Diet', type: 'textarea', name: 'recentDiet' },
  { label: 'Recent Loss', type: 'textarea', name: 'recentLoss' },
  { label: 'Loss in Months', type: 'textarea', name: 'lossInMonths' },

  // Section 4
  { label: 'Patient City', type: 'text', name: 'patientCity' },
  { label: 'Living Situation', type: 'textarea', name: 'livingSituation' },
  { label: 'Employment Status', type: 'select', name: 'employStatus', options: ['employed', 'unemployed', 'student', 'retired'] },
  { label: 'Employment Status Details', type: 'textarea', name: 'employStatusText' },
  { label: 'Years of Employment', type: 'number', name: 'yearsOfEmploy' },
  { label: 'Years of Employment Details', type: 'textarea', name: 'yearsOfEmployText' },
  { label: 'Degree', type: 'select', name: 'degree', options: ['highschool', 'bachelor', 'master', 'doctorate'] },
  { label: 'Degree Details', type: 'textarea', name: 'degreeText' },
  { label: 'Include Sentence', type: 'textarea', name: 'includeSentence' },
  { label: 'Sign Off', type: 'checkbox', name: 'signOff' },
];