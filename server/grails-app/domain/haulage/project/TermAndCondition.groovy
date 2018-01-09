package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*

//@Resource(readOnly = false, formats = ['json', 'xml'])
@GrailsCompileStatic
class TermAndCondition {

    String desc

    static constraints = {
        desc nullable: false
    }
}