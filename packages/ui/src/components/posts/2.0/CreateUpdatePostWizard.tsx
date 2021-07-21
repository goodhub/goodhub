import { FC, useEffect, useState } from 'react';
import Modal, { ModalState } from '../../generic/Modal';
import Wizard from '../../generic/Wizard';
import { Step } from 'react-albus';
import Title from '../../generic/Title';
import { FormProvider, useForm } from 'react-hook-form';
import { IExtendedOrganisation, IPost, IPostIdentity, IPostOrigin, IPostType } from '@strawberrylemonade/goodhub-lib';
import { useErrorService } from '../../../services/error-service';
import Navigation from '../../../translations/Navigation';
import { DropdownField } from '../../generic/forms/DropdownField';
import { ContentField } from '../../generic/forms/ContentField';
import { getExtendedOrganisation, getProjectsForOrganisation } from '../../../services/organisation-service';
import { useAuthenticationService } from '../../../services/authentication-service';
import { FeaturedContentOption, FeaturedContentType, getIconForOption } from './FeaturedContent';
import Button from '../../generic/Button';
import { MakeGraphic } from './MakeGraphic';
import { MakePicture } from './MakePicture';
import { PostVideoInput } from './PostVideoInput';
import { PostLinkInput } from './PostLinkInput';
import { submitNewPost, usePostService } from '../../../services/post-service';
import { graphicToImage } from '../../../services/image-service';

export interface CreateUpdatePostWizardProps {
  orgId?: string
  modalState: ModalState
  onDismiss: () => void
}

// enum Status {
//   Idle,
//   Loading
// }

const CreateUpdatePostWizard: FC<CreateUpdatePostWizardProps> = ({ modalState, onDismiss, orgId }) => {

  const setError = useErrorService(state => state.setError);
  const user = useAuthenticationService(state => state.user);
  const methods = useForm<IPost>({ shouldUnregister: false, defaultValues: { projectId: 'default', organisationId: orgId } });
  const [organisations, setOrganisations] = useState<IExtendedOrganisation[]>([])
  const [projects, setProjects] = useState<{ name: string, id: string }[]>([{ name: 'No specific service', id: 'default' }])
  const [config, setConfig] = useState<{ featuredContent?: FeaturedContentType }>({});
  const setRecentlyPostedPost = usePostService(state => state.setRecentlyPostedPost);
  // const [status, setStatus] = useState<Status>(Status.Idle)

  useEffect(() => {
    (async () => {
      try {
        if (!user?.organisations) return;
        const organisations = await Promise.all(user.organisations.map(getExtendedOrganisation));
        setOrganisations(organisations);
      } catch (e) {
        setError(e);
      }
    })()
  }, [user, setOrganisations, setError])

  const selectedOrganisationId = methods.watch('organisationId');
  const [selectedOrganisation] = organisations.filter((organisation) => organisation.id === selectedOrganisationId);

  useEffect(() => {
    (async () => {
      try {
        console.log('Getting projects for organisation: ', selectedOrganisationId)
        const projects = await getProjectsForOrganisation(selectedOrganisationId);
        setProjects([{ name: 'No specific service', id: 'default'}, ...projects ]);
      } catch (e) {
        setError(e);
      }
    })()
  }, [organisations, selectedOrganisationId, setError])

  const submit = async (data: IPost) => {
    const partialPost: Partial<IPost> = {
      organisationId: data.organisationId,
      origin: IPostOrigin.GoodHub,
      projectId: data.projectId,
      text: data.text,
      hero: data.hero,
      type: IPostType.Update,
      postedIdentity: data.postedIdentity
    }

    if (partialPost.hero?.type === 'graphic') {
      partialPost.hero.image = await graphicToImage(partialPost.hero.graphic)
    }
    // setStatus(Status.Loading);
    const post = await submitNewPost(partialPost);
    setRecentlyPostedPost(post);
    // setStatus(Status.Idle);
    onDismiss();
  }

  return <Modal padding="p-0" layout="items-center" state={modalState} onDismiss={onDismiss}>
    <FormProvider {...methods}>
      <form>
        <Wizard
          name={Navigation.posts.startNewPost}
          onComplete={methods.handleSubmit(submit)}
        >
          <Step id="Who and what" validate={['organisationId', 'projectId']}>
            <Title className="mb-2 hidden sm:block" size="xl">What do you want to post?</Title>
            <DropdownField 
              name="organisationId"
              title="Which organisation do you want to post this from?"
              options={organisations}
              hidden={organisations.length === 1}
              register={methods.register} 
            />

            <DropdownField 
              name="projectId"
              title="Is this post about a specific service?"
              options={projects}
              hidden={projects.length <= 1}
              register={methods.register}
            />

            <DropdownField 
              name="postedIdentity"
              title="Who do you want this posted as?"
              options={[{ id: IPostIdentity.Individual, name: 'As myself on behalf of the organisation'}, { id: IPostIdentity.Organisation, name: 'As the organisation'}] }
              register={methods.register}
            />

            <label className="block text-sm mb-1 font-medium text-gray-700">What is the featured content of this post? </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <FeaturedContentOption selected={config.featuredContent === FeaturedContentType.Graphic} option={FeaturedContentType.Graphic} onClick={() => setConfig({ ...config, featuredContent: FeaturedContentType.Graphic })}>
                { getIconForOption(FeaturedContentType.Graphic) }
              </FeaturedContentOption>
              <FeaturedContentOption selected={config.featuredContent === FeaturedContentType.Picture} option={FeaturedContentType.Picture} onClick={() => setConfig({ ...config, featuredContent: FeaturedContentType.Picture })}>
                { getIconForOption(FeaturedContentType.Picture) }
              </FeaturedContentOption>
              <FeaturedContentOption selected={config.featuredContent === FeaturedContentType.Video} option={FeaturedContentType.Video} onClick={() => setConfig({ ...config, featuredContent: FeaturedContentType.Video })}>
                { getIconForOption(FeaturedContentType.Video) }
              </FeaturedContentOption>
              <FeaturedContentOption selected={config.featuredContent === FeaturedContentType.Link} option={FeaturedContentType.Link} onClick={() => setConfig({ ...config, featuredContent: FeaturedContentType.Link })}>
                { getIconForOption(FeaturedContentType.Link) }
              </FeaturedContentOption>
              <FeaturedContentOption selected={config.featuredContent === FeaturedContentType.Text} option={FeaturedContentType.Text} onClick={() => setConfig({ ...config, featuredContent: FeaturedContentType.Text })}>
                { getIconForOption(FeaturedContentType.Link) }
              </FeaturedContentOption>
            </div>
            <label className="block text-sm mt-4 italic text-gray-500">Including an image or a video makes it much more likely that people will look at your post.</label>
            <label className="block text-sm mt-2 italic text-gray-500">We help you to easily make a graphic or customise an image with your logo, as well as being able to link to a webpage or youtube video, which will automatically fetches an image.</label>
            

          </Step>

          <Step id="Make your content">
            {(() => {
              if (!selectedOrganisation) return;
              switch (config.featuredContent) {
                case FeaturedContentType.Graphic:
                  return <MakeGraphic setValue={methods.setValue} register={methods.register} organisation={selectedOrganisation} />;
                case FeaturedContentType.Picture:
                  return <MakePicture setValue={methods.setValue} register={methods.register} organisation={selectedOrganisation} />;
                case FeaturedContentType.Video:
                  return <PostVideoInput setValue={methods.setValue} register={methods.register} />
                case FeaturedContentType.Link:
                  return <PostLinkInput setValue={methods.setValue} register={methods.register} />
                  case FeaturedContentType.Text:
                    return <PostLinkInput setValue={methods.setValue} register={methods.register} />
                default:
                  return null;
              }
            })()}    
          </Step>

          <Step id="Add text and #hashtags">
          <label className="block text-sm mb-1 font-medium text-gray-700">Add any extra text or #hashtags</label>
            <ContentField name="text" register={methods.register} setValue={methods.setValue} />
          </Step>

          <Step id="Where to send">
          </Step>
          <Step id="Post or schedule">
          </Step>

        </Wizard>
      </form>
    </FormProvider>
  </Modal>
}

export default CreateUpdatePostWizard;