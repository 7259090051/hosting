//for firstpage.html
var myApp=angular.module('myApp',[]); 
myApp.controller('mainCntrl',['$scope','$http','$window','$rootScope',
function($scope,$http,$window,$rootScope){
	console.log("well come to mainpage.html")

	$scope.usernamedetails = window.sessionStorage.getItem("username")
	//salert($scope.usernamedetails)
	//console.log($rootScope.name)
	$scope.admin = true;
	var currentdateCheck = null;
	var lastDateCheck = null;
	var lastDateValidation = null;
	//$scope.admin = false;
	// $scope.bit = {
 //      date: new Date()
 //    };
    $scope.date2 =  new Date();

        var a=10;
    if (a == 10) {
       jQuery("#myModal1").modal("show");
    };

	console.log($scope.admin);
	var lastdate = null;
	$scope.all = true;
	var currentdate = null;
	var lastdatecall = function(){
	$http.get('/getinventorygroupvaluenotationlast').success(function(response){
               			 console.log(response);  
               			 console.log(response[0].date);
               			  lastdate = response[0].date         
          			 });
	}
	lastdatecall();

	$scope.datecall = function(){
	 currentdate = new Date(((new Date($scope.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
  	 console.log(currentdate);
  	 //alert(currentdate);
  	 currentdateCheck = currentdate.slice(0,10);
  	 //alert(currentdateCheck);

  	 $scope.inventorygroup = "";
  	 //alert("call for me");
	$http.get('/todayinventorygroupvaluenotation/'+currentdate).success(function(response){
                console.log(response);  
                console.log(response[0]);
                if(response[0] != undefined) {
                 lastDateCheck = response[0].date ;
                 lastDateValidation = response[0].date ;
                 lastDateCheck = lastDateCheck.slice(0,10);
                 }
                 //alert(" lastDateCheck "+lastDateCheck);
                //$scope.inventorygroup = response;
                if(response[0] == undefined) {
                 console.log("result clear");	
                 	$http.get('/getinventorygroupvaluenotation/'+lastdate).success(function(response){
               			 console.log(response);  
               			 $scope.inventorygroup = response; 
               			 //lastDateCheck = response[0].date ;
		                 lastDateValidation = currentdate ;
		                // lastDateCheck = lastDateCheck.slice(0,10);
               			 $scope.all = false;             
          			 });

                }else if(currentdateCheck == lastDateCheck){
                		//alert(' alert ok updates '+currentdate+' alert ok updates '+response[0].date)
                		//alert(" lastDateCheck "+lastDateCheck+" currentdateCheck "+currentdateCheck);
                
                		$scope.inventorygroup = response;
                		$scope.all = false;  
               			
                }  else{
                	$scope.inventorygroup = "";
                	$scope.all = true;
                }           
           });
	//alert("change call")
	}
	$scope.datecall();

	
	//$scope.total2 = null;
	//console.log("last adet  current  "+$scope.date2)
	var datatest = [];
	var update = null;
	///var  datatest.date = null;
	$scope.save1 = function(){
		//lastdatecall();
		 alert("Daily Rates are updated for today");
		console.log($scope.date2)
		console.log(datatest.date)
		console.log(datatest);
		//console.log($scope.total2)
		//var currentdate = new Date(((new Date($scope.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
  		console.log(currentdate)
  		if(currentdateCheck == lastDateCheck){
  			//alert("both are equal");
  			update = "equal";

  		}else{
  			//alert("both are not equal");
  			update = "notequal";
  		}
		// console.log($scope.inventorygroup[0].Rate)
		// console.log($scope.inventorygroup[1].Rate)
		// console.log($scope.inventorygroup.length)
		var inventorygrouplength =$scope.inventorygroup.length;
		//var data1 = $scope.inventorygroup;
		//alert("save function "+$scope.inventorygroup[0]._id)
		console.log(currentdate);

		 // (async function loop() {
   //  for (let i = 0; i <= arrlength-1; i++) {
   //      await new Promise(resolve => setTimeout(resolve,  ))}})()

(async function loop() {
		for(let d =0;d< inventorygrouplength;d++){

			// console.log($scope.inventorygroup[d]);
			 $scope.inventorygroup[d].currentdate = lastDateValidation;
		  var inventorygroupdata = $scope.inventorygroup[d].NotationID+","+$scope.inventorygroup[d].InvGroupID+","+$scope.inventorygroup[d].ValueNotation+","+
		  $scope.inventorygroup[d].ConversionPercentage+","+$scope.inventorygroup[d].Rate+","+$scope.inventorygroup[d].InvGroupName+","+$scope.inventorygroup[d].currentdate+","+update+","+$scope.inventorygroup[d]._id;
		//console.log(inventorygroupdata)
		//console.log("value of d openning in for loop"+d)
			await new Promise(resolve => setTimeout(resolve,  

		 
		$http.post('/postinventorygroupvaluenotation/'+inventorygroupdata).success(function(response)
          {  
              //console.log(response); 
              datatest = response;
             console.log( datatest);
            //$scope.inventorygroup = response;
             //console.log("value of d inside openning "+d)

          })

	  
	  ));
			//console.log("value of d outside "+d)

	  }
	  })()//asa
	  
	}//save1

}])