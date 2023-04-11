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

export type BaseEntity = keyof Omit<PrismaClient, PrismaClientMethod>;
