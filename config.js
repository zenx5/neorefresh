//(function(){

	let input = document.querySelector('#tiempo_numero');
	let range = document.querySelector('#tiempo_rango');
	let lista_tab = [];

	chrome.runtime.sendMessage({origen:"config",command:"iniciar"},function(response){
		//console.log( response )
		input.value = response.tiempo;
		range.value = response.tiempo;
		lista_tab = lista_tab;
	})

	input.addEventListener("change", ev => {
		range.value = ev.target.value;
	})

	range.addEventListener("change", ev => {
		input.value = ev.target.value;
	})
	

	setInterval( _ => {
		let lista = document.querySelector("#lista");
		chrome.runtime.sendMessage({origen:"config",command:"actualizar",tiempo:input.value},function(response){
			//console.log( response )
			input.value = response.tiempo;
			range.value = response.tiempo;
			lista_tab = response.lista_tab;
		})
		lista_tab.forEach( element => {
			//console.log(element)
			lista.innerHTML = "";
			const li = document.createElement("li");
			li.innerText = " > Id Tab: " + element.id + " | URL: " + element.url;
			lista.append(li);
		})
	} , 1000 )

//})();