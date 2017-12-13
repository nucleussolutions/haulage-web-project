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
    get "/permissionByUserId/${userId}"(controller: 'custom', action: 'permissionByUserId')
    get "/permissionByGrantedBy/${userId}"(controller: 'custom', action: 'permissionByGrantedBy')
    get "/locationByType/${type}"(controller: 'custom', action: 'locationByType')

    //FIXME count urls arent supposed to be done this way. Fix this in the later stage
    get "/location/count"(controller: 'custom', action: 'locationCount')
    get "/haulierInfo/count"(controller: 'custom', action: 'haulierCount')
    get "/pricing/count"(controller: 'custom', action: 'pricingCount')
    get "/forwarderInfo/count"(controller: 'custom', action: 'forwarderInfoCount')
    get "/driverInfo/count"(controller: 'custom', action:'driverInfoCount')
    get "/vehicle/count"(controller: 'custom', action: 'vehicleCount')
    get "/job/count"(controller: 'custom', action: 'jobCount')
    get "/memberSubscription/count"(controller: 'custom', action: 'memberSubscriptionCount')
    get "/quote/count"(controller: 'custom', action: 'quoteCount')
    get "/permission/count"(controller: 'custom', action: 'permissionCount')
    get "/transaction/count"(controller: 'custom', action: 'transactionCount')
    get "/tariff/count"(controller: 'custom', action: 'tariffCount')

    "/api/usertype"(controller: 'userType', action: 'checkUserExist', method: 'GET')
  }
}
