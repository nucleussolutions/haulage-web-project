package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import grails.converters.*
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class TariffController extends RestfulController {

    def tariffService

    static responseFormats = ['json', 'xml']
    TariffController() {
        super(Tariff)
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
        respond count: tariffService.count()
    }
}
