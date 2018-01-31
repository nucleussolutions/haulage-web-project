//import haulage.project.CustomTokenReader

//import org.apache.commons.lang3.RandomStringUtils

grails.plugin.springsecurity.controllerAnnotations.staticRules = [
        [pattern: '/index.html', access: ['permitAll']],
        [pattern: '/static/**/**', access: ['permitAll']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
//        //Stateless chain
//        [
//                pattern: '/api/**',
//                filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'
//        ],

        //Traditional chain
        [
                pattern: '/**',
//                filters: 'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter'
                filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'
        ]
]

grails.gorm.default.mapping = {
        id generator: 'org.hibernate.id.enhanced.SequenceStyleGenerator', params: [prefer_sequence_per_entity: true]
}