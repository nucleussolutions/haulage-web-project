package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(Tariff)
interface TariffService {

    Tariff get(Serializable id)

    List<Tariff> list(Map args)

    @Cacheable('tariffCount')
    Long count()

    void delete(Serializable id)

    Tariff save(Tariff tariff)

}