package haulage.project

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class JobController {

    JobService jobService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond jobService.list(params), model:[jobCount: jobService.count()]
    }

    def show(Long id) {
        respond jobService.get(id)
    }

    def save(Job job) {
        if (job == null) {
            render status: NOT_FOUND
            return
        }

        try {
            jobService.save(job)
        } catch (ValidationException e) {
            respond job.errors, view:'create'
            return
        }

        respond job, [status: CREATED, view:"show"]
    }

    def update(Job job) {
        if (job == null) {
            render status: NOT_FOUND
            return
        }

        try {
            jobService.save(job)
        } catch (ValidationException e) {
            respond job.errors, view:'edit'
            return
        }

        respond job, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        jobService.delete(id)

        render status: NO_CONTENT
    }
}
