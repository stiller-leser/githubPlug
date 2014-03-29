githubPlug
==========

Plug your github repositories in your homepage, using this jQuery-Plugin.

Howto use
---------

Add this jQuery-Plugin to any element you like. All you need to configure
is the user and the repository. Using this method the plugin will add
the image to an element with the ".projectImage"-class and the discription
to the element with the ".projectDiscription"-class. For the image
to be shown, name it "projectImage.png".
However you can change this behaviour by also configuring those class-names.
You can also configure the image-name. An example is shown below.

	$("#element#).githubplug({
		user: "your-name",
		repository: "your-repository",
		projectImageName: "differentName",
		projectImageContainer: "differentElementClass",
		projectDescriptionContainer: "differentElementClass"
	});

The credit for the markdown- to html-conversation goes to markdown-js from evilstreak, published under MIT-License.
