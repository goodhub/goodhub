import { FC, ReactNode, useState } from 'react';
import { Steps, Wizard as Dumbledore } from 'react-albus';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import Button from './Button';
import Title from './Title';

type WizardProps = {
  name: string
  decoration?: (className?: string) => ReactNode
  introduction?: ReactNode
  onComplete: () => void
}

interface IStep {
  id: string
  complete: boolean
  current: boolean
}

const Step: FC<{ step: IStep }> = ({ step }) => {
  return <li className="list-none" key={step.id}>
    {step.complete ? (
      <div className="group">
        <span className="flex items-start">
          <span className="flex-shrink-0 relative h-5 w-5 flex items-center justify-center">
            <RiCheckboxCircleFill
              className="h-full w-full text-primary-600 group-hover:text-primary-800"
              aria-hidden="true"
            />
          </span>
          <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
            {step.id}
          </span>
        </span>
      </div>
    ) : step.current ? (
      <div className="flex items-start" aria-current="step">
        <span className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center" aria-hidden="true">
          <span className="absolute h-4 w-4 rounded-full bg-primary-200" />
          <span className="relative block w-2 h-2 bg-primary-600 rounded-full" />
        </span>
        <span className="ml-3 text-sm font-medium text-primary-600">{step.id}</span>
      </div>
    ) : (
      <div className="group">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center" aria-hidden="true">
            <div className="h-2 w-2 bg-gray-300 rounded-full group-hover:bg-gray-400" />
          </div>
          <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.id}</p>
        </div>
      </div>
    )}
  </li>
}


const Wizard: FC<WizardProps> = ({ children, name, introduction, decoration, onComplete }) => {

  const [hasStarted, setHasStarted] = useState<boolean>(!introduction);

  return <Dumbledore render={(wizard) => {

    const currentStepIndex = wizard.steps.reduce<number>((output, step, index) => {
      if (output) return output;
      if (step.id === wizard.step.id) return index;
      return 0;
    }, 0);

    const steps: IStep[] = wizard.steps.map((step, index) => {
      return { ...step, current: currentStepIndex === index, complete: index < currentStepIndex }
    });

    const [currentStep] = steps.filter(s => s.current);

    return <div className="flex w-screen sm:w-modal h-screen sm:h-4xl sm:max-h-modal sm:max-w-7xl">
      { !hasStarted
        ? <div className="flex flex-col overflow-y-scroll text-center mx-auto w-full max-w-3xl text-gray-700 p-8">
            <Title>{name}</Title>
            { decoration?.('flex-grow p-6') }
            {introduction}
            <Button className="w-max-content mt-6 mx-auto" mode="primary" onClick={() => setHasStarted(true)}>Get started</Button>
          </div>
        : <div className="w-full flex flex-col sm:flex-row">
            <div className="bg-white border border-gray-200 shadow-sm min-w-max-content hidden sm:flex flex-col sm:p-6">
              <div className="flex w-full">
                <div className="flex flex-col flex-grow m-2">
                  <Title size="lg" className="sm:mb-2 sm:text-xl opacity-75">{name}</Title>
                  {decoration ? <div className="hidden sm:block w-56 mt-2 mb-4 p-2">
                    { decoration?.() }
                  </div> : null}
                  <ol className="hidden sm:block space-y-2">
                    {steps.map(step => <Step step={step} />)}
                  </ol>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col relative overflow-y-scroll bg-gray-100">
              <div className="bg-white border border-gray-200 shadow-sm min-w-max-content p-1 flex flex-col sm:hidden">
                <div className="flex w-full">
                  <div className="flex flex-col flex-grow m-2">
                    <Title size="lg" className="sm:mb-2 sm:text-xl opacity-75">{name}</Title>
                    <span className="sm:hidden -mt-2">
                      {currentStep ? <Title size="2xl" tight={false}>{currentStep.id}</Title> : null}
                    </span>
                    <div className="flex mt-2">
                      {steps.map((s, i) => <span className={`h-2 flex-1 mr-5 rounded-lg ${i !== currentStepIndex ? 'bg-gray-100' : 'bg-primary-500'}`}></span>)}
                    </div>
                  </div>
                  { decoration?.('h-20 w-20 sm:hidden mr-3') }
                </div>
              </div>
              <div className="sm:flex-grow overflow-y-scroll p-4 sm:p-8 pb-20 sm:pb-8">
                <Steps>
                  {children}
                </Steps>
              </div>
              <div className="fixed bottom-0 w-full sm:relative bg-white border-t border-gray-200 shadow-sm p-4 flex justify-between">
                <span>{currentStepIndex > 0 ? <Button onClick={wizard.previous}>Previous</Button> : null}</span>
                <span>{currentStepIndex !== steps.length - 1 ? <Button className="" mode="primary" onClick={wizard.next}>Next</Button> : <Button mode="primary" onClick={onComplete}>Finish</Button>}</span>
              </div>
            </div>
          </div>
      }
    </div>
  }} />;
}

export default Wizard;