package haulage.project

import grails.gorm.services.Service

@Service(Tariff)
interface TariffService {

    Tariff get(Serializable id)

    List<Tariff> list(Map args)

    Long count()

    void delete(Serializable id)

    Tariff save(Tariff tariff)

}