package haulage.project

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

//test domain class constraints
class LocationSpec extends Specification implements DomainUnitTest<Location> {

    def setup() {
    }

    def cleanup() {
    }

    void "test name cannot be blank"(){
        when:
        domain.name = ''

        then:
        !domain.validate(['name'])
        domain.errors['name'].code == 'blank'
    }

    void "test name cannot be null"(){
        when:
        domain.name = null

        then:
        !domain.validate(['name'])
        domain.errors['name'].code == 'nullable'
    }

//    void "test address1 is nullable"(){
//
//    }
//
//    void "test address2 is nullable"(){
//
//    }

//    void "test mailingAddress is nullable"(){
//
//    }

    void "test formattedAddress cannot be blank"(){
        when:
        domain.formattedAddress = ''
        then:
        !domain.validate(['formattedAddress'])
        domain.errors['formattedAddress'].code == 'blank'
    }

    void "test formattedAddress cannot be null"(){

    }

    void "test city cannot be blank"(){
        when:
        domain.city = ''
        then:
        !domain.validate(['city'])
        domain.errors['city'].code == 'blank'
    }

    void "test city cannot be null"(){
        when:
        domain.city = null

        then:
        !domain.validate(['city'])
        domain.errors['city'].code == 'nullable'
    }

    void "test state cannot be null"(){
        when:
        domain.state = null

        then:
        !domain.validate(['state'])
        domain.errors['state'].code == 'nullable'
    }

    void "test state cannot be blank"(){
        when:
        domain.state = ''
        then:
        !domain.validate(['state'])
        domain.errors['state'].code == 'blank'

    }


}
