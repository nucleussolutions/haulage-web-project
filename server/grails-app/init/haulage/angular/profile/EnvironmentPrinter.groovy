package haulage.angular.profile

import grails.core.GrailsApplication
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import grails.config.Config
import grails.util.Environment

@Component
class EnvironmentPrinter implements CommandLineRunner{

    @Autowired
    GrailsApplication grailsApplication

    @Override
    void run(String... args) throws Exception {

        println "Running in ${Environment.current.name}"


        // Get configuration from GrailsApplication.
        final Config configuration = grailsApplication.config

        // Get the value for sample.config.
//        final String sampleConfigValue = configuration.getProperty('sample.config')

        // Print to standard out.
//        println "Value for sample.config configuration property = $sampleConfigValue"
    }
}
