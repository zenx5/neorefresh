//(function(){
	let tiempo = 2000;
	let lista_tab = [];

	chrome.storage.local.get("lista_tab",function(data){
		if(Object.keys(data).length != 0){
			lista_tab = data.lista_tab;
		}
	})

	chrome.storage.local.get("tiempo",function(data){
		if(Object.keys(data).length != 0){
			tiempo = data.tiempo;
		}
	})


	chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
		//console.log(request)
		switch(request.origen){
			case 'contentscript':
				let band_find = false;
				lista_tab.forEach(element => {
					if(( element.id === sender.tab.id) && (element.url === sender.tab.url)){
						element.time = Date.now();
						band_find = true;
					}
				})
				if(!band_find){
					lista_tab.push({id:sender.tab.id, url:sender.tab.url, time:Date.now()})
				}
				sendResponse({tiempo:tiempo,lista_tab:lista_tab})
				break;
			case 'config':
				if(request.command === 'iniciar'){
					sendResponse({tiempo:tiempo,lista_tab:lista_tab});
				}
				else if(request.command === 'actualizar'){
					tiempo = request.tiempo;
					chrome.storage.local.set({tiempo:request.tiempo,lista_tab:lista_tab})
					sendResponse({tiempo:tiempo,lista_tab:lista_tab});
				}
				break;
		}

	})

	setInterval( _ => {
		const ahora = Date.now();
		lista_tab = lista_tab.filter( element => {
			//console.log(element.time - ahora)			
			//console.log(tiempo)			
			if((ahora - element.time)>tiempo){
				return element;
			}

		})


	}, 5.5*tiempo)

//})();