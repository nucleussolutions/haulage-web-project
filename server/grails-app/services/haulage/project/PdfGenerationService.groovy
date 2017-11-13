package haulage.project

import org.grails.plugins.wkhtmltopdf.WkhtmltoxService

class PdfGenerationService {

  static transactional = false

  WkhtmltoxService wkhtmltoxService

  def generateQuotation(Quote quote){
    //todo generate quote

  }

  def generateConsignmentNote(Consignment consignment){
    //todo generate consignment
//    def byte[] pdfData = wkhtmltoxService.makePdf(
//            view: "/pdf/someGspTemplate",
//            model: [someInstance: someInstance],
//            header: "/pdf/someHeader",
//            footer: "/pdf/someFooter",
//            marginLeft: 20,
//            marginTop: 35,
//            marginBottom: 20,
//            marginRight: 20,
//            headerSpacing: 10)


    // DO Something e.g. send as mail
    //sendAsynchronousMail {
    //    multipart true
    //    to "mail@mail.de"
    //    subject "see PDF Attachment";
    //    attachBytes "PDF Attachment.pdf", "application/pdf", pdfData
    //    body "see my pdf attachment"
    //}
  }
}