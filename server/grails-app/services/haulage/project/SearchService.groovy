package haulage.project

import grails.gorm.transactions.Transactional
import grails.plugins.elasticsearch.ElasticSearchService

@Transactional
class SearchService {

  def ElasticSearchService

  def searchLocation(String term){
    Location.search("$term").searchResults()
  }

  def searchTariff(String term){
    Tariff.search("$term").searchResults()
  }

  def searchTransportRequest(String term){
    TransportRequest.search("$term").searchResults()
  }

  def searchDriverInfo(String term){
    DriverInfo.search("$term").searchResults()
  }

  def searchHaulierInfo(String term){
    HaulierInfo.search("$term").searchResults()
  }

  def searchForwarderInfo(String term){
    ForwarderInfo.search("$term").searchResults()
  }

  def searchConsignment(String term){
    Consignment.search("$term").searchResults()
  }

  def searchMemberSubscription(String term){
    MemberSubscription.search("$term").searchResults()
  }

  def searchTransaction(String term){
    Transaction.search("$term").searchResults()
  }

  def searchVehicle(String term){
    Vehicle.search("$term").searchResults()
  }

  def searchQuote(String term){
    Quote.search("$term").searchResults()
  }

}
