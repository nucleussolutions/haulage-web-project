package haulage.project


import grails.rest.*
import grails.converters.*
import org.springframework.http.HttpStatus

class LocationController extends RestfulController {

  def locationService

  static responseFormats = ['json', 'xml']

  LocationController() {
    super(Location)
  }

  def count() {
    respond count: locationService.count()
  }
}
