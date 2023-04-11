import { BaseEntity } from '../../../04-infrasctructure/state/postgressql/repository/Base.entity';

export interface IWriteState<T extends BaseEntity> {
  create<Includes = T>(data: Includes): Promise<void | T | any>;
  delete(id: number): Promise<boolean | void | T>;
  update<Includes = Partial<T>>(data: Includes): Promise<void | T | any>;
}
