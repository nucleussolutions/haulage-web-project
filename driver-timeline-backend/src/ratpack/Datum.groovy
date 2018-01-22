import grails.gorm.annotation.Entity

@Entity
class Datum {
  Date timestamp
  String type
  Value value

  def toMap(){
    [timestamp: timestamp, type: type, value: value]
  }
}

@Entity
class Value {
  String jobId
  String driverId
  Double lat
  Double lng
  String activity

  def toMap(){
    [jobId: jobId, driverId: driverId, lat: lat, lng: lng, activity: activity]
  }
}
