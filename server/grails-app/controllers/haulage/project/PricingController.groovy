package haulage.project


import grails.rest.*
import grails.converters.*

class PricingController extends RestfulController {

  def pricingService

  static responseFormats = ['json', 'xml']

  PricingController() {
    super(Pricing)
  }

  @Override
  Object index(Integer max) {
    return super.index(max)
  }

  //customize the output in json views to get the desired output
  def listAll(Integer max){
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
    respond count: pricingService.count()
  }
}
