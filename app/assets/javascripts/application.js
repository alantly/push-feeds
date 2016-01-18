// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require react
//= require react_ujs
//= require components
//= require_tree .
//= stub notification/sw
//= stub notification/main
//= require bootstrap-sprockets

$(document).ajaxComplete(function(event, xhr, settings) {
  var csrf_param = xhr.getResponseHeader('X-CSRF-Param');
  var csrf_token = xhr.getResponseHeader('X-CSRF-Token');

  if (csrf_param) {
    $('meta[name="csrf-param"]').attr('content', csrf_param);
  }
  if (csrf_token) {
    $('meta[name="csrf-token"]').attr('content', csrf_token);
  }
});