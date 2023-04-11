import { BaseEntity } from '../../../04-infrasctructure/state/postgressql/repository/Base.entity';

export interface IReadState<T extends BaseEntity> {
  exists<Includes = Partial<T>>(data: Includes): Promise<boolean | T>;
  findAll(): Promise<any>;
  findById(id: number): Promise<void | T>;
}
