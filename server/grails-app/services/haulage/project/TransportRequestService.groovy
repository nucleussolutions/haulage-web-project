package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(TransportRequest)
interface TransportRequestService {

  TransportRequest get(Serializable id)

  List<TransportRequest> list(Map args)

  @Cacheable('transportRequestCount')
  Long count()

  void delete(Serializable id)

  TransportRequest save(TransportRequest transportRequest)

}