(function(){
	addEventListener("load", _ => {
		chrome.runtime.sendMessage({origen:"contentscript"},function(response){
			//console.log(response)
			setInterval( _ => {
				window.location.reload()
			},response.tiempo);
		})
	})
})();