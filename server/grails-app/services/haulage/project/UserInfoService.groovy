package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(UserInfo)
interface UserInfoService {

  UserInfo get(Serializable id)

  List<UserInfo> list(Map args)

  @Cacheable('userInfoCount')
  Long count()

  void delete(Serializable id)

  UserInfo save(UserInfo userInfo)

}