import React from 'react';
import { Step } from '../App';

interface EnrollmentStepperProps {
  steps: Step[];
  currentStep: number;
}

const EnrollmentStepper: React.FC<EnrollmentStepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center flex-1">
            <div className={`
              flex items-center justify-center w-12 h-12 rounded-full
              ${currentStep === step.id 
                ? 'bg-blue-600 text-white' 
                : currentStep > step.id 
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }
              transition-colors duration-200
            `}>
              {step.icon}
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-medium text-gray-900">{step.title}</p>
              <p className="text-xs text-gray-500 mt-1">{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`
              flex-1 h-0.5 mx-4
              ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}
              transition-colors duration-200
            `} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default EnrollmentStepper;