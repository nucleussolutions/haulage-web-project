package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(Location)
interface LocationService {

  Location get(Serializable id)

  List<Location> list(Map args)

  @Cacheable('locationCount')
  Long count()

  void delete(Serializable id)

  Location save(Location location)

  Location findByType(String type)

}