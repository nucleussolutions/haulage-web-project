package haulage.project

import grails.gorm.transactions.Transactional
import grails.plugin.awssdk.s3.AmazonS3Service

import javax.annotation.PostConstruct

//@Transactional
class TransportRequestBucketService extends AmazonS3Service {

  static final String BUCKET_NAME = 'rft-bucket'

  @PostConstruct
  def init() {
    init(BUCKET_NAME)
  }

}
