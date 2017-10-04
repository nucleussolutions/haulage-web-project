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



grails.plugin.springsecurity.rest.token.storage.jwt.useSignedJwt=true
grails.plugin.springsecurity.rest.token.storage.jwt.expiration = 365*24*3600 // seconds
//grails.plugin.springsecurity.rest.token.storage.jwt.secret = 'super secret passphrase'
//def mysecret = RandomStringUtils.randomAlphanumeric(32)
//println 'mysecret '+mysecret
grails.plugin.springsecurity.rest.token.storage.jwt.secret = 'yFXjnyqIljnPPCiHQE4HzCYU01rKlYWN'

grails.plugin.springsecurity.rest.token.validation.useBearerToken = false
grails.plugin.springsecurity.rest.token.validation.headerName = 'JWT'
