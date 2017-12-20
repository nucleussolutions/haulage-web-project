package haulage.project


import grails.rest.*
import grails.converters.*
import org.elasticsearch.bootstrap.Elasticsearch
import org.springframework.http.HttpStatus

class SearchController {

  static responseFormats = ['json', 'xml']

  def searchService

  def transportRequest() {
    if (params.term) {
      respond searchService.searchTransportRequest(params.term)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def consignment() {
    if (params.term) {
      respond searchService.searchConsignment(params.term)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def quote() {
    if (params.term) {
      respond searchService.searchQuote(params.term)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def memberSubscription() {
    if (params.term) {
      respond searchService.searchMemberSubscription(params.term)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def permission() {
    if (params.term) {
      respond searchService.searchPermission(params.term)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def tariff() {
    if (params.term) {
      respond searchService.searchTariff(params.term)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def vehicle() {
    if (params.term) {
      respond searchService.searchVehicle(params.term)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def driverInfo() {
    if (params.term) {
      respond searchService.searchDriverInfo(params.term)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def forwarderInfo() {
    if (params.term) {
      respond searchService.searchForwarderInfo(params.term)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def haulierInfo() {
    if (params.term) {
      respond searchService.searchHaulierInfo(params.term)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def location() {
    if (params.term) {
      respond searchService.searchLocation(params.term)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }
}

