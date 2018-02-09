package haulage.project


import grails.rest.*
import grails.converters.*

class UserInfoController extends RestfulController {

  UserInfoService userInfoService

  static responseFormats = ['json', 'xml']

  UserInfoController() {
    super(UserInfo)
  }

  @Override
  Object index(Integer max) {
    return super.index(max)
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
    respond count: userInfoService.count()
  }

  def getHauliers(){
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }

    if(permission){
      def userInfos = UserInfo.createCriteria().list(max: limit, offset: offset) {
        permissions {
          eq('permission.authority', 'Admin')
        }
      }
      userInfos
    }else{
      def userInfos = UserInfo.createCriteria().list(max: limit, offset: offset) {
        permissions {
          eq('permission.authority', 'Admin')
          eq('permission.grantedBy', userId)
        }
      }
      userInfos
    }
  }

  def countHauliers(){
    respond count: getHauliers().count()
  }

  def countForwarders(){
    respond count: getForwarders().count()
  }

  def getForwarders(){
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }

    if(permission){
      // display all forwarders
      def userInfos = UserInfo.createCriteria().list(max: limit, offset: offset) {
        permissions {
          eq('permission.authority', 'Manager')
        }
      }
      userInfos
    }else{
      //list forwarders granted by the hauliers themselves
      def userInfos = UserInfo.createCriteria().list(max: limit, offset: offset) {
        permissions {
          eq('permission.authority', 'Manager')
          eq('permission.grantedBy', userId)
        }
      }
      userInfos
    }
  }
}
