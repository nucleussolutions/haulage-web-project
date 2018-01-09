package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(Permission)
interface PermissionService {

  Permission get(Serializable id)

  List<Permission> list(Map args)

  @Cacheable('permissionCount')
  Long count()

  void delete(Serializable id)

  Permission save(Permission permission)

  Permission findByUserId(String userId)

  List<Permission> findAllByGrantedBy(String userId, Map paginateParams)

  @Cacheable('permissionCountByGrantedBy')
  Long countByGrantedBy(String userId)
}