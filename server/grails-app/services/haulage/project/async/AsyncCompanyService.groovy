package haulage.project.async

import grails.async.DelegateAsync
import grails.gorm.transactions.Transactional
import haulage.project.CompanyService

@Transactional
class AsyncCompanyService {
    @DelegateAsync
    CompanyService companyService
}
