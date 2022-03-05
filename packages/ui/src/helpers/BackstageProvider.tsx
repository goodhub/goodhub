import { FC } from 'react'
import { Backstage, useVariable } from '@softwareimaging/backstage'
import LocalProvider from '@softwareimaging/backstage-local'
import AzureConfigProvider from '@softwareimaging/backstage-azure-config'

import config from './backstage.local'
import { User } from '../services/authentication-service'
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
  if (!baseUrl || !uiUrl || !uploadUrl || !convertUrl || !resolveLinkUrl) throw new Error('Missing connections')
  window.baseURL = baseUrl
  window.uploadURL = uploadUrl
  window.convertURL = convertUrl
  window.resolveLinkURL = resolveLinkUrl

  return <>
    {children}
  </>
}

export const BackstageProvider: FC = ({ children }) => {
  const connectionString = process.env.REACT_APP_AZURE_CONFIG_CONNECTION_STRING
  if (!connectionString) throw new Error('REACT_APP_AZURE_CONFIG_CONNECTION_STRING is not set')
  const savedUser = window.localStorage.getItem('goodhub:me');
  const user: User | undefined = (() => {
    try {
      if (!savedUser) return
      return JSON.parse(savedUser) as User
    } catch {
      return
    }
  })()

  const providers = [
    LocalProvider(1, { config }),
    AzureConfigProvider(0, {
      connectionString,
      label: process.env.REACT_APP_ENVIRONMENT,
      user: user?.email ?? user?.phoneNumber,
      groups: user?.organisations
    })
  ]

  return <Backstage providers={providers}>
    <OldSchoolAdapter>
      {children}
    </OldSchoolAdapter>
  </Backstage>
}