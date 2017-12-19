package haulage.project


import grails.rest.*
import grails.converters.*
import org.elasticsearch.bootstrap.Elasticsearch
import org.springframework.http.HttpStatus

class SearchController {

  static responseFormats = ['json', 'xml']

  def searchService

  def transportRequest(){
    if(params.terms){
      respond searchService.searchTransportRequest(params.terms)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def consignment(){
    if(params.terms){
      respond searchService.searchConsignment(params.terms)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def quote(){
    if(params.terms){
      respond searchService.searchQuote(params.terms)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def memberSubscription(){
    if(params.terms){
      respond searchService.searchMemberSubscription(params.terms)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def permission(){
    if(params.terms){
      respond searchService.searchPermission(params.terms)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def tariff(){
    if(params.terms){
      respond searchService.searchTariff(params.terms)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def vehicle(){
    if(params.terms){
      respond searchService.searchVehicle(params.terms)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def driverInfo(){
    if(params.terms){
      respond searchService.searchDriverInfo(params.terms)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def forwarderInfo(){
    if(params.terms){
      respond searchService.searchForwarderInfo(params.terms)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def haulierInfo(){
    if(params.terms){
      respond searchService.searchHaulierInfo(params.terms)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def location(){
    if(params.terms){
      respond searchService.searchLocation(params.terms)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }
}

