// Suerte!

document.querySelector(".search_button").addEventListener("click", searchIP);

async function searchIP(e) {
    e.preventDefault();
    let api_key = "at_TeOgm1MaO238payHEBcG3yP33gEgN";
    var ip = document.querySelector(".ip_input").value;
    $(function () {
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: { apiKey: api_key, ipAddress: ip },
            success: function (data) {               

                document.querySelector(".ip_address").textContent=data.ip;
                document.querySelector(".location_value").textContent=data.location.city+" - "+data.location.country;
                
                //let date = new Date();
                // console.log(date)                              
                //date.setUTCHours(+data.location.timezone.slice(0,3));
                //  console.log("Date: "+date.getDate()+
                // "/"+(date.getMonth()+1)+
                // "/"+date.getFullYear()+
                // " "+date.getHours()+
                // ":"+date.getMinutes()+
                // ":"+date.getSeconds());                
                //let localHour = date.getHours() + ":" + date.getMinutes();
                
                document.querySelector(".time_zone_value ").textContent=data.location.timezone;
                document.querySelector(".isp_value ").textContent=data.isp;
                 
                showMap(data.location.lat, data.location.lng);

            },
            error: function (data) {                
                document.querySelector(".ip_input").setAttribute("placeholder","Invalid input");
                document.querySelector(".ip_input").value="";
            }
            
        });
    });
}

async function showMap(lat,lng){

    document.querySelector("#map").remove();
    let mapDiv=document.createElement("div");
    mapDiv.setAttribute("id","map");
    document.querySelector("main").appendChild(mapDiv);
   
    var map = L.map('map', {
        center: [lat, lng],
        zoom: 13
    });
    
    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(map);
}