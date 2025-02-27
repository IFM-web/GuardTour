
$(document).ready(() => {
    $("#beatid").trigger("change")
    $("").val()

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
var baseLayers = {
    "OpenStreetMap": L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }),
    "Satellite": L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap France"
    }),
    "Terrain": L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenTopoMap"
    })
};

var map; // Declare map globally

function initializeMap() {
    // Remove existing map if it exists
    if (map) {
        map.off();
        map.remove();
    }

    var googleTerrain = L.tileLayer('https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 18,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    var googleSatellite = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 18,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    var googleStreets = L.tileLayer('https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 18,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    var baseLayers = {
        "Terrain": googleTerrain,
        "Satellite": googleSatellite,
        "Streets": googleStreets,
        "Hybrid": googleHybrid
    };

    map = L.map('map', {
        center: [28.6139, 77.209],
        zoom: 10,
        fullscreenControl: true 
    });

    L.control.layers(baseLayers).addTo(map);

    // Default layer
    googleTerrain.addTo(map);
}


initializeMap();


let lastindex = null;
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
            if (data.length != 0) {

        
            var latLngs = [];
            lastindex = data[data.length - 1].indexsequenace;
            for (var i = 0; i < data.length; i++) {
                var latLng = [data[i].latitude, data[i].longitude];
                latLngs.push(latLng);
            
                
                L.marker(latLng, {
                    icon: createCustomMarker(data[i].indexsequenace, data[i].BeatName, data[i].EmpName)
                })
                    .addTo(map)
                    .bindPopup(
                        `
                        <strong>Route Name :<span>${ data[i].RouteName }</span></strong><br>
                        <strong>Post Name :<span>${data[i].BeatName}</span></strong><br>
                         <strong>Is Checked :<span>${data[i].Checked}</span></strong><br>`,
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
            }
        },
        error: function (error) {
            console.log('Error fetching data:', error);
        }
    });
}

// User for create the marker on the map
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
       <i style="font-size:40px; color:${avatarUrl == 1 ? 'Green' : avatarUrl == lastindex ? 'Yellow' : 'red'};" class="fa fa-location-dot"></i></span>
        
    </div>`,
        iconSize: [100, 100], // Icon size
        iconAnchor: [25, 50], // Positioning the icon
        popupAnchor: [0, -50], // Positioning the popup
    });
}



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

$("#togglecheck").on("click", () => 
    checkmap()

);

const checkmap = () => {
    let value = $("#togglecheck").prop("checked") ? 1 : 0;
    if (value == 1) {
        setTimeout(() => {
            mapAction();
            checkmap()
        }, 5000)
    }
}