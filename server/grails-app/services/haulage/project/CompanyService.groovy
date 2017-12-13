package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(Company)
interface CompanyService {

    Company get(Serializable id)

    List<Company> list(Map args)

    @Cacheable('companyCount')
    Long count()

    void delete(Serializable id)

    Company save(Company company)

}