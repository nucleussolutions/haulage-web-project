package haulage.project


class ExpenseItem {
  String merchantName

  String category

  String comment

  Date txDate

  String receiptUrl

  Boolean reimbursable = false

  Boolean billable = false

  static belongsTo = [Expense]

  static constraints = {
    category nullable: false
    comment nullable: true
    txDate nullable: false
    merchantName nullable: false
    receiptUrl nullable: false
    reimbursable nullable: false
    billable nullable: false
  }
}