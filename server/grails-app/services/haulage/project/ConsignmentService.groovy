package haulage.project

import grails.gorm.services.Service

@Service(Consignment)
interface ConsignmentService {

    Consignment get(Serializable id)

    List<Consignment> list(Map args)

    Long count()

    void delete(Serializable id)

    Consignment save(Consignment consignment)

}