package haulage.project


import grails.rest.*
import grails.converters.*
import org.springframework.http.HttpStatus

class PrintController {

  def transportRequestService

  def consignmentService

  def quoteService

	static responseFormats = ['json', 'xml']


  def quotation(){
    Long quotationId = params.quotationId
    if(quotationId){

      Quote quote = quoteService.get(quotationId)

      if(quote){
        //todo print quotation
      }else{
        respond HttpStatus.NOT_FOUND, message: 'quotation not found'
      }

    }else{
      respond HttpStatus.NOT_FOUND, message: 'quotation id not found'
    }
  }

  def consignment(){
    Long consignmentId = params.consignmentId
    if(consignmentId){
      Consignment consignment = consignmentService.get(consignmentId)
      if(consignment){
        //todo print consignment note
      }else{
        respond status: HttpStatus.NOT_FOUND, message: 'consignment not found'
      }
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'consignment id not found'
    }
  }

  def allByRft(){
    Long rftId = params.rftId
    if(rftId){
      def rft = transportRequestService.get(rftId)

      if(rft.consignments){
        //todo print all consignment notes, i dont know how yet

      }else{
        respond status: HttpStatus.NOT_FOUND, message: 'there are no consignments'
      }
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'rft id not found'
    }
  }
}
