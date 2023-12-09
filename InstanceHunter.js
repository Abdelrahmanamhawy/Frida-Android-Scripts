Java.perform(function(){
var allClasses=Java.enumerateLoadedClassesSync();
var targetClass=""
//Enumerate methods in a class 
console.log("****Java Classes enumertion at runtime to locate objects to the target class***")
for(let j=0;j<allClasses;j++){
	var list=Object.getOwnPropertyNames(allClasses[j].__proto__)
	for(let i=0;i<list.length;i++){
		if(list[i]==targetClass)
			console.log("Found one ")
	
	}
}
	Java.choose(targetClass, {
        onMatch:function(instance){
            console.log("Found instance" + instance);
			
			//in
			
		
			
        },
        onComplete:function(instance) {
            console.log("Follow "+instance);
			
        }
    });
});