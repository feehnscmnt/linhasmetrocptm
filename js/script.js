$(document).ready(function() {
	
	const authorization = "Basic TGluaGFzTWV0cm9DUFRNV0VCU2VydmljZUFwaTpXRUJTZXJ2aWNlQXBpTGluaGFzTWV0cm9DUFRN";
	const hostContextApi = "http://localhost:8080/api-linhasmetrocptm";
	const methodGet = "GET";
	
	$.ajax({
		
		url: hostContextApi + "/v1/administradora/listar-administradoras",
		method: methodGet,
		dataType: "json",
		headers: {
			"Authorization": authorization
		},
		success: function(admins) {
			$.each(admins, function(index, admin) {
				$("#slcAdmin").append($("<option>", {
					value: admin.nomeAdministradora,
					text: admin.nomeAdministradora
				}));
			});
		},
		error: function(jqXHR, status, error) {
			console.log("Houve erro durante a requisiçao: ", status, error);
		}
		
	});
	
	$("#slcAdmin").blur(function() {
		
		if ($(this).find(":selected").val() != "") {
			
			$("#slcLinha").html('<option value="">SELECIONE..</option>');
			
			$.ajax({
				
				url: hostContextApi + "/v1/linha/listar-linhas/" + $(this).find(":selected").val(),
				method: methodGet,
				dataType: "json",
				headers: {
					"Authorization": authorization
				},
				success: function(data) {
					
					var linhas = JSON.parse(JSON.stringify(data));
					
					$.each(linhas, function(index, linha) {
						$("#slcLinha").append($("<option>", {
							value: linha.numeroLinha,
							text: linha.nome.toUpperCase()
						}));
					});
					
					$("#slcLinha").prop("disabled", false);
					
				},
				error: function(jqXHR, status, error) {
					console.log("Houve erro durante a requisiçao: ", status, error);
				}
				
			});
			
		} else {
			
			Swal.fire({
				title: "Oops!",
				text: "Selecione a administradora das linhas!",
				icon: "error"
			});
			
		}
		
	});
	
	$("#slcLinha").blur(function() {
		
		if ($(this).find(":selected").val() != "") {
			
			$("#slcEstacao").html('<option value="">SELECIONE..</option>');
			
			$.ajax({
				
				url: hostContextApi + "/v1/estacao/listar-estacoes/" + $(this).find(":selected").val(),
				method: methodGet,
				dataType: "json",
				headers: {
					"Authorization": authorization
				},
				success: function(data) {
					
					var estacoes = JSON.parse(JSON.stringify(data));
					
					$.each(estacoes, function(index, estacao) {
						$("#slcEstacao").append($("<option>", {
							value: estacao.nomeEstacao,
							text: estacao.nomeEstacao.toUpperCase()
						}));
					});
					
					$("#slcEstacao").prop("disabled", false);
					
				},
				error: function(jqXHR, status, error) {
					console.log("Houve erro durante a requisiçao: ", status, error);
				}
				
			});
			
		} else {
			
			Swal.fire({
				title: "Oops!",
				text: "Selecione a linha das estações!",
				icon: "error"
			});
			
		}
		
	});
	
});