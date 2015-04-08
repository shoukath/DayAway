$(document).ready(function() {
	$(".expandLink").click(function(){
		var expandWidth = 510;
		var expandLink = $(this);
		var animationDuration = 300;
		if(!expandLink.hasClass("expanded")){
			expandLink.addClass("expanded");
			expandLink.find("p.arrow").html("&#171;");
			$("#searchBot").animate({"width": "+="+expandWidth}, animationDuration);
			expandLink.animate({"margin-left": "+="+expandWidth}, animationDuration, function(){
				$("#map").fadeIn();
			});
		}else{
			$("#map").fadeOut(500,function(){
				expandLink.removeClass("expanded");
				$("#searchBot").animate({"width": "-="+expandWidth}, animationDuration);
				expandLink.animate({"margin-left": "-="+expandWidth}, animationDuration);
				expandLink.find("p.arrow").html("&#187;");
				$("#mapIframe").attr("src","./testmap.html");
			});
		}
	});

	var availableTags = [
		"Chicago, Illinois - All Airports (CHI)",
		"Chicago, Illinois - O'Hare Airport (ORD)",
		"Chicago, Illinois - Midway Airport (MDW)",
		"New York - All Airports (NYC)",
		"New York - LaGuardia Airport (LGA)",
		"New York - JFK Airport (JFK)",
		"Atlanta, Georgia - Hartsfield-Jackson Airport (ATL)"
	];
	$( ".inputCity" ).autocomplete({
		source: availableTags,
		select: function( event, ui ) {
			$("#mapIframe").attr("src","./testmap.html?zoomlevel=7&city="+ui.item.value);
		}
	});

	$(".inputDate").focus(function(){
		var counter = 0;
		$.each($(".inputCity"), function(){
			if($(this).val()!=""){
				counter++;
			}
		});
		if(counter==2){
			$("#mapIframe").attr("src","./testmap.html?zoomlevel=7&setValue=true&fromCity="+$(".inputCity.from").val()+"&toCity="+$(".inputCity.to").val());
		}
	});
});;
