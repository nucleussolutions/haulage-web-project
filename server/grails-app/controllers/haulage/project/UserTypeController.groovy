package haulage.project


import grails.rest.*
import grails.converters.*
import org.springframework.http.HttpStatus

class UserTypeController {
	static responseFormats = ['json', 'xml']
	
    def checkUserExist(){
        String userId = request.JSON.userId
        if(!userId){
            render status: HttpStatus.NOT_FOUND, message: 'user id not found'
        }else{
            //Lightbox.findAll("from Lightbox as lb where :userAccount in (lb.users)", [userAccount: springSecurityService.getCurrentUser()])

            //FIXME join this into one query if possible
            def haulierInfo = HaulierInfo.findByUserId(userId)

            def forwarderInfo = ForwarderInfo.findByUserId(userId)

            if(!haulierInfo && !forwarderInfo){
                render status: HttpStatus.UNPROCESSABLE_ENTITY, message: 'user not a haulier or forwarder'
            }else{
                render status: HttpStatus.OK, message: 'user exists'
            }
        }
    }
}
