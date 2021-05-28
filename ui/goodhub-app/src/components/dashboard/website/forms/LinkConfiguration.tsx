import { IExternalLink } from '@strawberrylemonade/goodhub-lib';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';
import Button from '../../../generic/Button';
import { TextField } from '../../../generic/forms/TextField';

export interface LinkConfigurationProps {}

const LinkConfiguration: FC<LinkConfigurationProps> = () => {

  const { register, watch, errors } = useFormContext();
  const externalLinks = watch('externalLinks') as Partial<IExternalLink>[];

  const [links, setLinks] = useState<Partial<IExternalLink>[]>([]);

  useEffect(() => {
    if (!externalLinks || links.length > 0) return;
    setLinks(externalLinks);
  }, [externalLinks, links, setLinks])

  return <>
    { links.map((link, i) => (
      <div key={link.id} className="flex flex-col mb-4 pb-1 border-b border-gray-200">
        <div className="flex space-x-4 relative pt-2">
          <TextField
            name={`externalLinks[${i}].name`}
            placeholder="Name of link"
            register={register}
            title="Name"
            validationFailed={errors.externalLinks?.[i].name}
            validationMessage="You need to put a thing"
          />
          <TextField
            name={`externalLinks[${i}].url`}
            placeholder="https://example.com"
            register={register}
            title="Link"
            validationFailed={errors.externalLinks?.[i].url}
            validationMessage="You need to put a thing"
          />
        </div>
        <TextField
          name={`externalLinks[${i}].description`}
          placeholder="A brief description of link"
          register={register}
          title="Description"
          validationFailed={errors.externalLinks?.[i].description}
          validationMessage="You need to put a thing"
        />
      </div>
    )) }
    <div className="w-full flex flex-col items-center">
      <Button onClick={() => setLinks([...links, { id: v4() }])}>Add new link</Button>
    </div>
  </>;
}

export default LinkConfiguration;