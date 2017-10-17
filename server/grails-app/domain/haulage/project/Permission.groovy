package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Permission {

    String email
    String userId
    String authority

    static constraints = {
        email nullable: false, email: true, unique: true;
        userId nullable: false, unique: true
        authority nullable: false, inList: ['Admin', 'Manager', 'Super Admin', 'User']
    }


}