package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@Resource(readOnly = false, formats = ['json', 'xml'])
@GrailsCompileStatic(TypeCheckingMode.SKIP)
class Fleet {

    Vehicle primeMover
    Vehicle trailer

    static constraints = {
        primeMover nullable: false, validator: {
            if(primeMover.type == 'trailer'){
                return 'type cannot be trailer'
            }
        }
        trailer nullable: false, validator: {
            if(trailer.type == 'primeMover'){
                return 'type cannot be prime mover'
            }
        }
    }
}