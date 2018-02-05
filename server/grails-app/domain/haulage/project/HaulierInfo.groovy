package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@Resource(readOnly = false, formats = ['json', 'xml'])
@GrailsCompileStatic(TypeCheckingMode.SKIP)
class HaulierInfo {

  String userId
  String name
  Company company
  String email

  static constraints = {
    name nullable: false
    company nullable: false
    userId nullable: false, unique: true
    email nullable: false, unique: true, email: true
  }

  static searchable = true
}