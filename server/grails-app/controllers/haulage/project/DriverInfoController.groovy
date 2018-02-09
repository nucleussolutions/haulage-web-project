package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.gorm.transactions.Transactional
import grails.rest.*
import grails.converters.*
import groovy.transform.TypeCheckingMode

@Transactional(readOnly = false)
@GrailsCompileStatic(TypeCheckingMode.SKIP)
class DriverInfoController extends RestfulController {

  def driverInfoService

  static responseFormats = ['json', 'xml']

  DriverInfoController() {
    super(DriverInfo)
  }

  @Override
  Object index(Integer max) {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }
    if (permission) {
      return super.index(max)
    } else {
      def driverInfos = DriverInfo.where {
        haulierId == userId
      }
      return driverInfos
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

  def count() {
    respond count: driverInfoService.count()
  }
}
