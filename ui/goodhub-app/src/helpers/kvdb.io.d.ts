declare module 'kvdb.io' {
  type RequestOptions = {
    type?: string
  }
  type ListOptions = {
    skip?: string
    limit?: number
    prefix?: string
    reverse?: boolean
    values?: boolean
  }
  type Bucket = {
    set: (key: string, value: string, opts?: RequestOptions) => Promise<string>
    get: (key: string) => Promise<string>
    list: (opts?: ListOptions) => Promise<Array<[string, string]>>
  }
  type BucketConstructor = (bucketId: string, accessToken?: string) => Bucket
  const bucket: BucketConstructor
}