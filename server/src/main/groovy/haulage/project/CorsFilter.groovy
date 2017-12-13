package haulage.project

import org.springframework.web.filter.OncePerRequestFilter

import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class CorsFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

    println 'corsfilter req.method '+request.getMethod()

    if (request.getMethod() == "OPTIONS") {

      response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
      response.addHeader("Access-Control-Max-Age", "3600")
      response.addHeader("Access-Control-Allow-Origin", "http://localhost:4200")
      response.addHeader("Access-Control-Allow-Credentials", "true")
      response.status = 200
    } else {
      filterChain.doFilter(request, response)
    }
  }
}
