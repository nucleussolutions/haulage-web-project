package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Pricing {

    BigDecimal price
    BigDecimal pricePerMove
    Integer minPrimeMover
    Integer maxPrimeMover
    Integer discountPercent

    static constraints = {
        discountPercent range: 0..99
        price nullable: false
        pricePerMove nullable: false
        minPrimeMover nullable: true
        maxPrimeMover nullable: true
    }
}