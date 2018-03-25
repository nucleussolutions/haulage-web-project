package haulage.project

import grails.gorm.transactions.Transactional
import grails.plugins.elasticsearch.ElasticSearchService
import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.index.query.QueryBuilder
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.search.sort.SortBuilders
import org.elasticsearch.search.sort.SortOrder


//@Transactional
class SearchService {

    ElasticSearchService elasticSearchService

    def searchLocation(String term) {
        elasticSearchService.search(term, [indices: Location, types: Location, from: 0, size: 10])
    }

    def searchTariff(String term) {
        elasticSearchService.search(term, [indices: Tariff, types: Tariff, from: 0, size: 10])
    }

    def searchTransportRequest(String term) {
        elasticSearchService.search(term, [indices: TransportRequest, types: TransportRequest, from: 0, size: 10])
    }

    def searchTransportRequestByForwarder(String term, String forwarderId) {
        elasticSearchService.search(indices: TransportRequest, types: TransportRequest, from: 0, size: 10) {
            queryString(term)
            match("forwarderId": forwarderId)
        }
    }

    def searchTransportRequestByHaulier(String term, String haulierId) {
        elasticSearchService.search(indices: TransportRequest, types: TransportRequest, from: 0, size: 10) {
            queryString(term)
            match("haulierId": haulierId)
        }
    }

    def searchDriverInfo(String term) {
        elasticSearchService.search(term, [indices: DriverInfo, types: DriverInfo, from: 0, size: 10])
    }

    def searchDriverInfoByHaulier(String term, String haulierId) {
        elasticSearchService.search(indices: DriverInfo, types: DriverInfo, from: 0, size: 10) {
            queryString(term)
            match("haulierId": haulierId)
        }
    }

    def searchConsignment(String term) {
        elasticSearchService.search(term, [indices: Consignment, types: Consignment, from: 0, size: 10])
    }


    def searchConsignmentByHaulier(String term, String haulierId) {

    }

    def searchConsignmentByForwarder(String term, String forwarderId) {

    }

    def searchHaulier(String term) {
        Closure filter = {
            permissions(
                    'authority': 'Admin'
            )
        }
        elasticSearchService.search(term, filter, [indices: UserInfo, types: UserInfo, from: 0, size: 10])
    }

    def searchForwarder(String term) {
        Closure filter = {
            permissions(
                    'authority': 'Manager'
            )
        }
        elasticSearchService.search(term, filter, [indices: UserInfo, types: UserInfo, from: 0, size: 10])
    }

    def searchCompany(String term) {
        def results = elasticSearchService.search(term, [indices: Company, types: Company, from: 0, size: 10])
        println results
        results
    }

    def searchCompanyByRegNo(String term) {
        println 'company search term ' + term
        def results = Company.search("registrationNo: ${term}")
        results
    }

    def searchCompanyByHaulier(String keyword) {
        println 'company search term ' + keyword
        //search permissions that have admin, then list the companies
        def filter = {
            nested {
                array {
                    element('permissions')
                    query {
                        bool {
                            must {
                                term("authority": 'Admin')
                            }
                        }
                    }
                }
            }
        }
        def results = elasticSearchService.search(keyword, filter,[indices: Company, types: Company, from: 0, size: 10])
//        def results = Company.search("name: ${keyword}"){
//            bool {
//                must {
//                    term('permissions.authority': 'Admin')
//                }
//            }
//        }
        println results
        results
    }

    def searchCompanyByForwarder(String term) {
        println 'company search term ' + term
        def filter = {
            nested {
                array {
                    element('permissions')
                    query {
                        bool {
                            must {
                                term("authority": 'Manager')
                            }
                        }
                    }
                }

            }
        }
        def results = elasticSearchService.search(term, filter, [indices: Company, types: Company, from: 0, size: 10])
//        def results = Company.search("name: ${term}"){
//            bool {
//                must {
//                    term('permissions.authority': 'Manager')
//                }
//            }
//        }
        println results
        results
    }

    def searchMemberSubscription(String term) {
        elasticSearchService.search(term, [indices: MemberSubscription, types: MemberSubscription, from: 0, size: 10])
    }

    def searchTransaction(String term) {
        elasticSearchService.search(term, [indices: Transaction, types: Transaction, from: 0, size: 10])
    }

    def searchVehicle(String term) {
        elasticSearchService.search(term, [indices: Vehicle, types: Vehicle, from: 0, size: 10])
    }

    def searchVehicleByHaulier(String term, String haulierId) {
        def results = elasticSearchService.search(indices: Vehicle, types: Vehicle, from: 0, size: 10) {
            queryString(term)
            match("haulierId": haulierId)
        }
        results
    }

    def searchQuote(String term) {
        elasticSearchService.search(term, [indices: Quote, types: Quote, from: 0, size: 10])
    }

    def searchQuoteByHaulier(String term, String haulierId) {
        elasticSearchService.search(indices: Quote, types: Quote, from: 0, size: 10) {
            queryString(term)
            match("haulierId": haulierId)
        }
    }

    def searchQuotesByForwarder(String term, String forwarderId) {
        elasticSearchService.search(indices: Quote, types: Quote, from: 0, size: 10) {
            queryString(term)
            match("forwarderId": forwarderId)
        }
    }

    def searchJob(String term) {
        elasticSearchService.search(term, [indices: Job, types: Job, from: 0, size: 10])
    }


    def searchJobByHaulier(String term, String haulierId) {
        elasticSearchService.search([indices: Job, types: Job, from: 0, size: 10], null as Closure, {
            queryString(term)
            match("haulierId": haulierId)
        })
    }

    def searchPermission(String term) {
        elasticSearchService.search(term, [indices: Permission, types: Permission, from: 0, size: 10])
    }

    def searchPermissionByGrantedBy(String term, String haulierId) {
        elasticSearchService.search(indices: Permission, types: Permission, from: 0, size: 10) {
            queryString(term)
            match("grantedBy": haulierId)
        }
    }

}
