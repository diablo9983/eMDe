!(function($){
  "use strict";

  var Sidebar = function() {
    this.menuItem = $('#sidebar-menu li > a');
    this.sidebarMenu = $('#sidebar-menu');
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
  Sidebar.prototype.init = function () {
    var $this = this;
    $this.menuItem.on('click', function() {
      var $parent = $(this).parent('li');
      $this.closeItem($parent.siblings('li.active'));
      $this.toggleItem($parent,($parent.hasClass('active') ? 'close' : 'open'));
    });
  }

  $.Sidebar = new Sidebar, $.Sidebar.Constructor = Sidebar

})(window.jQuery);
