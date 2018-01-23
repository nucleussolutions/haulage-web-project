package com.driverapp.app

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import ratpack.handling.Context
import ratpack.handling.Handler

class PermissionHandler implements Handler{

  private final static Logger LOGGER = LoggerFactory.getLogger(PermissionHandler.class)

  @Override
  void handle(Context ctx) throws Exception {
    String path = ctx.getRequest().getPath()
    String body = ctx.request.body

    println path

    println body

    println


  }

}
