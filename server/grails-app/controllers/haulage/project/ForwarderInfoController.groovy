package haulage.project

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class ForwarderInfoController {

    ForwarderInfoService forwarderInfoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond forwarderInfoService.list(params), model:[forwarderInfoCount: forwarderInfoService.count()]
    }

    def show(Long id) {
        respond forwarderInfoService.get(id)
    }

    def save(ForwarderInfo forwarderInfo) {
        if (forwarderInfo == null) {
            render status: NOT_FOUND
            return
        }

        //todo check if info exists in the backend


        try {
            forwarderInfoService.save(forwarderInfo)
        } catch (ValidationException e) {
            respond forwarderInfo.errors, view:'create'
            return
        }

        respond forwarderInfo, [status: CREATED, view:"show"]
    }

    def update(ForwarderInfo forwarderInfo) {
        if (forwarderInfo == null) {
            render status: NOT_FOUND
            return
        }

        try {
            forwarderInfoService.save(forwarderInfo)
        } catch (ValidationException e) {
            respond forwarderInfo.errors, view:'edit'
            return
        }

        respond forwarderInfo, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        forwarderInfoService.delete(id)

        render status: NO_CONTENT
    }
}
