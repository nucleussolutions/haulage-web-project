package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(HaulierInfo)
interface HaulierInfoService {

  HaulierInfo get(Serializable id)

  List<HaulierInfo> list(Map args)

  @Cacheable('haulierInfoCount')
  Long count()

  void delete(Serializable id)

  HaulierInfo findByUserId(String userId)

  HaulierInfo save(HaulierInfo haulierInfo)

}