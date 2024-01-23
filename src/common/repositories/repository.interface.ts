import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { PaginatedDataDto } from 'src/common/dtos/paginated-data.dto';

export interface IRepository<T, C, U> {
  findAllPaginated(data: PaginateDto): Promise<PaginatedDataDto<T>>;
  findAll(): Promise<T[]>;
  create(data: C): Promise<T>;
  findById(id: string): Promise<T>;
  findByEmail(email: string): Promise<T>;
  update(id: string, data: U): Promise<T>;
  delete(id: string): Promise<void>;
}
