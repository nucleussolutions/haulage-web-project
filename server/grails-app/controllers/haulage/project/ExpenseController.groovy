package haulage.project


import grails.rest.*
import grails.converters.*
import org.springframework.http.HttpStatus

class ExpenseController extends RestfulController {

  static responseFormats = ['json', 'xml']

  ExpenseController() {
    super(Expense)
  }

  @Override
  def index(Integer max) {
    //todo get permission of user
    def userId = request.getHeader('userId')
    if(userId){
      Permission permission = Permission.where {
        userInfo.userId == userId
      }

      if(permission){
        if(permission.authority == 'Super Admin'){
          //show all
          return super.index(max)
        }else{
          //todo show expenses based on haulier id
          def expenses = Expense.where {
            job.haulierId == userId
          }
          return expenses
        }
      }else{
        response.status = HttpStatus.BAD_REQUEST.value()
        respond message: 'permission not found'
      }
    }else{
      response.status = HttpStatus.NOT_FOUND.value()
      respond message: 'user id not found'
    }
  }


}
