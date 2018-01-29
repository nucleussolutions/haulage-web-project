package haulage.project

import com.agileorbit.schwartz.SchwartzJob
import grails.gorm.transactions.Transactional
import org.quartz.JobExecutionContext
import org.quartz.JobExecutionException

import java.text.SimpleDateFormat

class JobReminderService implements SchwartzJob {

  @Override
  void buildTriggers() {
//    Date startAt = dailyDate()
//    triggers << factory('').startAt()
  }

  @Override
  void execute(JobExecutionContext context) throws JobExecutionException {
    //todo job logic goes here
//    println 'job executing'
//    log.info "{}:{}", context.trigger.key, new SimpleDateFormat("dd/M/yyyy hh:mm:ss").format(new Date())

  }
}
