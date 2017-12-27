package haulage.project

import grails.gorm.transactions.Transactional
import grails.plugin.awssdk.s3.AmazonS3Service

import javax.annotation.PostConstruct

//@Transactional
class ConsignmentBucketService extends AmazonS3Service {

  static final BUCKET_NAME = 'consignment-bucket'

  @PostConstruct
  def init() {
    init(BUCKET_NAME)
  }

}
