import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.render.GroovyRendererSupport
import ratpack.jackson.Jackson


class DatumRenderer extends GroovyRendererSupport<Datum> {

  @Override
  void render(GroovyContext context, Datum datum) throws Exception {
    context.byContent {
      json {
        context.render Jackson.json(datum)
      }
    }
  }
}
