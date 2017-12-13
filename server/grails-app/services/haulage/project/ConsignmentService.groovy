package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(Consignment)
interface ConsignmentService {

    Consignment get(Serializable id)

    List<Consignment> list(Map args)

    @Cacheable('consignmentCount')
    Long count()

    void delete(Serializable id)

    Consignment save(Consignment consignment)

}