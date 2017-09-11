package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
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