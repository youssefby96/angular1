import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Publication, PublicationRelations} from '../models';

export class PublicationRepository extends DefaultCrudRepository<
  Publication,
  typeof Publication.prototype._id,
  PublicationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Publication, dataSource);
  }
}
