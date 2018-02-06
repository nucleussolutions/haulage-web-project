package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class Permission {

  String email
  String userId
  String authority

  //this admin id is the user id of who granted access to the forwarder, from the haulier
  String grantedBy

  static constraints = {
    email nullable: false, email: true, unique: true
    userId nullable: true, unique: true
    authority nullable: false, inList: ['Admin', 'Manager', 'Super Admin', 'User']
    grantedBy nullable: false
  }

  static searchable = true
}