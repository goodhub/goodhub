import { FC } from 'react'
import { Backstage, useVariable } from '@softwareimaging/backstage'
import LocalProvider from '@softwareimaging/backstage-local'
import HTTPProvider from '@softwareimaging/backstage-http'

import config from './backstage.local'
import { Variables } from './backstage-config'


declare global {
  interface Window { 
    baseURL: string
    uiURL: string
    uploadURL: string
    convertURL: string
    resolveLinkURL: string
  }
}

const OldSchoolAdapter: FC = ({ children }) => {
  const baseUrl = useVariable<Variables>('connections:core:base_url')
  const uiUrl = useVariable<Variables>('connections:core:base_url')
  const uploadUrl = useVariable<Variables>('microservices:upload_image:url')
  const convertUrl = useVariable<Variables>('microservices:graphic_to_image:url')
  const resolveLinkUrl = useVariable<Variables>('microservices:resolve_link:url')
  if (!baseUrl || !uiUrl) throw new Error('Missing connections')
  window.baseURL = baseUrl
  window.uploadURL = uploadUrl!
  window.convertURL = convertUrl!
  window.resolveLinkURL = resolveLinkUrl!

  return <>
    {children}
  </>
}

export const BackstageProvider: FC = ({ children }) => {
  // const connectionString = import.meta.env.VITE_AZURE_CONFIG_CONNECTION_STRING
  // if (!connectionString) throw new Error('VITE_AZURE_CONFIG_CONNECTION_STRING is not set')

  const providers = [
    LocalProvider(2, { config }),
    HTTPProvider(1, {
      url: 'https://goodhubdevconfig381cddc6.blob.core.windows.net/backstage/config.json'
    })
  ]

  return <Backstage providers={providers}>
    <OldSchoolAdapter>
      {children}
    </OldSchoolAdapter>
  </Backstage>
}