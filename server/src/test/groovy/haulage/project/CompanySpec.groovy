package haulage.project

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class CompanySpec extends Specification implements DomainUnitTest<Company> {

    def setup() {
    }

    def cleanup() {
    }

    void "company save successful"() {

        given: 'company information is filled'
        def company = new Company()
        company.name = 'AGL Logistics'
        company.email = 'kevin@kevin.com'
        company.address1 = 'test address 1'
        company.address2 = 'test address 2'
        company.city = 'Petaling Jaya'
        company.state = 'Selangor'
        company.country = 'Malaysia'

        when: 'permissions are defined'
        def permission = new Permission()
        permission.company = company
        permission.role = 'Owner'
        permission.authority = 'Admin'
        permission.status = 'Pending Approval'

        company.permissions = []
        company.permissions.add(permission)


        then: 'company save successful, with permissions'
        company.save()
        assert company.permissions != null

//        expect:"fix me"
//        true == false
    }
}
