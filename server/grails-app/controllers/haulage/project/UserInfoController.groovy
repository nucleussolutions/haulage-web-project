package haulage.project

import grails.plugin.awssdk.s3.AmazonS3Service
import grails.rest.*
import grails.converters.*

class UserInfoController extends RestfulController {

  UserInfoService userInfoService
  AmazonS3Service s3Service
  HaulageBucketService haulageBucketService

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

  def count() {
    respond count: userInfoService.count()
  }

  def getByUserId() {
    def userId = request.getHeader('userId')
    def userInfo = userInfoService.findByUserId(userId)
    respond userInfo
  }

  def getHauliers() {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }
    def userInfos
    if (permission) {
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Admin')
        }
      }

    } else {
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('grantedBy', userId)
          'in'('authority', 'Admin')
        }
      }
    }
    println 'userInfos ' + userInfos
    respond userInfos
  }

  def countHauliers() {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }
    def userInfos
    if (permission) {
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Admin')
        }
      }

      println userInfos
    } else {
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('grantedBy', userId)
          'in'('authority', 'Admin')
        }
      }
      println userInfos
    }
    respond count: userInfos.size()
  }

  def countForwarders() {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }
    def userInfos
    if (permission) {
      // display all forwarders
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Manager')
        }
      }
    } else {
      //list forwarders granted by the hauliers themselves
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Manager')
          'in'('grantedBy', userId)
        }
      }
    }
    respond count: userInfos.size()
  }

  def getForwarders() {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }
    def userInfos
    if (permission) {
      // display all forwarders
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Manager')
        }
      }
    } else {
      //list forwarders granted by the hauliers themselves
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Manager')
          'in'('grantedBy', userId)
        }
      }
    }
    respond userInfos
  }
}
