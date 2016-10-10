map = {

    initMap: function(data) {

        var locations = data;

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 20,
            center: new google.maps.LatLng(-6.881694, 107.615820),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;
        var markerImage = '/images/marker.png';
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon: markerImage
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    var contentString = '<div class="info-window">' +
                        '<h3><b> Nomor Unit : '+locations[i][5]+'</b></h3>' +
                        '<div class="info-content">' +
                        '<p><b>Nama driver :</b> '+locations[i][4]+'<br />' +
                        '<b>Nomor Telepon :</b> '+locations[i][6]+'<br />' +
                        '<b>Lokasi Sekarang :</b> '+locations[i][0]+'<br />' +
                        '<b>Terakhir update lokasi : </b>'+locations[i][7]+'<br />' +
                        '</p>' +
                        '</div>' +
                        '</div>';
                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                    alert('asoy');

                }
            })(marker, i));
        }

        //--- fit bounding
        var latlng = [];
        for (var x = 0; x < locations.length; x++){
            latlng[x] = new google.maps.LatLng(locations[x][1], locations[x][2]);
        }

        var latlngbounds = new google.maps.LatLngBounds();
        for (var i = 0; i < latlng.length; i++) {
            latlngbounds.extend(latlng[i]);
        }
        map.fitBounds(latlngbounds);
        
        var contentString = '<div class="info-window">' +
                '<h3>shit</h3>' +
                '<div class="info-content">' +
                '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
                '</div>' +
                '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 400
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker)
        });

        var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];

        map.set('styles', styles);
    },

    startMap: function () {

        //google.maps.event.addDomListener(window, 'load', initMap);
    },
}