package haulage.project

import grails.converters.JSON
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class PermissionController {

    PermissionService permissionService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", getByUserId: "GET"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond permissionService.list(params), model:[permissionCount: permissionService.count()]
    }

    def show(Long id) {
        respond permissionService.get(id)
    }

    def save(Permission permission) {
        if (permission == null) {
            render status: NOT_FOUND
            return
        }

        try {
            permissionService.save(permission)
        } catch (ValidationException e) {
            respond permission.errors, view:'create'
            return
        }

        respond permission, [status: CREATED, view:"show"]
    }

    def update(Permission permission) {
        if (permission == null) {
            render status: NOT_FOUND
            return
        }

        try {
            permissionService.save(permission)
        } catch (ValidationException e) {
            respond permission.errors, view:'edit'
            return
        }

        respond permission, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        permissionService.delete(id)

        render status: NO_CONTENT
    }

}
