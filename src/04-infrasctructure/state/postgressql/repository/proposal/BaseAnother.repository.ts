import { PrismaClient } from '@prisma/client';

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

export abstract class Repository<T extends PrismaModel> {
  protected readonly ORM: PrismaClient;
  private readonly table: keyof T;

  constructor(readonly database: PrismaClient) {
    this.ORM = database;
  }
}
