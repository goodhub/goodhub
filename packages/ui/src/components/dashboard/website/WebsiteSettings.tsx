import { IExtendedOrganisation } from '@strawberrylemonade/goodhub-lib';
import { FC, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { updateWebsiteConfiguration, useOrganisationService } from '../../../services/organisation-service';
import { Action, PageBehaviour } from '../../generic/Page';
import Card from '../../generic/Card';
import Page from '../../generic/Page';
import Title from '../../generic/Title';
import HeroConfiguration from './forms/HeroConfiguration';
import { useErrorService } from '../../../services/error-service';
import { useNotificationService } from '../../../services/notification-service';
import ProjectConfiguration from './forms/ProjectConfiguration';
import LinkConfiguration from './forms/LinkConfiguration';

export interface WebsiteSettingsProps { }

const WebsiteSettings: FC<WebsiteSettingsProps> = () => {

  const [organisation, setOrganisation] = useOrganisationService(state => [state.organisation, state.setOrganisation]);
  const setError = useErrorService(state => state.setError);
  const addNotification = useNotificationService(state => state.addNotification)
  const methods = useForm<IExtendedOrganisation & { featuredProjectsIds: { [key: string]: boolean } }>({ criteriaMode: 'all' });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!organisation) return;
    const featuredProjectsIds = organisation.projects?.reduce((f, p) => ({...f, [p.id]: organisation.featuredProjects?.includes(p.id) }), {});
    methods.reset({...organisation, featuredProjectsIds});
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [organisation])

  const submitChanges = async (data: Partial<IExtendedOrganisation & { featuredProjectsIds: { [key: string]: boolean } }>) => {
    console.log(data, organisation);
    if (!organisation) return;
    try {
      setLoading(true);
      const featuredProjects = Object.keys(data.featuredProjectsIds ?? {}).filter(p => (data.featuredProjectsIds?.[p]))
      const response = await updateWebsiteConfiguration(organisation.id, {...data, featuredProjects});
      setOrganisation(response)
      addNotification('Update to organisation was successful.')
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


  return <Page
    title="Settings"
    behaviour={PageBehaviour.Form}
    actions={actions}
    loading={loading}
  >
    <FormProvider {...methods}>
      <form>
        <Card className="mb-5">
          <div className="flex items-center justify-between py-4 px-6 w-full border-b border-gray-200">
            <Title className="mt-2" size="xl" weight="semibold" tight={false}>Homepage</Title>
          </div>
          <div className="p-5">
            <HeroConfiguration />
          </div>
        </Card>

        <Card className="mb-5">
          <div className="flex items-center justify-between py-4 px-6 w-full border-b border-gray-200">
            <Title className="mt-2" size="xl" weight="semibold" tight={false}>Projects</Title>
          </div>
          <div className="p-5">
            <ProjectConfiguration options={organisation?.projects?.map(p => ({name: p.id, title: p.name}))} />
          </div>
        </Card>

        <Card className="mb-5">
          <div className="flex items-center justify-between py-4 px-6 w-full border-b border-gray-200">
            <Title className="mt-2" size="xl" weight="semibold" tight={false}>Links</Title>
          </div>
          <div className="p-5">
            <LinkConfiguration />
          </div>
        </Card>
      </form>
    </FormProvider>
  </Page>;
}

export default WebsiteSettings;
