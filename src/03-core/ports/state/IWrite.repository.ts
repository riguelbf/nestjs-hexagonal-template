import { BaseEntity } from './Base.entity';

export interface IWriteRepository<T extends BaseEntity> {
  create<Includes = T>(data: Includes): Promise<void | T | any>;
  delete(id: number): Promise<boolean | void | T>;
  update<Includes = Partial<T>>(data: Includes): Promise<void | T | any>;
}
