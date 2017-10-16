package haulage.project


import grails.rest.*
import grails.converters.*

class PermissionController {
	static responseFormats = ['json', 'xml']

    // def index() { }

    def getByUserId(){
        def userId = params.userId

        if(!userId){
            response.status = 400
            render([message : 'user id not found'] as JSON)
            return
        }

        def permission = Permission.findByUserId(userId)
        if(!permission){
            response.status = 400
            render([message: 'user permission not found'] as JSON)
            return
        }else{
            return permission as JSON
        }

    }
}
