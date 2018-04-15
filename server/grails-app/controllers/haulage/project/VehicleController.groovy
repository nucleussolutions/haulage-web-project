package haulage.project


import grails.rest.*
import grails.converters.*

class VehicleController extends RestfulController {

  VehicleService vehicleService

  static responseFormats = ['json', 'xml']

  VehicleController() {
    super(Vehicle)
  }

  @Override
  Object index(Integer max) {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      authority == 'Super Admin'
    }.first()
    if (permission) {
      return super.index(max)
    } else {

      def userInfo = UserInfo.findByUserId(userId)

      if(userInfo){
        def company = Company.find(userInfo.company)
        return company.vehicles
      }
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
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      authority == 'Super Admin'
    }.first()
    if (permission) {
      respond count: vehicleService.count()
    } else {
      // count by haulier company
      def userInfo = UserInfo.findByUserId(userId)
      def company = Company.find(userInfo.company)
      respond company.vehicles?.size()
    }
  }
}
