package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class Permission {

  String email
  String authority

  String role
  //this admin id is the user id of who granted access to the forwarder, from the haulier
  String grantedBy

  static belongsTo = [userInfo: UserInfo, company: Company]

  static constraints = {
    email nullable: false, email: true
    authority nullable: false, inList: ['Admin', 'Manager', 'Super Admin', 'User']
    grantedBy nullable: true
    userInfo nullable: true
    company nullable: true
    role nullable: true
  }

  static searchable = true
}