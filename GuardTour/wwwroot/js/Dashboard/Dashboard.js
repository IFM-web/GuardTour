
$(document).ready(() => {
    $("#beatid").trigger("change")
})

// Initialize the map centered in India




var map;
$(document).ready(() => {
    initializeMap()
})


//function initializeMap() {
//    if (map) {
//        map.off();
//        map.remove();
//    }

//     ✅ Map Initialize karein
//    map = L.map('map').setView([28.6139, 77.209], 10);

//     ✅ Google Terrain Layer Add karein
//    let googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}', {
//        maxZoom: 18,
//        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
//    }).addTo(map);

//     ✅ Check if Fullscreen Plugin is Loaded
//    console.log(typeof L.Control.Fullscreen);  // Should print 'function'

//     ✅ Fullscreen Button Add karein
//    if (L.Control.Fullscreen) {
//        map.addControl(new L.Control.Fullscreen({
//            position: 'topright',
//            title: {
//                'false': 'View Fullscreen',
//                'true': 'Exit Fullscreen'
//            }
//        }));

//         📌 Fullscreen Event Handling
//        map.on('enterFullscreen', function () {
//            console.log('Map is now fullscreen');
//        });

//        map.on('exitFullscreen', function () {
//            console.log('Exited fullscreen mode');
//        });
//    } else {
//        console.error("Fullscreen plugin is not loaded.");
//    }
//}

function initializeMap() {
    
    if (map) {
        map.off(); 
        map.remove();
    }

 
    map = L.map('map').setView([28.6139, 77.209], 10);

    
    googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}', {
        maxZoom: 18,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

 

}


function mapAction() {
    initializeMap();

    $.ajax({
        url: '/Admin/getBeats',
        method: 'GET',
        dataType: 'json',
        data: { id: $("#beatid").val() },
        success: function (data) {
            var data = JSON.parse(data);
            console.log(data);
            var latLngs = [];

            for (var i = 0; i < data.length; i++) {
                var latLng = [data[i].latitude, data[i].longitude];
                latLngs.push(latLng);

                L.marker(latLng, {
                    icon: createCustomMarker('', data[i].BeatName, data[i].EmpName)
                })
                    .addTo(map)
                    .bindPopup(
                        `
                        <strong>Route Name :<span>${ data[i].RouteName }</span></strong><br>
                        <strong>Post Name :<span>${data[i].BeatName}</span></strong><br>
                         <strong>Is Checked :<span>No</span></strong><br>`,
                        {
                            offset: L.point(0, 20)
                        }
                    );
            }

           
            if (latLngs.length > 1) {
                latLngs.push(latLngs[0]); 

                L.polyline(latLngs, {
                    color: 'red',
                    weight: 3,
                    opacity: 0.7
                }).addTo(map);
            }

           
            if (latLngs.length > 0) {
                var bounds = L.latLngBounds(latLngs);
                map.fitBounds(bounds);
            }
        },
        error: function (error) {
            console.log('Error fetching data:', error);
        }
    });
}

//function mapAction() {
//    initializeMap();

//    $.ajax({
//        url: '/Admin/getBeats',
//        method: 'GET',
//        dataType: 'json',
//        data: { id: $("#beatid").val() },
//        success: function (data) {
//            var data = JSON.parse(data);
//            console.log(data);
//            var latLngs = [];

//            for (var i = 0; i < data.length; i++) {
//                var latLng = [data[i].latitude, data[i].longitude];
//                latLngs.push(latLng);

//                L.marker(latLng, {
//                    icon: createCustomMarker('', data[i].BeatName, data[i].EmpName)
//                })
//                    .addTo(map)
//                    .bindPopup(
//                        `<div class="status-card">
//    <h4>QR Scanned</h4>
//    <div class="status-icons">
//        <div class="icon success">✓</div>
//        <div class="icon success">✓</div>
//        <div class="icon success">✓</div>
//        <div class="icon success">✓</div>
//        <div class="icon failure">✗</div>
//        <div class="icon success">✓</div>
//        <div class="icon failure">✗</div>
//        <div class="icon failure">✗</div>
//        <div class="icon failure">✗</div>
//        <div class="icon success">✓</div>
//    </div>
//</div>`,
//                        {
//                            offset: L.point(0, 20)
//                        }
//                    );
//            }

           
//            if (latLngs.length > 1) {
//                L.polyline(latLngs, {
//                    color: 'red', 
//                    weight: 3, 
//                    opacity: 0.7 
//                }).addTo(map);
//            }

           
//            if (latLngs.length > 0) {
//                var bounds = L.latLngBounds(latLngs);
//                map.fitBounds(bounds);
//            }
//        },
//        error: function (error) {
//            console.log('Error fetching data:', error);
//        }
//    });
//}


//function mapAction() {
    
//    initializeMap();


//    $.ajax({
//        url: '/Admin/getBeats',  
//        method: 'GET',
//        dataType: 'json',
//        data: { id: $("#beatid").val()},
//        success: function (data) {
//            var data = JSON.parse(data);
//            console.log(data)
//            var latLngs = [];  

//            for (var i = 0; i < data.length; i++) {
//                var latLng = [data[i].latitude, data[i].longitude];
//                latLngs.push(latLng);


//                L.marker(latLng, {
//                    icon: createCustomMarker('', data[i].BeatName, data[i].EmpName)
//                })
//                    .addTo(map)
//                    .bindPopup(`<div class="status-card">
//    <h4>QR Scanned</h4>
//    <div class="status-icons">
//        <div class="icon success">✓</div>
//        <div class="icon success">✓</div>
//        <div class="icon success">✓</div>
//        <div class="icon success">✓</div>
//        <div class="icon failure">✗</div>
//        <div class="icon success">✓</div>
//        <div class="icon failure">✗</div>
//        <div class="icon failure">✗</div>
//        <div class="icon failure">✗</div>
//        <div class="icon success">✓</div>
//    </div>
//</div>`, {
//                        offset: L.point(0, 20) 
//                    })
                   
//            }

            
//            if (latLngs.length > 0) {
//                var bounds = L.latLngBounds(latLngs);
//               map.fitBounds(bounds);  
//            }
//        },
//        error: function (error) {
//            console.log('Error fetching data:', error);
//        }
//    });
//}


// Function to create custom HTML icons for the markers
function createCustomMarker(avatarUrl, name, company) {
    return L.divIcon({
        className: '',
        html: `
        <style> 
 
    .status-card h4 {
        margin: 0;
        margin-bottom: 10px;
        font-size: 16px;
        color: #333;
    }
    .status-icons {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 8px;
    }
    .status-icons .icon {
        font-size: 20px;
        color: white;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
     
        border-radius: 50%;
    }
    .icon.success {
        background-color: #4CAF50; /* Green */
    }
    .icon.failure {
        background-color: #F44336; /* Red */
    }
        </style>
    <div class="custom-marker">
    <span>
       <i style="font-size:40px; color:red;" class="fa fa-location-dot"></i></span>
        
    </div>`,
        iconSize: [100, 100], // Icon size
        iconAnchor: [25, 50], // Positioning the icon
        popupAnchor: [0, -50], // Positioning the popup
    });
}

//<div class="marker-label">
//    <strong>${name}</strong><br>
//        ${company}
//</div>


//<div class="status-card">
//    <h4>QR Scanned</h4>
//    <div class="status-icons">
//        <div class="icon success">✓</div>
//        <div class="icon success">✓</div>
//        <div class="icon success">✓</div>
//        <div class="icon success">✓</div>
//        <div class="icon failure">✗</div>
//        <div class="icon success">✓</div>
//        <div class="icon failure">✗</div>
//        <div class="icon failure">✗</div>
//        <div class="icon failure">✗</div>
//        <div class="icon success">✓</div>
//    </div>
//</div>

function bindsite(id) {

    $.ajax({
        url: '/Admin/bindbeatwithroute',
        type: 'GET',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#beatid');
            dropdown.empty();
            dropdown.append($('<option></option>').attr('value', 0).text('Select Beat'));
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].locid).text(data[i].BeatName));
            }

        },
        error: function (error) {
            alert(error.massage);
        }
    })
}