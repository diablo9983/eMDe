!(function($){
  "use strict";

  var Sidebar = function() {
    this.menuItem = $('#sidebar-menu li > a');
  }
  Sidebar.prototype.openItem = function(el) {

  }
  Sidebar.prototype.closeItem = function(el) {

  }
  Sidebar.prototype.init = function () {
    var $this = this;

    $this.menuItem.on('click', function() {
      var $parent = $(this).parent('li');
      $this.closeItem($parent.siblings('li.active'));
      $this[($parent.hasClass('active') ? 'close' : 'open') + 'Item'].call($this,$(this));
    });
  }

  $.Sidebar = new Sidebar, $.Sidebar.Constructor = Sidebar

})(window.jQuery);
