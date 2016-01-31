var Emde = {};

Emde.guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

!(function($){
  "use strict";  

  var EmdeSidebar = function() {
    this.options = {
      slideSpeed: 200, // Sliding animation speed
      allowOneOnly: true // Allow only one submenu to be opened
    };
    this.menuItem = $('#sidebar-menu li > a');
    this.sidebarMenu = $('#sidebar-menu');
    this.sidebarAccount = $('.sidebar-account');
  }
  EmdeSidebar.prototype.toggleItem = function(element,action) {
    if(!element.length || !this.sidebarMenu.find(element).length || $.inArray(action,['open','close']) === -1) return;
    if(element.is('a')) element = element.parent('li');
    var ul = element.children('ul');
    if(ul.length == 0) return;
    element[(action === 'open' ? 'add' : 'remove') + 'Class'].call(element,'active');
    ul['slide' + (action === 'open' ? 'Down' : 'Up')].call(ul, this.options.slideSpeed);
  }
  EmdeSidebar.prototype.closeItem = function(element) {
    this.toggleItem(element,'close');
  }
  EmdeSidebar.prototype.openItem = function(element) {
    this.toggleItem(element,'open');
  }
  EmdeSidebar.prototype.toggleAccountMenu = function() {
    var menu = this.sidebarAccount.children('.sidebar-account-menu');
    if(this.sidebarAccount.hasClass('open')) {
      this.sidebarAccount.removeClass('open');
      menu.slideUp(this.options.slideSpeed);
    } else {
      this.sidebarAccount.addClass('open');
      menu.slideDown(this.options.slideSpeed);
    }
  }
  EmdeSidebar.prototype.init = function (options) {
    var $this = this;
    $.extend($this.options,options);
    $this.menuItem.on('click', function() {
      var $parent = $(this).parent('li');
      if($this.options.allowOneOnly) $this.closeItem($parent.siblings('li.active'));
      $this.toggleItem($parent,($parent.hasClass('active') ? 'close' : 'open'));
    });
    $this.sidebarAccount.children('a').on('click', function(){
      $this.toggleAccountMenu();
    });
  }

  $.EmdeSidebar = new EmdeSidebar, $.EmdeSidebar.Constructor = EmdeSidebar

})(window.jQuery);
