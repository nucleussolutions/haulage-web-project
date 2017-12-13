package haulage.project


import grails.rest.*
import grails.converters.*

class MemberSubscriptionController extends RestfulController {

  def memberSubscriptionService

  static responseFormats = ['json', 'xml']

  MemberSubscriptionController() {
    super(MemberSubscription)
  }

  def count() {
    respond memberSubscriptionService.count()
  }
}
