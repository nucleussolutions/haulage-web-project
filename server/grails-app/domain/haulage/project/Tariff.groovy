package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Tariff {

    String desc
    Location location
    String zone
    BigDecimal tollCharges
    BigDecimal fafPercent
    BigDecimal haulageCharges

    static constraints = {
        desc nullable: false
        location nullable: true
        zone nullable: false
        tollCharges nullable: false
        haulageCharges nullable: false
        fafPercent nullable: false
    }
}