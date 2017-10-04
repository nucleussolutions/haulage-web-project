package haulage.project

import grails.plugin.springsecurity.rest.token.AccessToken
import grails.plugin.springsecurity.rest.token.reader.TokenReader

import javax.servlet.http.HttpServletRequest

class CustomTokenReader implements TokenReader{
    @Override
    AccessToken findToken(HttpServletRequest request) {
        log.debug "Looking for jwt token in Authorization header, query string or Form-Encoded body parameter"

        String tokenValue = null

        String header = request.getHeader('Authorization')

        if (header?.startsWith('JWT') && header.length()>=8) {
            log.debug "Found bearer token in Authorization header"
            tokenValue = header.substring(7)
        } else if (isFormEncoded(request) && !request.get) {
            log.debug "Found bearer token in request body"
            tokenValue = request.parameterMap['access_token']?.first()
        } else if (request.queryString?.contains('access_token')) {
            log.debug "Found jwt token in query string"
            tokenValue = request.getParameter('access_token')
        } else {
            log.debug "No token found"
        }

        log.debug "Token: ${tokenValue}"
        return tokenValue ? new AccessToken(tokenValue) : null
    }

    private boolean isFormEncoded(HttpServletRequest servletRequest) {
        servletRequest.contentType && MediaType.parseMediaType(servletRequest.contentType).isCompatibleWith(MediaType.APPLICATION_FORM_URLENCODED)
    }

}
