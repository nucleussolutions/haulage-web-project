package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(Vehicle)
interface VehicleService {

  Vehicle get(Serializable id)

  List<Vehicle> list(Map args)

  @Cacheable('vehicleCount')
  Long count()

  void delete(Serializable id)

  Vehicle save(Vehicle vehicle)

  List<Vehicle> findAllByUserId(String haulierId)
}