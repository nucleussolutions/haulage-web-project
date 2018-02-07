package haulage.project


import grails.rest.*

class UserInfo {

  String userId
  String name
  Company company

  static hasMany = [permissions: Permission]

  static constraints = {
    name nullable: false
    company nullable: false
    userId nullable: false, unique: true
    permissions nullable: true
  }

  static searchable = true
}