(function($) {

    $.githubplug = function(element, options) {

        var plugin = this;
		var defaults = {
			projectImageName:"projectImage.png",
			projectImageContainer:".projectImage",
			projectDescriptionContainer:".projectDescription"
		};
		
        plugin.settings = {};
	
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
			$.getScript("js/github-plugin/lib/markdown.min.js");
			$(element).attr("href","https://github.com/" + plugin.settings.user + "/" + plugin.settings.repository);
			plugin.getGithubReadme(plugin.settings.user, plugin.settings.repository);
			plugin.getGithubImage(plugin.settings.user, plugin.settings.repository);
        };
		
		plugin.getGithubReadme = function(user, repository){
			$.ajax({
				type: "GET",
				url: "https://api.github.com/repos/" + user + "/" + repository + "/readme"
			}).done(function(rawReadme){
				var decodedReadme = atob(rawReadme.content);
				var readme = markdown.toHTML(decodedReadme);
				plugin.setGithubReadme(readme);
				
			}).fail(function(error){
				var readme = error.statusText;
				plugin.setGithubDetails(readme);
			});
		};
		
		plugin.setGithubReadme = function(readme){
			var target = $(element).find(plugin.settings.projectDescriptionContainer);
			target.html(readme);
		};
		
		plugin.getGithubImage = function(user, repository){
			$.ajax({
				type: "GET",
				url: "https://api.github.com/repos/" + user + "/" + repository + "/contents/" + plugin.settings.projectImageName
			}).done(function(rawImage){
				var decodedImage = rawImage.content;
				plugin.setGithubImage(decodedImage);
			}).fail(function(error){
				console.log(error);
			});			
		};
		
		plugin.setGithubImage = function(image){
			var target = $(element).find(plugin.settings.projectImageContainer);
			var string = 'url("data:image/png;base64,'+image+'")';
			string = string.replace(/\n/g,"");
			target.css("background-image",string);
		};
		
        plugin.init();
};
	
    $.fn.githubplug = function(options) {

        return this.each(function() {
            if (undefined === $(this).data('githubplug')) {
                var plugin = new $.githubplug(this, options);
                $(this).data('githubplug', plugin);
            }
        });

    };

})(jQuery);