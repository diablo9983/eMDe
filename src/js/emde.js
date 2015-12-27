!(function($){
  "use strict";

  var Sidebar = function() {
    this.menuItem = $('#sidebar-menu li > a');
    this.sidebarMenu = $('#sidebar-menu');
    this.sidebarAccount = $('.sidebar-account');
  }
  Sidebar.prototype.toggleItem = function(element,action) {
    if(!element.length || !this.sidebarMenu.find(element).length || $.inArray(action,['open','close']) === -1) return;
    if(element.is('a')) element = element.parent('li');
    var $ul = element.children('ul');
    if($ul.length == 0) return;
    element[(action === 'open' ? 'add' : 'remove') + 'Class'].call(element,'active');
    $ul['slide' + (action === 'open' ? 'Down' : 'Up')].call($ul);
  }
  Sidebar.prototype.closeItem = function(element) {
    this.toggleItem(element,'close');
  }
  Sidebar.prototype.openItem = function(element) {
    this.toggleItem(element,'open');
  }
  Sidebar.prototype.toggleAccountMenu = function() {
    var menu = this.sidebarAccount.children('.sidebar-account-menu');
    if(this.sidebarAccount.hasClass('open')) {
      this.sidebarAccount.removeClass('open');
      menu.slideUp();
    } else {
      this.sidebarAccount.addClass('open');
      menu.slideDown();
    }
  }
  Sidebar.prototype.init = function () {
    var $this = this;
    $this.menuItem.on('click', function() {
      var $parent = $(this).parent('li');
      $this.closeItem($parent.siblings('li.active'));
      $this.toggleItem($parent,($parent.hasClass('active') ? 'close' : 'open'));
    });
    $this.sidebarAccount.children('a').on('click', function(){
      $this.toggleAccountMenu();
    });
  }

  $.Sidebar = new Sidebar, $.Sidebar.Constructor = Sidebar

})(window.jQuery);
