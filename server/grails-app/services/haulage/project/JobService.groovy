package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(Job)
interface JobService {

  Job get(Serializable id)

  List<Job> list(Map args)

  @Cacheable('jobCount')
  Long count()

  @Cacheable('jobCountByHaulierId')
  Long countByHaulierId(String haulierId)

  void delete(Serializable id)

  Job save(Job job)

  Job findAllByDriverId(String driverId)

  Job findAllByHaulierId(String haulierId)
}