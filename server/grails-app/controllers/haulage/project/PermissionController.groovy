package haulage.project


import grails.rest.*
import grails.converters.*
import org.springframework.http.HttpStatus

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

class PermissionController extends RestfulController {

  def permissionService

  def userInfoService

  static responseFormats = ['json', 'xml']

  PermissionController() {
    super(Permission)
  }

  @Override
  Object index(Integer max) {
    def userId = request.getHeader('userId')
    UserInfo userInfo = userInfoService.findByUserId(userId)

    def permission = userInfo.permissions.stream().filter({ permission ->
      permission.authority == 'Super Admin'
    })

    if(permission){
      return super.index(max)
    }else{
      respond permissionService.findAllByGrantedBy(userId, [
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
    UserInfo userInfo = userInfoService.findByUserId(userId)
    println 'userId ' + userId
    if (!userId) {
      response.status = NOT_FOUND.value()
      respond status: NOT_FOUND, message: 'user id not found'
    } else {

      if (!userInfo.permissions) {
        response.status = NOT_FOUND.value()
        respond status: NOT_FOUND, message: 'user permissions not found'
      } else {
        respond userInfo.permissions, status: OK
      }
    }
  }

  def getByCompanyName(String companyName){
    if(companyName){

      def company = Company.findByName(companyName)

      if(company.permissions){
        respond company.permissions
      }else{
        response.status = NOT_FOUND.value()
        respond message: 'permission doesnt exist'
      }
    }else{
      response.status = NOT_FOUND.value()
      respond message: 'not found'
    }
  }
}
