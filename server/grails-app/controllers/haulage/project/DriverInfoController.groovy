package haulage.project


import grails.rest.*
import grails.converters.*

class DriverInfoController extends RestfulController {

    def driverInfoService

    static responseFormats = ['json', 'xml']
    DriverInfoController() {
        super(DriverInfo)
    }

    @Override
    Object index(Integer max) {
        return super.index(max)
    }

    @Override
    Object show() {
        return super.show()
    }

    @Override
    Object create() {
        return super.create()
    }

    @Override
    Object save() {
        return super.save()
    }

    @Override
    Object edit() {
        return super.edit()
    }

    @Override
    Object patch() {
        return super.patch()
    }

    @Override
    Object update() {
        return super.update()
    }

    @Override
    Object delete() {
        return super.delete()
    }

    def count(){
        respond count: driverInfoService.count()
    }
}