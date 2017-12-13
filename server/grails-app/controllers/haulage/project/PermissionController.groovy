package haulage.project


import grails.rest.*
import grails.converters.*

class PermissionController extends RestfulController {

  def permissionService

  static responseFormats = ['json', 'xml']

  PermissionController() {
    super(Permission)
  }

  def count(){
    respond count: permissionService.count()
  }
}
