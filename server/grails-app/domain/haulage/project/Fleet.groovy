package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Fleet {

    //will need one prime mover and one trailer
    Vehicle primeMover

    Vehicle trailer

    static belongsTo = [HaulierInfo]

    static constraints = {
        primeMover nullable: false
        trailer nullable: false
    }
}