package haulage.project

import grails.gorm.services.Service

@Service(TransportRequest)
interface TransportRequestService {

    //todo use json deep to output nested objects
    TransportRequest get(Serializable id)

    List<TransportRequest> list(Map args)

    Long count()

    void delete(Serializable id)

    TransportRequest save(TransportRequest transportRequest)

}