// UserForm.jsx
import React, { useState, useEffect } from 'react';

import FormStep1 from '../cmps/FormStep1';
import FormStep2 from '../cmps/FormStep2';
import FormStep3 from '../cmps/FormStep3';

export function UserForm () {
  const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({});

  const [formData, setFormData] = useState({
  eventType: '', // from Step1
    });



  const nextStep = () => {setStep((s) => s + 1)};
  const prevStep = () => setStep((s) => s - 1);

  const handleDataChange = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <>
      {step === 1 && <FormStep1 next={nextStep} onData={handleDataChange} />}
      {step === 2 && <FormStep2 next={nextStep} back={prevStep} data={formData} onData={handleDataChange} />}
      {step === 3 && <FormStep3 back={prevStep} data={formData} onData={handleDataChange} />}
    </>
  );
};

export default UserForm;
