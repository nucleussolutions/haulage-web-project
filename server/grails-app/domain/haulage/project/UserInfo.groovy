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

  String notifKey

  static hasMany = [permissions: Permission]

  static constraints = {
    name nullable: false
    company nullable: true
    userId nullable: false, unique: true
    permissions nullable: true
    driverInfo nullable: true
    notifKey nullable: true
  }

  static searchable = true


  @Override
  public String toString() {
    return "UserInfo{" +
        "permissions=" + permissions +
        ", userId='" + userId + '\'' +
        ", name='" + name + '\'' +
        ", company=" + company +
        ", driverInfo=" + driverInfo +
        '}';
  }
}