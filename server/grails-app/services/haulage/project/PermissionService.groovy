package haulage.project

import grails.gorm.services.Service

@Service(Permission)
interface PermissionService {

  Permission get(Serializable id)

  List<Permission> list(Map args)

  Long count()

  void delete(Serializable id)

  Permission save(Permission permission)

  Permission findByUserId(String userId)

  List<Permission> findAllByGrantedBy(String userId)
}