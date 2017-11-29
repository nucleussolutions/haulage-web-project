package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Tariff {

    String desc
    Location location
    String zone
    BigDecimal tollCharges
    BigDecimal faf
    BigDecimal haulageCharges

    static constraints = {
        desc nullable: false
        location nullable: false
        zone nullable: false
        tollCharges nullable: false
        faf nullable: false
        haulageCharges nullable: false
    }
}