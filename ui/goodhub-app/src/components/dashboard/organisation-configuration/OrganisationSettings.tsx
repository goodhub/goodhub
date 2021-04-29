import { IOrganisation } from '@strawberrylemonade/goodhub-lib';
import { FC, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { updateOrganisation, useOrganisationService } from '../../../services/organisation-service';
import { Action } from '../../generic/Page';
import Button from '../../generic/Button';
import Card from '../../generic/Card';
import Page from '../../generic/Page';
import Title from '../../generic/Title';
import CategoryConfiguration from './forms/CategoryConfiguration';
import OrganisationBasicsConfiguration from './forms/OrganisationBasicsConfiguration';
import { useErrorService } from '../../../services/error-service';
import BrandingConfiguration from './forms/BrandingConfiguration';

export interface OrganisationSettingsProps { }

const OrganisationSettings: FC<OrganisationSettingsProps> = () => {

  const [organisation, setOrganisation] = useOrganisationService(state => [state.organisation, state.setOrganisation]);
  const setError = useErrorService(state => state.setError);
  const methods = useForm<IOrganisation>({ criteriaMode: 'all' });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!organisation) return;
    methods.reset(organisation);
  }, [organisation, methods])

  const submitChanges = async (data: IOrganisation) => {
    if (!organisation) return;
    try {
      setLoading(true);
      const response = await updateOrganisation(organisation.id, data);
      setOrganisation(response)
      setLoading(false);
    } catch (e) {
      setError(e)
    }
  }

  const actions = (() => {
    if (!methods.formState.isDirty) return [];
    return [
      { name: 'Revert', onClick: () => methods.reset(organisation), mode: 'plain' },
      { name: 'Update', onClick: methods.handleSubmit(submitChanges) }
    ] as Action[]
  })()

  console.log(methods.errors);

  return <Page
    title="Settings"
    actions={actions}
    loading={loading}
  >
    <FormProvider {...methods}>
      <form>
        <Card className="mb-5">
          <div className="flex items-center justify-between py-4 px-6 w-full border-b border-gray-200">
            <Title size="xl" weight="semibold" tight={false}>Basics</Title>
          </div>
          <div className="p-5">
            <OrganisationBasicsConfiguration />
          </div>
        </Card>

        <Card className="mb-5">
          <div className="flex items-center justify-between py-4 px-6 w-full border-b border-gray-200">
            <Title size="xl" weight="semibold" tight={false}>Categories</Title>
          </div>
          <div className="p-5">
            <CategoryConfiguration />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between py-4 px-6 w-full border-b border-gray-200">
            <Title size="xl" weight="semibold" tight={false}>Branding</Title>
          </div>
          <div className="p-5">
            <BrandingConfiguration />
          </div>
        </Card>

        <div className="py-4 flex justify-end">
          <div className="flex">
            {actions.map((a, i) => <Button className={`${i === (actions.length - 1) ? 'mr-0' : 'mr-4'}`} onClick={a.onClick} mode={a.mode ? a.mode : 'primary'}>{a.name}</Button>)}
          </div>
        </div>
      </form>
    </FormProvider>
  </Page>;
}

export default OrganisationSettings;
