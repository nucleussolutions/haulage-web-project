package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class UserInfo {

  String userId
  String name
  Company company

  DriverInfo driverInfo

  static hasMany = [permissions: Permission]

  static constraints = {
    name nullable: false
    company nullable: true
    userId nullable: false, unique: true
    permissions nullable: true
    driverInfo nullable: true
  }

  static searchable = true
}