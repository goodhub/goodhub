import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextAreaField } from '../../../generic/forms/TextAreaField';
import { TextField } from '../../../generic/forms/TextField';
import Title from '../../../generic/Title';

export interface OrganisationBasicsConfigurationProps {}

const OrganisationBasicsConfiguration: FC<OrganisationBasicsConfigurationProps> = () => {
  const { register, errors } = useFormContext();

  console.log(errors);

  return (
    <>
      <TextField
        name="name"
        placeholder="Local Park Trust"
        register={register}
        title="Name of organisation"
        description="We use this for your website and social media"
        validationFailed={errors?.name}
        validationMessage="You must enter a name for your organisation"
      />
      <TextField
        name="description"
        placeholder="A community to improve and maintain our beautiful local park"
        register={register}
        title="Mission or description"
        description="What you do, and who you do it for"
        validationFailed={errors?.description}
        validationMessage="You must enter a description for your organisation"
      />

      <Title size="lg" className="mt-6 mb-2">
        Contact information
      </Title>
      <TextField
        name="contactPhoneNumber"
        placeholder="0115 9876543"
        register={register}
        title="Organisation’s phone number"
        validationFailed={errors?.contactPhoneNumber}
        validationMessage="You must enter a phone number for your organisation"
      />
      <TextAreaField
        name="contactAddress"
        placeholder={`10 Park Street,\nParkville,\nPK1 1PK`}
        register={register}
        title="Organisation’s address"
        validationFailed={errors?.contactAddress}
        validationMessage="You must enter an address for your organisation"
      />
      <TextField name="UKCharityNumber" placeholder="123456" register={register} title="Charity number" />
    </>
  );
};

export default OrganisationBasicsConfiguration;
