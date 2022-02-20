import { Output } from '@pulumi/pulumi'
import { StorageAccount, SkuName, Kind } from '@pulumi/azure-native/storage';
import { Server, Database, FirewallRule } from '@pulumi/azure-native/dbforpostgresql'
import { ResourceGroup } from '@pulumi/azure-native/resources';

interface Arguments {
  id: string,
  simpleId: string,
  administratorLogin: string,
  administratorLoginPassword: Output<string>
}

export const setupStorage = (group: ResourceGroup, args: Arguments) => {

  const { id, simpleId, administratorLogin, administratorLoginPassword } = args

  const storageAccount = new StorageAccount(`${simpleId}blob`, {
    resourceGroupName: group.name,
    location: group.location,
    sku: {
      name: SkuName.Standard_LRS,
    },
    kind: Kind.StorageV2,
  });
  
  const dbServer = new Server(`${simpleId}db`, {
    serverName: `${simpleId}db`,
    location: group.location,
    resourceGroupName: group.name,
    properties: {
      version: '11',
      createMode: 'Default',
      administratorLogin,
      administratorLoginPassword,
      minimalTlsVersion: 'TLS1_2',
      sslEnforcement: 'Enabled',
      storageProfile: {
        backupRetentionDays: 28,
        geoRedundantBackup: 'Disabled',
        storageMB: 128000
      }
    },
    sku: {
      capacity: 2,
      family: 'Gen5',
      name: 'B_Gen5_2',
      tier: 'Basic',
    }
  })
  
  new FirewallRule(`${simpleId}db-azure-access`, {
    serverName: dbServer.name,
    resourceGroupName: group.name,
    startIpAddress: '0.0.0.0', // Azure's internal IPs
    endIpAddress: '0.0.0.0'
  })
  
  const coreDb = new Database(`${id}-db-core`, {
    resourceGroupName: group.name,
    serverName: dbServer.name,
    databaseName: `${id}-db-core`
  })
  
  return { coreDb, dbServer, storageAccount }
}