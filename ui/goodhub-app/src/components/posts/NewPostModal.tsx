import { Content, IHeroImage, IPost, IPostIdentity, IPostOrigin, IPostType } from '@strawberrylemonade/goodhub-lib';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../generic/Button';
import Modal, { ModalState } from '../generic/Modal';

import { submitNewPost } from '../../services/post-service';
import { ContentField } from '../generic/forms/ContentField';
import { TextField } from '../generic/forms/TextField';
import { ImageField } from '../generic/forms/ImageField';

interface FeaturedContent {
  type: FeaturedContentType
}

enum FeaturedContentType {
  Picture = 'Picture',
  Video = 'Video',
  Graphic = 'Graphic',
  Link = 'Link'
}

const getIconForOption = (option: FeaturedContentType) => {
  switch (option) {
    case FeaturedContentType.Picture:
      return <svg width="59" height="38" viewBox="0 0 59 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M58.5837 0.771729H0.792358V37.2388H58.5837V0.771729ZM56.175 3.04961H3.2011V34.961H56.175V3.04961Z" fill="#454545"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.60767 5.32945V31.7772C5.60767 32.3199 6.30295 32.5892 6.70703 32.2045L16.52 22.8514C17.2379 22.1677 18.3937 22.1313 19.1567 22.766L22.1502 25.249C22.8861 25.8623 23.9923 25.8516 24.7192 25.2255L33.986 17.2164C34.7423 16.5626 35.9071 16.584 36.6385 17.2656L52.6756 32.2295C53.0797 32.6099 53.7682 32.3364 53.7682 31.7979V5.32886L5.60767 5.32945ZM42.33 12.1673C42.33 9.96426 44.215 8.17783 46.5448 8.17783C48.8722 8.17783 50.7572 9.9642 50.7572 12.1673C50.7572 14.3704 48.8723 16.1568 46.5448 16.1568C44.2151 16.1568 42.33 14.3704 42.33 12.1673Z" fill="#454545"/>
      </svg>

    case FeaturedContentType.Video:
      return <svg width="57" height="34" viewBox="0 0 57 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M55.2187 0.00490021H1.78125C1.28918 0.00490021 0.890625 0.403456 0.890625 0.895525V32.958C0.890625 33.194 0.984139 33.4212 1.15113 33.5882C1.31813 33.7552 1.54524 33.8487 1.78127 33.8487H55.2188C55.4548 33.8487 55.6819 33.7552 55.8489 33.5882C56.0159 33.4212 56.1094 33.1941 56.1094 32.958V0.895525C56.1094 0.659511 56.0159 0.4324 55.8489 0.26539C55.6819 0.0983795 55.4548 0.00488281 55.2188 0.00488281L55.2187 0.00490021ZM2.67159 23.1611H6.23409V24.9424H2.67159V23.1611ZM2.67159 19.5986H6.23409V21.3799H2.67159V19.5986ZM2.67159 16.0362H6.23409V17.8174H2.67159V16.0362ZM2.67159 12.4737H6.23409V14.2549H2.67159V12.4737ZM2.67159 8.91115H6.23409V10.6924H2.67159V8.91115ZM6.23409 7.1299H2.67159V5.34865H6.23409V7.1299ZM2.67159 26.7236H6.23409V28.5049H2.67159V26.7236ZM8.01534 1.78615H48.9841V32.0674H8.01534V1.78615ZM54.3278 7.1299H50.7653V5.34865H54.3278V7.1299ZM54.3278 10.6924H50.7653V8.91115H54.3278V10.6924ZM54.3278 14.2549H50.7653V12.4737H54.3278V14.2549ZM54.3278 17.8174H50.7653V16.0362H54.3278V17.8174ZM54.3278 21.3799H50.7653V19.5986H54.3278V21.3799ZM54.3278 24.9424H50.7653V23.1611H54.3278V24.9424ZM50.7653 26.7236H54.3278V28.5049H50.7653V26.7236ZM54.3278 3.5674H50.7653V1.78615H54.3278V3.5674ZM2.67159 1.78615H6.23409V3.5674H2.67159V1.78615ZM2.67159 30.2861H6.23409V32.0674H2.67159V30.2861ZM54.3278 32.0674H50.7653V30.2861H54.3278V32.0674ZM34.1818 16.1074L23.4943 11.6543C23.2226 11.5429 22.9109 11.5719 22.666 11.7344C22.4166 11.8992 22.2674 12.1753 22.2652 12.4737V21.3799C22.2674 21.676 22.4144 21.9521 22.6615 22.1169C22.9087 22.2817 23.2204 22.3129 23.4943 22.1993L34.1818 17.7462C34.5113 17.6059 34.7228 17.2831 34.7228 16.9268C34.7228 16.5706 34.5113 16.2477 34.1818 16.1074L34.1818 16.1074ZM24.0466 20.0439V13.8093L31.5278 16.9265L24.0466 20.0439Z" fill="#454545"/>
      </svg>      

    case FeaturedContentType.Graphic:
      return <svg width="57" height="36" viewBox="0 0 57 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M55.6245 0.771729H0.874531C0.469608 0.771729 0.144531 1.09966 0.144531 1.50173V34.3517C0.144531 34.7538 0.469608 35.0817 0.874531 35.0817H55.6245C56.0295 35.0817 56.3545 34.7538 56.3545 34.3517V1.50173C56.3545 1.09966 56.0295 0.771729 55.6245 0.771729ZM54.8945 33.6217H1.60453V2.23173H54.8945V33.6217Z" fill="#454545"/>
      <path d="M8.17443 22.3066C10.5897 22.3066 12.5544 20.3419 12.5544 17.9266C12.5544 15.5114 10.5897 13.5466 8.17443 13.5466C5.75916 13.5466 3.79443 15.5114 3.79443 17.9266C3.79443 20.3419 5.75916 22.3066 8.17443 22.3066ZM8.17443 15.0066C9.78554 15.0066 11.0944 16.3155 11.0944 17.9266C11.0944 19.5377 9.78554 20.8466 8.17443 20.8466C6.56332 20.8466 5.25443 19.5377 5.25443 17.9266C5.25443 16.3155 6.56332 15.0066 8.17443 15.0066Z" fill="#454545"/>
      <path d="M4.52443 11.3568H11.8244C12.2294 11.3568 12.5544 11.0289 12.5544 10.6268V6.97683C12.5544 6.57476 12.2294 6.24683 11.8244 6.24683H4.52443C4.11951 6.24683 3.79443 6.57476 3.79443 6.97683V10.6268C3.79443 11.0289 4.11951 11.3568 4.52443 11.3568ZM5.25443 7.70683H11.0944V9.89682H5.25443V7.70683Z" fill="#454545"/>
      <path d="M4.52443 29.6068H11.8244C12.2294 29.6068 12.5544 29.2789 12.5544 28.8768V25.2268C12.5544 24.8248 12.2294 24.4968 11.8244 24.4968H4.52443C4.11951 24.4968 3.79443 24.8248 3.79443 25.2268V28.8768C3.79443 29.2789 4.11951 29.6068 4.52443 29.6068ZM5.25443 25.9568H11.0944V28.1468H5.25443V25.9568Z" fill="#454545"/>
      <path d="M15.4746 31.4316H51.9746C52.3796 31.4316 52.7046 31.1037 52.7046 30.7016V5.15163C52.7046 4.74956 52.3796 4.42163 51.9746 4.42163H15.4746C15.0697 4.42163 14.7446 4.74956 14.7446 5.15163V30.7016C14.7446 31.1037 15.0697 31.4316 15.4746 31.4316ZM16.2046 5.88163H51.2446V29.9716H16.2046V5.88163Z" fill="#454545"/>
      <path d="M42.6268 6.44092C42.3417 6.15576 41.8798 6.15576 41.5945 6.44092L39.0168 9.02161L24.8219 23.2194C24.7649 23.2736 24.7193 23.3391 24.685 23.4076L22.1043 28.5689C21.9646 28.8484 22.0188 29.1905 22.2412 29.4129C22.381 29.5527 22.5692 29.6268 22.7574 29.6268C22.8686 29.6268 22.9798 29.6011 23.0824 29.5498L28.2438 26.9691C28.3122 26.9349 28.3778 26.8893 28.432 26.8322L45.2073 10.0568C45.3442 9.91996 45.4212 9.7346 45.4212 9.5407C45.4212 9.3468 45.3442 9.16144 45.2073 9.02457L42.6268 6.44092ZM27.4852 25.7144L24.3884 27.2628L25.9368 24.166L39.533 10.5697L41.0814 12.1181L27.4852 25.7144ZM42.1136 11.0888L40.5652 9.54042L42.1136 7.99202L43.662 9.54042L42.1136 11.0888Z" fill="#454545"/>
      </svg>

    case FeaturedContentType.Link: 
      return <svg width="62" height="38" viewBox="0 0 62 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M59.9868 0.323486H1.29455C0.703989 0.323486 0.227079 0.802256 0.227079 1.39095L0.228942 36.4624C0.228942 37.0511 0.705852 37.5299 1.29641 37.5299H59.9872C60.5759 37.5299 61.0546 37.0511 61.0546 36.4624L61.0528 1.39095C61.0528 0.802256 60.5755 0.323486 59.9868 0.323486ZM58.9174 2.45842V9.61779H2.36178V2.45842H58.9174ZM2.36178 35.3948V11.7524H58.9174V35.3948H2.36178Z" fill="#454545"/>
      <path d="M54.0069 7.68592H55.1694C55.7581 7.68592 56.2369 7.20715 56.2369 6.61846V5.45785C56.2369 4.86915 55.7581 4.39038 55.1694 4.39038H54.0069C53.4182 4.39038 52.9395 4.86915 52.9395 5.45785V6.61846C52.9395 7.20901 53.4164 7.68592 54.0069 7.68592V7.68592Z" fill="#454545"/>
      <path d="M48.4383 7.68592H49.6008C50.1895 7.68592 50.6683 7.20715 50.6683 6.61846V5.45785C50.6683 4.86915 50.1895 4.39038 49.6008 4.39038H48.4383C47.8496 4.39038 47.3708 4.86915 47.3708 5.45785V6.61846C47.3708 7.20901 47.8496 7.68592 48.4383 7.68592V7.68592Z" fill="#454545"/>
      <path d="M42.8702 7.68592H44.0327C44.6214 7.68592 45.1001 7.20715 45.1001 6.61846V5.45785C45.1001 4.86915 44.6214 4.39038 44.0327 4.39038H42.8702C42.2815 4.39038 41.8027 4.86915 41.8027 5.45785V6.61846C41.8027 7.20901 42.2796 7.68592 42.8702 7.68592V7.68592Z" fill="#454545"/>
      </svg>            

    default:
      return;
  }
}

interface FeaturedContentOptionProps {
  option: FeaturedContentType
  onClick?: () => void
}

const FeaturedContentOption: FC<FeaturedContentOptionProps> = ({ option, onClick }) => {
  return <button type="button" onClick={onClick} className="flex flex-col justify-center items-center h-20 pt-3 pb-1.5 rounded-md shadow-sm border border-gray-300 cursor-pointer">
    { getIconForOption(option) }
    <p className="block text-sm font-medium text-gray-700 mt-1">{option}</p>
  </button>;
}

export interface NewPostModalProps {
  state: ModalState
  onDismiss: () => void
}

interface NewPostFormFields {
  type: IPostType
  text: Content
  hero?: IHeroImage
}

export const NewPostModal: FC<NewPostModalProps> = ({ state, onDismiss }) => {

  const { register, handleSubmit, setValue, errors } = useForm<NewPostFormFields>();
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent>();

  const submit = async (data: NewPostFormFields) => {
    const post: Partial<IPost> = {
      organisationId: '7ebb6bb1-3f4e-4b7c-89ad-0f2050a00067',
      origin: IPostOrigin.GoodHub,
      projectId: 'default',
      text: data.text,
      hero: data.hero,
      type: data.type,
      postedIdentity: IPostIdentity.Individual
    }
    await submitNewPost(post);
  }

  return <Modal className="max-w-5xl w-full" state={state} onDismiss={onDismiss}>
    <form className="flex max-h-screen" onSubmit={handleSubmit(submit)}>
      <div className="flex-grow">
        <label className="block text-sm font-medium text-gray-700">Featured content</label>
        { !featuredContent ? <div className="grid gap-4 grid-cols-5 mt-2">
          <FeaturedContentOption option={FeaturedContentType.Picture} onClick={() => setFeaturedContent({ type: FeaturedContentType.Picture })}></FeaturedContentOption>
          <FeaturedContentOption option={FeaturedContentType.Video}></FeaturedContentOption>
          <FeaturedContentOption option={FeaturedContentType.Graphic}></FeaturedContentOption>
          <FeaturedContentOption option={FeaturedContentType.Link}></FeaturedContentOption>
        </div> : null }
        { featuredContent ? <div>
            <ImageField name="hero" register={register} setValue={setValue}></ImageField>
          </div> : null
        }
        <ContentField name="text" register={register} setValue={setValue}></ContentField>
      </div>
      <div className="ml-4 pl-4 w-72 border-l border-gray-300 justify-between flex flex-col">
        <TextField name="type" validationMessage="Post type is required." validationFailed={errors.type} register={register} placeholder="What kind of post is this?"></TextField>
        <div className="mt-4 flex justify-between">
          <Button onClick={onDismiss} className="mr-4">Discard</Button>
          <Button mode={'primary'} type="submit">Submit</Button>
        </div>
      </div>
    </form>
  </Modal>
}