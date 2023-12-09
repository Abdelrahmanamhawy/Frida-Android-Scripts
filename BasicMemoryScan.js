console.log("***Starting Memory Scan ..****")
	var ranges = Process.enumerateRangesSync({protection: 'r--', coalesce: true});
		var range;
		function processNext(){
			range = ranges.pop();
			if(!range){
				// we are done
				return;
			}
			
			
			//Write your pattern here 
			Memory.scan(range.base, range.size, '57 61 6C 6C 65 74', {
				onMatch: function(address, size){
						console.log('[+] Pattern found at: ' + address.toString());
					}, 
				onError: function(reason){
						console.log('[!] There was an error scanning memory');
					}, 
				onComplete: function(){
						processNext();
					}
				});
		}