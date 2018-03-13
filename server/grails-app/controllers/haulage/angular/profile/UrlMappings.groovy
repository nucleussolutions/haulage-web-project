package haulage.angular.profile

class UrlMappings {

  static mappings = {
    delete "/$controller/$id(.$format)?"(action: "delete")
    get "/$controller(.$format)?"(action: "index")
    get "/$controller/$id(.$format)?"(action: "show")
    post "/$controller(.$format)?"(action: "save")
    put "/$controller/$id(.$format)?"(action: "update")
    patch "/$controller/$id(.$format)?"(action: "patch")

    "/"(controller: 'application', action: 'index')
    "500"(view: '/error')
    "404"(view: '/notFound')
    get "/permission/userId/"(controller: 'permission', action: 'getByUserId')
    get "/permission/grantedBy/${userId}"(controller: 'custom', action: 'permissionByGrantedBy')
    get "/permission/company/"(controller: 'permission', action: 'getByCompany')
    get "/location/type/${type}"(controller: 'custom', action: 'locationByType')



    get "/company/count"(controller: 'company', action: 'count')
    get "/company/registrationNo/${registrationNo}"(controller: 'company', action: 'getByRegistrationNo')
    get "/location/count"(controller: 'location', action: 'count')
    get "/pricing/count"(controller: 'pricing', action: 'count')
    get "/pricing/all/"(controller: 'pricing', action: 'listAll')
    get "/driverInfo/count"(controller: 'driverInfo', action:'count')
    get "/job/count"(controller: 'job', action: 'count')
    get "/memberSubscription/count"(controller: 'memberSubscription', action: 'count')
    get "/quote/count"(controller: 'quote', action: 'count')
    get "/permission/count"(controller: 'permission', action: 'count')
    get "/transaction/count"(controller: 'transaction', action: 'count')
    get "/tariff/count"(controller: 'tariff', action: 'count')
    get "/transportRequest/count"(controller: 'transportRequest', action: 'count')
    get "/consignment/count"(controller:'consignment', action: 'count')

    get "/vehicle/count"(controller: 'vehicle', action: 'count')
    get "/userInfo/count"(controller: 'userInfo', action: 'count')

    get "/userInfo/haulier"(controller: 'userInfo', action: 'getHauliers')
    get "/userInfo/haulier/count"(controller: 'userInfo', action: 'countHauliers')
    get "/userInfo/forwarder"(controller: 'userInfo', action: 'getForwarders')
    get "/userInfo/forwarder/count"(controller: 'userInfo', action: 'countForwarders')

    get "/userInfo/me"(controller: 'userInfo', action: 'getByUserId')

    get "/permission/count/grantedBy/${userId}"(controller: 'custom', action: 'permissionCountByGrantedBy')

    "/api/usertype"(controller: 'userType', action: 'checkUserExist', method: 'GET')

    get "/search/location"(controller: 'search', action: 'location')
    get "/search/consignment"(controller: 'search', action: 'consignment')
    get "/search/permission"(controller: 'search', action: 'permission')
    get "/search/permission/haulier/${haulierId}"(controller: 'search', action: 'permissionByHaulier')
    get "/search/transaction"(controller: 'search', action: 'transaction')
    get "/search/transportRequest"(controller: 'search', action: 'transportRequest')
    get "/search/transportRequest/haulier/${haulierId}"(controller: 'search', action: 'transportRequestByHaulier')
    get "/search/transportRequest/forwarder/${forwarderId}"(controller: 'search', action: 'transportRequestByForwarder')

    get "/search/quote"(controller: 'search', action: 'quote')


    get "/search/company"(controller: 'search', action: 'company')
    get "/search/company/registrationNo"(controller: 'search', action: 'companyByRegNo')

    get "/search/userInfo/forwarder"(controller: 'search', action: '')
    get "/search/userInfo/haulier"(controller: 'search', action: '')


    get "/search/vehicle"(controller: 'search', action: 'vehicle')
    get "/search/vehicle/${haulierId}"(controller: 'search', action: 'vehicleByHaulier')
    get "/search/tariff"(controller: 'search', action: 'tariff')
    get "/search/job"(controller: 'job', action: 'job')
    get "/search/job/haulier/${haulierId}"(controller: 'search', action: 'jobsByHaulier')


    get "/job/driver/${driverId}"(controller: 'custom', action: 'jobsByDriverId')
    get "/job/haulier/${haulierId}"(controller: 'custom', action: 'jobByHaulierId')



    get "/quote/haulier/${haulierId}"(controller: 'custom', 'quotesByHaulier')
    get "/quote/forwarder/${forwarderId}"(controller: 'custom', 'quotesByForwarder')



    get "/consignment/transportRequest/${rftId}"(controller: 'custom', action: 'consignmentsByRFT')
    get "/consignment/forwarder/${forwarderId}"(controller: 'consignment', action: 'listByStatusAndForwarder')
    get "/consignment/haulier/${haulierId}"(controller: 'consignment', action: 'listByStatusAndHaulier')

    get "/vehicle/haulier/${haulierId}"(controller: 'custom', action: 'vehicleByHaulier')

    get "/driverInfo/haulier/${haulierId}"(controller: 'custom', action: 'driverInfoByHaulier')
  }
}
