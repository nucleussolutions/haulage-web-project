package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
@ToString(includeNames = true, includePackage = false)
class UserInfo {

  String userId
  String name

  DriverInfo driverInfo

  String notifKey

  static hasMany = [permissions: Permission]

  static constraints = {
    name nullable: false
    userId nullable: false, unique: true
    permissions nullable: true
    driverInfo nullable: true
    notifKey nullable: true
  }

  static searchable = {
    permissions reference: true
  }

}