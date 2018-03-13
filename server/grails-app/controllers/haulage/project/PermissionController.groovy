package haulage.project


import grails.rest.*
import grails.converters.*
import org.springframework.http.HttpStatus

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
    println 'userId ' + userId
    if (!userId) {
      response.status = NOT_FOUND.value()
      respond status: NOT_FOUND, message: 'user id not found'
    } else {
      def permissions = Permission.where {
        userInfo.userId == userId
      }

      if (!permissions) {
        response.status = NOT_FOUND.value()
        respond status: NOT_FOUND, message: 'user permissions not found'
      } else {
        respond permissions, status: OK
      }
    }
  }

  def getByCompany(){
    Company company = request.JSON.company
    if(company){
      def permission = Permission.findByCompany(company)
      if(permission){
        respond permission
      }else{
        response.status = NOT_FOUND.value()
        respond message: 'permission doesnt exist'
      }
    }else{
      response.status = NOT_FOUND.value()
      respond message: 'company not found'
    }

  }

  def getByCompanyName(String companyName){
    if(companyName){
      def permission = Permission.where {
        company.name == companyName
      }
      if(permission){
        respond permission
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
