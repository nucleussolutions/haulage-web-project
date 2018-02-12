package haulage.project


import grails.rest.*
import grails.converters.*

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

class PermissionController extends RestfulController {

  def permissionService

  static responseFormats = ['json', 'xml']

  PermissionController() {
    super(Permission)
  }

  @Override
  Object index(Integer max) {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }

    if(permission){
      return super.index(max)
    }else{
      respond permissionService.findAllByGrantedBy(userId: userId, [
        max: params.max,
        offset: params.offset
      ])
    }
  }

  @Override
  Object show() {
    return super.show()
  }

  @Override
  Object create() {
    return super.create()
  }

  @Override
  Object save() {
    return super.save()
  }

  @Override
  Object edit() {
    return super.edit()
  }

  @Override
  Object patch() {
    return super.patch()
  }

  @Override
  Object update() {
    return super.update()
  }

  @Override
  Object delete() {
    return super.delete()
  }

  def count(){
    respond count: permissionService.count()
  }

  def getByUserId() {
    def userId = request.getHeader('userId')
    println 'userId ' + userId
    if (!userId) {
      render([status: NOT_FOUND, message: 'user id not found'])
    } else {
      def permissions = Permission.where {
        userInfo.userId == userId
      }

      if (!permissions) {
        response.status = 400
        render([message: 'user permissions not found'])
      } else {
        respond permissions, status: OK
      }
    }
  }
}
