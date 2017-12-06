package haulage.project

import org.springframework.http.HttpStatus

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK


class CustomController {

    PermissionService permissionService
    LocationService locationService

    static responseFormats = ['json', 'xml']

    def permissionByUserId(String userId) {
        println 'userId ' + userId
        if (!userId) {
            render([status: NOT_FOUND, message: 'user id not found'])
        } else {
            def permission = permissionService.findByUserId(userId)
            if (!permission) {
                response.status = 400
                render([message: 'user permission not found'])
            } else {
                respond permission, status: OK
            }
        }
    }

    def permissionByGrantedBy(String userId) {
        println 'userId ' + userId

        if (!userId) {
            render([status: NOT_FOUND, message: 'user id not found'])
        } else {
            List<Permission> permissions = permissionService.findAllByGrantedBy(userId)

            if (!permissions) {
                response.status = 400
                render([message: 'permissions granted by this user is not found'])
            } else {
                respond permissions, status: OK
            }
        }
    }

    def locationByType() {
        if (params.type) {
            respond locationService.findByType(params.type as String)
        } else {
            respond status: NOT_FOUND, message: 'location not found'
        }
    }
}
