import { PrismaClient } from '@prisma/client';
import { BaseEntity } from './Base.entity';
import { IReadState } from '../../../../03-core/ports/state/IRead.state';

class ReadRepository<T extends BaseEntity> implements IReadState<T> {
  protected readonly ORM: PrismaClient;
  private readonly table: keyof T;

  constructor(readonly database: PrismaClient) {
    this.ORM = database;
  }

  exists<Includes = Partial<T>>(data: Includes): Promise<boolean | T> {
    return this.ORM[this.table.toString()].findFirst({
      where: data,
    });
  }

  findAll(): Promise<any> {
    return this.ORM[this.table.toString()].findMany();
  }

  findById(id: number): Promise<void | T> {
    return this.ORM[this.table.toString()].findFirst({
      where: {
        id,
      },
    });
  }
}
