package haulage.project


import grails.rest.*
import grails.converters.*
import org.elasticsearch.bootstrap.Elasticsearch
import org.springframework.http.HttpStatus

class SearchController {

  static responseFormats = ['json', 'xml']

  def transportRequestService

  def quoteService

  def haulierInfoService

  def driverInfoService

  def forwarderInfoService

  def transportRequest(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def consignment(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def quote(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def memberSubscription(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def permission(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def pricing(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def tariff(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def vehicle(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def driverInfo(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def forwarderInfo(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def haulierInfo(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def location(){
    if(params.terms){

    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }
}

