# haulage-web-project
Haulage Web Project Backend

Haulage web backend project with auth server being separated from the main web application for modularity and easier scalability.


##List of useful commands so far

grails assemble -Dgrails.env=development

docker build . -t haulage-server

docker run -it -p 8080:8080 -v ~/haulage-web-project/haulage-angular-profile/server:/app -v ~/.gradle:/root/.gradle --memory=1024m haulage-server

docker run -e "JAVA_OPTS=-agentlib:jdwp=transport=dt_socket,address=5005,server=y,suspend=n" -p 8080:8080 -p 5005:5005 haulage-server