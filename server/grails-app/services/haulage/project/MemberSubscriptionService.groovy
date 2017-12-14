package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(MemberSubscription)
interface MemberSubscriptionService {

    MemberSubscription get(Serializable id)

    List<MemberSubscription> list(Map args)

    @Cacheable('memberSubscriptionCount')
    Long count()

    void delete(Serializable id)

    MemberSubscription save(MemberSubscription memberSubscription)

}