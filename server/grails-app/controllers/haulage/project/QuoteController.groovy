package haulage.project


import grails.rest.*
import grails.converters.*

class QuoteController extends RestfulController {

  QuoteService quoteService

  def userInfoService

  static responseFormats = ['json', 'xml']

  QuoteController() {
    super(Quote)
  }

  @Override
  Object index(Integer max) {
    def userId = request.getHeader('userId')
    UserInfo userInfo = userInfoService.findByUserId(userId)
    def permission = userInfo.permissions.stream().filter({ permission ->
      permission.authority == 'Super Admin'
    })
    if (permission) {
      return super.index(max)
    } else {
      //return quote by haulier or quote by forwarder
      //this is annoying
      def quotes = quoteService.findAllByHaulierIdOrForwarderId(userId, userId)
      quotes
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
    UserInfo userInfo = userInfoService.findByUserId(userId)
    def permission = userInfo.permissions.stream().filter({ permission ->
      permission.authority == 'Super Admin'
    })
    if(permission){
      respond count: quoteService.count()
    }else{
      respond count: quoteService.countByHaulierIdOrForwarderId(userId, userId)
    }
  }
}
