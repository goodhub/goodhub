import { Configuration } from "..";

export interface GraphicParams {
  backgroundColor: string
  backgroundStyle?: string
  backgroundPattern?: string
  primaryFont?: string
  secondaryFont?: string
  backgroundImage?: string
  logo?: string
}

export const useParams = (values: GraphicParams & { [key: string]: any }, config: Configuration<any>): {[key: string]: any} => {
  const errors = Object.keys(config).reduce<string[]>((failed, a) => {
    if (!config[a].optional && !values[a]) failed.push(a);
    return failed;
  }, []);
  
  if (errors.length > 0) throw new Error(`Missing required graphic parameters: ${errors.join(', ')}`);

  return Object.keys(config).reduce<{ [key: string]: (string | undefined) }>(((object, key) => {
    object[key] = (() => {
      if (values[key]) return values[key];
      if (config[key].default) return config[key].default;
    })();
    return object;     
  }), {});

}