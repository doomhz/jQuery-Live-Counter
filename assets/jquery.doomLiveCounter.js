/**
* Doom Live Counter jQuery Plugin
*
* @author Dumitru Glavan
* @link http://dumitruglavan.com
* @version 1.0
* @requires jQuery v1.3.2 or later
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*/
(function ($) {

	$.fn.doomLiveCounter = function (options) {
		var self = this;

		self.config = $.extend({
			updateUrl: null,
			updateTime: 3000,
			counterPrefix: '',
			success: function (data, $els, updater) {
				$els.each(function (i, el) {
					var keyName = $(el).attr('id').replace(updater.config.counterPrefix , '');
					data[keyName] && $(el).html(data[keyName]);
				});
			}
		}, options);
		self.requestIsLive = false, time = new Date().getTime();

		setInterval(function () {self.update.call(self);}, this.config.updateTime);
		self.update.call(self);
		
		return this;
	},

	$.fn.update = function () {
		var self = this, $self = $(this);

		if (!self.requestIsLive) {
			self.requestIsLive = true;
			$.ajax({
				url: self.config.updateUrl,
				dataType: 'json',
				success: function (data) {
					$.isFunction(self.config.success) && self.config.success.call(self, data, $self, self);
					self.requestIsLive = false;
				},
				error: function () {
					self.requestIsLive = false;
				}
			});
		}
	}
})(jQuery);