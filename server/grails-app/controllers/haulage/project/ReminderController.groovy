package haulage.project


import grails.rest.*
import grails.converters.*

class ReminderController {

  //todo if the notifications pane is being developed, reminders can be set

  //todo for license expiry or whatnot

  //todo

  def quartzService

  static responseFormats = ['json', 'xml']

  def scheduleReminder(){
  }
}
