package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
@GrailsCompileStatic
class ForwarderInfo {

  String userId
  String name
  Company company

  static constraints = {
    name nullable: false
    company nullable: false
    userId nullable: false, unique: true
  }

  static searchable = true
}