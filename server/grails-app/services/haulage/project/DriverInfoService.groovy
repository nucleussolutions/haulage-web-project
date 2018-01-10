package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(DriverInfo)
interface DriverInfoService {

  DriverInfo get(Serializable id)

  List<DriverInfo> list(Map args)

  @Cacheable('driverInfoCount')
  Long count()

  void delete(Serializable id)

  List<DriverInfo> findAllByHaulierId(String haulierId, Map args)

  DriverInfo save(DriverInfo driverInfo)

}