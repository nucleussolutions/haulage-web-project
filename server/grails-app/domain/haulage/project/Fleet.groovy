package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Fleet {
    Vehicle primeMover;
    Vehicle trailer;
}