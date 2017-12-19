package haulage.project

import grails.gorm.transactions.Transactional
import grails.plugins.elasticsearch.ElasticSearchService

@Transactional
class SearchService {

  def ElasticSearchService

  def searchLocation(){
//    Location.search()
  }

  def searchTariff(String term){

  }

  def searchTransportRequest(String term){

  }

  def searchDriverInfo(String term){

  }

  def searchHaulierInfo(String term){

  }

  def searchForwarderInfo(String term){

  }

  def searchConsignment(String term){

  }

  def searchMemberSubscription(String term){

  }

  def searchTransaction(String term){

  }

  def searchVehicle(){

  }

  def searchQuote(String term){

  }

  def searchPricing(String term){

  }
}
