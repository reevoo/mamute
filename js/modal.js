function Modal(a){function b(a){a.preventDefault(),c.toggle()}this.element=$(a),this.closeButton=$(a).find(".modal-close-button"),this.toggle(),this.closeButton.off("click"),this.closeButton.on("click",b);var c=this}Modal.prototype.toggle=function(){this.element.toggleClass("hidden")},Modal.prototype.hide=function(){this.element.hide()};