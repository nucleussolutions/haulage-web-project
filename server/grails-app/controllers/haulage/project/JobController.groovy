package haulage.project

import grails.util.Environment
import grails.validation.ValidationException
import groovyx.net.http.HTTPBuilder

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
        //todo trigger firebase server notification api
        //https://fcm.googleapis.com/fcm/send

        def postBody = {
            to: '/topics/driver/'
            registration_ids : []
            priority : 'normal'
            data : {
                message : 'A job is assigned to you. Tap for details'
            }
        }

        if(Environment.DEVELOPMENT){
            postBody.dry_run  = true
        }

//        def http = new HTTPBuilder('https://fcm.googleapis.com/fcm/send')


        respond job, [status: CREATED, view:"show"]
    }

    def update(Job job) {
        if (job == null) {
            render status: NOT_FOUND
            return
        }

        if(job.status == JobStatus.STARTED) {
            job.startDateTime = new Date()
        }else if(job.status == JobStatus.COMPLETE){
            job.endDateTime = new Date()
        }else if(job.status == JobStatus.PENDING_REASSIGN){
            job.startDateTime = null
            job.endDateTime = null
        }

        try {
            jobService.save(job)
        } catch (ValidationException e) {
            respond job.errors, view:'edit'
            return
        }

        //todo trigger firebase notification if the job is assigned to another driver
        //https://fcm.googleapis.com/fcm/send
//        def http = new HTTPBuilder('https://fcm.googleapis.com/fcm/send')
        def postBody = {
            to: '/topics/driver/'
            registration_ids : []
            priority : 'normal'
            data : {
                message: 'Job assigned to another driver'
            }
        }

        if(Environment.DEVELOPMENT){
            postBody.dry_run  = true
        }

        respond job, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        jobService.delete(id)

        //todo firebase notification if the job is deleted if assigned to driver
        def postBody = {
            to: '/topics/driver/'
            registration_ids : []
            priority : 'normal'
            data : {
                message : 'Job deleted by haulier'
            }
        }

        if(Environment.DEVELOPMENT){
            postBody.dry_run  = true
        }

        render status: NO_CONTENT
    }
}
