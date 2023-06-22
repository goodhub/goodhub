import { z } from "zod";
import {
  Attributes,
  InferAttributes,
  Model,
  ModelStatic,
  ModelAttributes,
  Sequelize,
} from "sequelize";
import { AnyRouter } from "@trpc/server";
import db from "../../services/database-client";

type TableOptions<M extends Model> = ModelStatic<M> & {
  attributes: ModelAttributes<M, Attributes<M>>;
  modelName: string;
};

type Cache = Map<string, any>;
type RouterConstructor<E, R> = (env: E, cache: Cache) => R;

interface ApplicationSetupOptions<M extends Model, E, R extends AnyRouter> {
  environment?: z.Schema<E>;
  tables?: TableOptions<M>[];
  seed?: () => Promise<void>;
  router: RouterConstructor<E, R>;
}

const sequelize = await db();

export class App<
  M extends Model,
  E extends object,
  R extends AnyRouter,
  S extends string
> {
  public id: S;
  public env: E;
  public cache: Map<string, any>;
  public tables: TableOptions<M>[];
  public router: R;

  constructor(
    id: S,
    cache: Cache,
    tables: TableOptions<M>[] = [],
    router: RouterConstructor<E, R>,
    env: E = {} as E
  ) {
    this.id = id;
    this.env = env;
    this.cache = cache;
    this.tables = tables;
    this.router = router(env, cache);
  }

  public static async setup<
    M extends Model,
    E extends object,
    R extends AnyRouter,
    S extends string
  >(id: S, options: ApplicationSetupOptions<M, E, R>) {
    const { environment, tables, seed, router } = options;
    const env = environment?.parse(process.env);

    if (tables) {
      for (const model of tables) {
        model.init(model.attributes, { sequelize, modelName: model.modelName });
        await model.sync({ force: true });
      }
    }

    if (seed) await seed();
    const cache = new Map<string, any>();
    return new App(id, cache, tables, router, env);
  }
}

export const Omit = <
  K extends Model,
  KK extends InferAttributes<K>,
  KKK extends keyof KK
>(
  model: ModelStatic<K>,
  keys: KKK[]
) => {
  const attributes = Object.keys(model.getAttributes()) as KKK[];
  return attributes.filter((key) => !keys.includes(key));
};
