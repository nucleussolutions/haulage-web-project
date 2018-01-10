package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(ForwarderInfo)
interface ForwarderInfoService {

  ForwarderInfo get(Serializable id)

  List<ForwarderInfo> list(Map args)

  @Cacheable('forwarderInfoCount')
  Long count()

  void delete(Serializable id)

  ForwarderInfo findByUserId(String userId)

  ForwarderInfo save(ForwarderInfo forwarderInfo)

}