package haulage.project


import grails.rest.*
import grails.converters.*

class ExpenseItemController extends RestfulController {

  static responseFormats = ['json', 'xml']

  ExpenseItemController() {
    super(ExpenseItem)
  }

  @Override
  def save() {

    if(request.JSON.receiptImageBase64){

    }
//    return super.save()
  }

  @Override
  def update() {
//    return super.update()


    if(request.JSON.receiptImageBase64){

    }


  }

}
