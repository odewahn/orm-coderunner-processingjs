(function(){
		
   var app = angular.module('console', []);
   var canvas_idx = 0;

   app.controller('CoderunnerControl', function( $scope ) {
	
	  // Set up some default values
      var handle = this;
      this.mode = "editor"
      this.control_button_label = "Run"

      // These are set by the directive that processes the executable code example
      this.code = "";
      this.codemirror = null;
      this.canvas = null;



      // Create a codemirror item and attach it to the passed element
      // note that the element should be a textarea
      this.initCodemirror = function(e) {
	     handle.codemirror = CodeMirror.fromTextArea(e, {
			lineNumbers: true,
			autofocus: false
		  });
      }


      // Initialize the console where output is displayed
     //  Inspired by http://kapteijns.org/2014/03/21/ruby-repl-in-javascript.html
      this.initCanvas = function(e) {
         console.log("initializing canvas")
      };


      // Toggle the mode between code view and output view
      this.toggleMode = function() {
         handle.code = handle.codemirror.getValue();	
	     if (handle.mode === "editor") {
            handle.mode = "output";
            handle.control_button_label = "Edit"
            //handle.jsrepl.eval(handle.code);
            console.log("need to run code");
	     } else {
            handle.mode = "editor";
            handle.control_button_label = "Run"	
	     }
      }

   });

   // Note: per the angular docs, the compiler stirips "data-" on attributes before it
   // attempts to do any matching, so we don't need to include it in the directive
   app.directive('executable', function() {
	  return {
	     restrict: 'A',
	     replace: true,
	     transclude: true,
	     scope: true,
	     templateUrl: 'coderunner.tpl',
	     link: function(scope, element, attrs) {
		    id = "_processing" + canvas_idx;
			console.log( id );
		    canvas_idx += 1;
		    // Grab the original code sample that has been transcluded in
		    code = element.find(".editor").text();
		    // replace the div with a textarea containing the code
		    element.find(".editor").html("<textarea>" + code + "</textarea>");
		    scope.coderunnerCtrl.code = code;		
		    scope.coderunnerCtrl.initCodemirror(element.find(".editor").find("textarea")[0]); //set up codemirror
		    /*
		    scope.coderunnerCtrl.initJQConsole(element.find(".output"));
			if ($.inArray(scope.coderunnerCtrl.language, scope.coderunnerCtrl.supported_languages) > -1 ) {
			    scope.coderunnerCtrl.initJSREPL();
			} else {
				scope.coderunnerCtrl.error_message = scope.coderunnerCtrl.language + " is not supported.";
			}
            */
	     }
	  }
   });


})();