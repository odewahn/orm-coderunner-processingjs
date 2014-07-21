<div class="coderunner" ng-controller="CoderunnerControl as coderunnerCtrl">

   <div class="control-area">
	
      <div >
         <a class="btn btn-primary" ng-click="coderunnerCtrl.toggleMode()">{{ coderunnerCtrl.control_button_label }}</a>
      </div>	
	
   </div>

   <div class="display-area">	

      <div class="editor" ng-show="coderunnerCtrl.mode === 'editor'" ng-transclude></div>

      <canvas id="mysketch" class="output" ng-show="coderunnerCtrl.mode === 'output'"></canvas>
 
   </div>
  


</div>