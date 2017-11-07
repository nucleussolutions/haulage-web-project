package haulage.project

import grails.gorm.services.Service

@Service(ForwarderInfo)
interface ForwarderInfoService {

    ForwarderInfo get(Serializable id)

    List<ForwarderInfo> list(Map args)

    Long count()

    void delete(Serializable id)

    ForwarderInfo save(ForwarderInfo forwarderInfo)

}