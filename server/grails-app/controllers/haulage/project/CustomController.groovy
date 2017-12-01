package haulage.project


import grails.rest.*
import grails.converters.*
import static org.springframework.http.HttpStatus.*


class CustomController {

  PermissionService permissionService

  static responseFormats = ['json', 'xml']

  def permissionByUserId(String userId) {
    println 'userId ' + userId
    if (!userId) {
      render([status: NOT_FOUND, message: 'user id not found'])
    } else {
      def permission = permissionService.findByUserId(userId)
      if (!permission) {
        response.status = 400
        render([message: 'user permission not found'])
      } else {
        respond permission, status: OK
      }
    }
  }

  def permissionByGrantedBy(String userId) {
    println 'userId ' + userId

    if (!userId) {
      render([status: NOT_FOUND, message: 'user id not found'])
    } else {
      List<Permission> permissions = Permission.findAllByGrantedBy(userId)

      if(!permissions){
        response.status = 400
        render([message: 'permissions granted by this user is not found'])
      }else{
        respond permissions, status: OK
      }
    }
  }
}
