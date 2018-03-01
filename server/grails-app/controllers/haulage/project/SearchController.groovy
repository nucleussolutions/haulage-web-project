package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import grails.converters.*
import groovy.transform.TypeCheckingMode
import org.elasticsearch.bootstrap.Elasticsearch
import org.springframework.http.HttpStatus

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class SearchController {

  static responseFormats = ['json', 'xml']

  def searchService

  def transportRequest() {
    if (params.term) {
      respond searchService.searchTransportRequest(params.term as String)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def transportRequestByHaulier(){
    if(params.term){
      respond searchService.searchTransportRequestByHaulier(params.term as String, request.getHeader('userId'))
    }else{
      respond HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def transportRequestByForwarder(){
    if(params.term){
      respond searchService.searchTransportRequestByForwarder(params.term as String, request.getHeader('userId') as String)
    }else{
      respond HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def consignment() {
    if (params.term) {
      respond searchService.searchConsignment(params.term as String)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def quote() {
    if (params.term) {
      respond searchService.searchQuote(params.term as String)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def quoteByForwarder(){
    if(params.term){
      respond searchService.searchQuotesByForwarder(params.term as String, request.getHeader('userId'))
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def quoteByHaulier(){
    if(params.term){
      respond searchService.searchQuoteByHaulier(params.term as String, request.getHeader('userId'))
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def memberSubscription() {
    if (params.term) {
      respond searchService.searchMemberSubscription(params.term as String)
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

  def permissionByHaulier(){
    if(params.term){
      respond searchService.searchPermissionByGrantedBy(params.term as String, request.getHeader('userId'))
    }else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def tariff() {
    if (params.term) {
      respond searchService.searchTariff(params.term as String)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def vehicle() {
    if (params.term) {
      respond searchService.searchVehicle(params.term as String)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def vehicleByHaulier(){
    if(params.term){
      respond searchService.searchVehicleByHaulier(params.term as String, request.getHeader('userId'))
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def driverInfo() {
    if (params.term) {
      respond searchService.searchDriverInfo(params.term as String)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def driverInfoByHaulier(){
    if(params.term){
      respond searchService.searchDriverInfoByHaulier(params.term as String, request.getHeader('userId'))
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def forwarderInfo() {
    if (params.term) {
      respond searchService.searchForwarderInfo(params.term as String)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def haulierInfo() {
    if (params.term) {
      respond searchService.searchHaulierInfo(params.term as String)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def location() {
    if (params.term) {
      respond searchService.searchLocation(params.term as String)
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  //search all job
  def job(){
    if(params.term){
      respond searchService.searchJob(params.term as String)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def jobByHaulier(){
    if(params.term){
      respond searchService.searchJobByHaulier(params.term as String, request.getHeader('userId'))
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }


  def transaction(){
    if(params.term){
      respond searchService.searchTransaction(params.term as String)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def company(){
    if(params.term){
      println 'term '+params.term
      respond searchService.searchCompany(params.term as String)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def haulier(){
    if(params.term){
      respond searchService.searchHaulier(params.term as String)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

  def forwarder(){
    if(params.term){
      respond searchService.searchForwarder(params.term as String)
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }
}

