import { PrismaClient } from '@prisma/client';
import { BaseEntity } from './Base.entity';
import { IWriteState } from '03-core/ports/state/IWrite.state';

class WriteRepository<T extends BaseEntity> implements IWriteState<T> {
  protected readonly ORM: PrismaClient;
  private readonly table: keyof T;

  constructor(readonly database: PrismaClient) {
    this.ORM = database;
  }

  create<Includes = T>(data: Includes): Promise<void | T | any> {
    return this.ORM[this.table.toString()].create({ ...data });
  }

  delete(id: number): Promise<boolean | void | T> {
    return this.ORM[this.table.toString()].delete({
      where: { id },
    });
  }

  update<Includes = Partial<T>>(data: Includes): Promise<void | T | any> {
    return this.ORM[this.table.toString()].update({
      data,
    });
  }
}
