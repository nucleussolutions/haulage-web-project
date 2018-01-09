package haulage.project

import grails.gorm.transactions.Transactional
import grails.plugins.elasticsearch.ElasticSearchService
import org.elasticsearch.index.query.QueryBuilder
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.search.sort.SortBuilders
import org.elasticsearch.search.sort.SortOrder

@Transactional
class SearchService {

  def elasticSearchService

  def searchLocation(String term){
    elasticSearchService.search(term, [ indices: Location, types: Location, from: 0, size: 10 ])
  }

  def searchTariff(String term){
    elasticSearchService.search(term, [ indices: Tariff, types: Tariff, from: 0, size: 10 ])
  }

  def searchTransportRequest(String term){
    elasticSearchService.search(term, [ indices: TransportRequest, types: TransportRequest, from: 0, size: 10 ])
  }

  def searchTransportRequestByForwarder(String term, String forwarderId){
    elasticSearchService.search(indices: TransportRequest, types: TransportRequest, from: 0, size: 10){
      queryString(term)
      match("forwarderId": forwarderId)
    }
  }

  def searchTransportRequestByHaulier(String term, String haulierId){
    elasticSearchService.search(indices: TransportRequest, types: TransportRequest, from: 0, size: 10){
      queryString(term)
      match("haulierId": haulierId)
    }
  }

  def searchDriverInfo(String term){
    elasticSearchService.search(term, [ indices: DriverInfo, types: DriverInfo, from: 0, size: 10 ])
  }

  def searchDriverInfoByHaulier(String term, String haulierId){
    elasticSearchService.search(indices: DriverInfo, types: DriverInfo, from: 0, size: 10){
      queryString(term)
      match("haulierId": haulierId)
    }
  }

  def searchHaulierInfo(String term){
    elasticSearchService.search(term, [ indices: HaulierInfo, types: HaulierInfo, from: 0, size: 10 ])
  }

  def searchForwarderInfo(String term){
    elasticSearchService.search(term, [ indices: ForwarderInfo, types: ForwarderInfo, from: 0, size: 10 ])
  }

  def searchConsignment(String term){
    elasticSearchService.search(term, [ indices: Consignment, types: Consignment, from: 0, size: 10 ])
  }

  def searchConsignmentByHaulier(String term, String haulierId){

  }

  def searchConsignmentByForwarder(String term, String forwarderId){

  }

  def searchMemberSubscription(String term){
    elasticSearchService.search(term, [ indices: MemberSubscription, types: MemberSubscription, from: 0, size: 10 ])
  }

  def searchTransaction(String term){
    elasticSearchService.search(term, [ indices: Transaction, types: Transaction, from: 0, size: 10])
  }

  def searchVehicle(String term){
    elasticSearchService.search(term, [ indices: Vehicle, types: Vehicle, from: 0, size: 10 ])
  }

  def searchVehicleByHaulier(String term, String haulierId){
    elasticSearchService.search(indices: Vehicle, types: Vehicle, from: 0, size: 10){
      queryString(term)
      match("haulierId": haulierId)
    }
  }

  def searchQuote(String term){
    elasticSearchService.search(term, [ indices: Quote, types: Quote, from: 0, size: 10 ])
  }

  def searchQuoteByHaulier(String term, String haulierId){
    elasticSearchService.search(indices: Quote, types: Quote, from: 0, size: 10){
      queryString(term)
      match("haulierId": haulierId)
    }
  }

  def searchQuotesByForwarder(String term, String forwarderId){
    elasticSearchService.search(indices: Quote, types: Quote, from: 0, size: 10){
      queryString(term)
      match("forwarderId": forwarderId)
    }
  }

  def searchJob(String term){
    elasticSearchService.search(term, [ indices: Job, types: Job, from: 0, size: 10 ])
  }


  def searchJobByHaulier(String term, String haulierId){
    elasticSearchService.search([indices: Job, types: Job, from: 0, size: 10], null as Closure, {

    })
  }

}
