import { BaseEntity } from './Base.entity';

export interface IReadRepository<T extends BaseEntity> {
  exists<Includes = Partial<T>>(data: Includes): Promise<boolean | T>;
  findAll(): Promise<any>;
  findById(id: number): Promise<void | T>;
}
