import { PrismaClient } from '@prisma/client';

type PrismaFindUniqueOrThrow = (args?: { where: any }) => any;
type FindUniqueOrThrowArgs<Fn extends PrismaFindUniqueOrThrow> = Pick<
  NonNullable<Parameters<Fn>[0]>,
  'where'
>;

type FindUniqueOrThrow<Fn extends PrismaFindUniqueOrThrow, Entity> = (
  args: FindUniqueOrThrowArgs<Fn>,
) => Promise<Entity>;

type PrismaFind = (args?: { select?: any; include?: any }) => any;
type FindArgs<Fn extends PrismaFind> = Omit<
  NonNullable<Parameters<Fn>[0]>,
  'select' | 'include'
>;

type FindFirstOrThrowArgs<Fn extends PrismaFind> = FindArgs<Fn>;
type FindFirstOrThrow<Fn extends PrismaFind, Entity> = (
  args: FindFirstOrThrowArgs<Fn>,
) => Promise<Entity>;

type FindManyArgs<Fn extends PrismaFind> = FindArgs<Fn>;
type FindMany<Fn extends PrismaFind, Entity> = (
  args: FindManyArgs<Fn>,
) => Promise<Entity[]>;

type PrismaClientMethod =
  | '$on'
  | '$connect'
  | '$disconnect'
  | '$use'
  | '$executeRaw'
  | '$executeRawUnsafe'
  | '$queryRaw'
  | '$queryRawUnsafe'
  | '$transaction';

export type PrismaModel = keyof Omit<PrismaClient, PrismaClientMethod>;

export interface IReadProposalRepository<Model extends PrismaModel, Entity> {
  save: (entity: Entity) => Promise<Entity>;

  findUniqueOrThrow: FindUniqueOrThrow<
    PrismaClient[Model]['findUniqueOrThrow'],
    Entity
  >;

  findFirstOrThrow: FindFirstOrThrow<
    PrismaClient[Model]['findFirstOrThrow'],
    Entity
  >;

  findMany: FindMany<PrismaClient[Model]['findMany'], Entity>;
}
