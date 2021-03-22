import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Publication} from '../models';
import {PublicationRepository} from '../repositories';


@authenticate('jwt')
export class ApplicationController {
  constructor(

    @repository(PublicationRepository)
    public publicationRepository : PublicationRepository,
  ) {}

  @post('/publications')
  @response(200, {
    description: 'Publication model instance',
    content: {'application/json': {schema: getModelSchemaRef(Publication)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {
            title: 'NewPublication',
            exclude: ['_id'],
          }),
        },
      },
    })
    publication: Omit<Publication, 'id'>,
  ): Promise<Publication> {
    return this.publicationRepository.create(publication);
  }

  @get('/publications/count')
  @response(200, {
    description: 'Publication model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Publication) where?: Where<Publication>,      
  ): Promise<Count> {
    return this.publicationRepository.count(where);
  }

  @get('/publications')
  @response(200, {
    description: 'Array of Publication model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Publication, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Publication) filter?: Filter<Publication>,
  ): Promise<Publication[]> {
    return this.publicationRepository.find(filter);
  }

  @patch('/publications')
  @response(200, {
    description: 'Publication PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {partial: true}),
        },
      },
    })
    publication: Publication,
    @param.where(Publication) where?: Where<Publication>,
  ): Promise<Count> {
    return this.publicationRepository.updateAll(publication, where);
  }

  @get('/publications/{id}')
  @response(200, {
    description: 'Publication model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Publication, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Publication, {exclude: 'where'}) filter?: FilterExcludingWhere<Publication>
  ): Promise<Publication> {
    return this.publicationRepository.findById(id, filter);
  }

  @patch('/publications/{id}')
  @response(204, {
    description: 'Publication PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {partial: true}),
        },
      },
    })
    publication: Publication,
  ): Promise<void> {
    await this.publicationRepository.updateById(id, publication);
  }

  @put('/publications/{id}')
  @response(204, {
    description: 'Publication PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() publication: Publication,
  ): Promise<void> {
    await this.publicationRepository.replaceById(id, publication);
  }


  @del('/publications/{id}')
  @response(204, {
    description: 'Publication DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.publicationRepository.deleteById(id);
  }
}
