@extends('templates.template')
@section('title')
Selamat datang
@endsection
@section('css')
hr{
    border: solid 0.1px #D4D4D5 !important;
    height: 0.1px !important;
    opacity: 0.2 !important;
}
#map {
    height: 400px;
    width: 100%;
}
#panic-detail-waktu{
    color: #666666;
    opacity: 0.5;
}
@endsection
@section('body')

<div class="ui container">
    <div class="ui secondary pointing menu">
    <a class="active item" href="{{url('/')}}">
    <img src="{{url('/')}}/main/resources/assets/images/nelayan.png">
    {{--<h4>IDUN NELAYAN</h4>--}}
</a>

<div class="right menu">
@section('jquery')
$('.button')
    .popup({
        inline: true,
        hoverable  : true
    })
;
@endsection
<!--<a class="ui item button" data-tooltip="Add users to your feed" data-position="bottom right">
    <i class="alarm outline circular icon link"></i>
    Panic
    </a>-->

    <a class="ui item">
    <div class="ui button" style="background-color: orangered;color: white;font-weight: lighter;">
    <i class="alarm outline icon"></i>
    Panic
    </div>
    <div class="ui special popup">
    <div class="ui grid">
    <div class="sixteen wide column" style="font-size: smaller;">
<?php
    foreach ($panic as $panic) {
    echo $panic->username . "<br/><span id='panic-detail-waktu'>" . $panic->detail_waktu . "</span><hr/>";
    ?>
<?php
}
?>
</div>
</div>
</div>
</a>

</div>
</div>
<div class="ui segment">
    <div id="map">

    </div>
@section('js')
/*var markers = {!!$map_laporan!!}
 console.log("markernya: " + markers.length);

 var locations = [];

 for (var i = 0; i < markers.length; i++) {
 locations.push(i);
 }
 console.log("lokasinya: " + locations);*/


var location_panic = [
    ['Bondi Beach', -33.890542, 151.274856, 1]
];

var location_weather = [
    ['Coogee Beach', -33.923036, 151.259052, 1]
];

var location_keadaan_laut = [
    ['Cronulla Beach', -34.028249, 151.157507, 1]
];

var location_kejahatan = [
    ['Maroubra Beach', -33.950198, 151.259302, 1]
];

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: new google.maps.LatLng(-33.92, 151.25),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow_panic = new google.maps.InfoWindow();
    var infowindow_weather = new google.maps.InfoWindow();
    var infowindow_keadaan_laut = new google.maps.InfoWindow();
    var infowindow_kejahatan = new google.maps.InfoWindow();

    var marker_panic, marker_weather, marker_kejahatan, marker_keadaan_laut, i;

    for (i = 0; i < location_panic.length; i++) {
        marker_panic = new google.maps.Marker({
            position: new google.maps.LatLng(location_panic[i][1], location_panic[i][2]),
            map: map
        });
    }
    for (i = 0; i < location_weather.length; i++) {
        marker_weather = new google.maps.Marker({
            position: new google.maps.LatLng(location_weather[i][1], location_weather[i][2]),
            map: map
        });
    }
    for (i = 0; i < location_keadaan_laut.length; i++) {
        marker_keadaan_laut = new google.maps.Marker({
            position: new google.maps.LatLng(location_keadaan_laut[i][1], location_keadaan_laut[i][2]),
            map: map
        });
    }
    for (i = 0; i < location_kejahatan.length; i++) {
        marker_kejahatan = new google.maps.Marker({
            position: new google.maps.LatLng(location_kejahatan[i][1], location_kejahatan[i][2]),
            map: map
        });
    }

    marker_panic.setIcon('{{url(' / ')}}/main/resources/assets/images/markers/panic-marker.png');
    marker_weather.setIcon('{{url(' / ')}}/main/resources/assets/images/markers/weather-marker.png');
    marker_keadaan_laut.setIcon('{{url(' / ')}}/main/resources/assets/images/markers/keadaan-laut-marker.png');
    marker_kejahatan.setIcon('{{url(' / ')}}/main/resources/assets/images/markers/criminal-marker.png');

    google.maps.event.addListener(marker_panic, 'click', (function (marker, i) {
        return function () {
            infowindow_panic.setContent(location_panic[i][0]);
            infowindow_panic.open(map, marker_panic);
        }
    })(marker_panic, i));

    google.maps.event.addListener(marker_weather, 'click', (function (marker, i) {
        return function () {
            infowindow_panic.setContent(location_weather[i][0]);
            infowindow_panic.open(map, marker_weather);
        }
    })(marker_weather, i));


}
@endsection
</div>
<div class="ui grid">

    <div class="four wide column">
    <div class="ui card">
    <div class="content">
    <div class="header">
    <div class="ui grid">
    <div class="twelve wide column">
    Cuaca
    </div>
    <div class="four wide column" style="padding-top: 0.5em;">
    <i class="square icon big" style="color: #00B5AD;"></i>
    </div>
    </div>
    </div>
    </div>
    <div class="content">
<?php
    foreach ($cuaca as $cuaca){?>
<div class="ui grid">
        <div class="four wide column">
        <img src="<?php echo $cuaca->foto_source;?>"
class="ui small image"/>
        </div>
        <div class="twelve wide column">
        <span style="font-weight: bold;"><?php echo $cuaca->username;?></span>
    <br/>
    <span><?php echo $cuaca->jenis_cuaca;?></span>
    <br/>
    <span style="font-size: smaller"><?php echo $cuaca->keterangan;?></span>
    <br/>
    <span style="color: #666666;opacity: 0.5;font-size: smaller;"><?php echo $cuaca->detail_waktu;?></span>
    </div>
    </div>
    <?php }?>
</div>
</div>
</div>
<div class="four wide column">
    <div class="ui card">
    <div class="content">
    <div class="header">
    <div class="ui grid">
    <div class="twelve wide column">
    Keadaan Laut
</div>
<div class="four wide column" style="padding-top: 0.5em;">
    <i class="square icon big" style="color: #F89406;"></i>
    </div>
    </div>
    </div>
    </div>
    <div class="content">
<?php
    foreach ($keadaan_laut as $keadaan_laut){?>
<div class="ui grid">
        <div class="four wide column">
        <img src="<?php echo $keadaan_laut->foto_source;?>"
class="ui small image"/>
        </div>
        <div class="twelve wide column">
        <span style="font-weight: bold;"><?php echo $keadaan_laut->username;?></span>
    <br/>
    <span><?php echo $keadaan_laut->jenis_ombak;?></span>
    <br/>
    <span style="font-size: smaller"><?php echo $keadaan_laut->keterangan;?></span>
    <br/>
    <span style="color: #666666;opacity: 0.5;font-size: smaller;"><?php echo $keadaan_laut->detail_waktu;?></span>
    </div>
    </div>
    <?php }?>
</div>
</div>
</div>
<div class="four wide column">
    <div class="ui card">
    <div class="content">
    <div class="header">
    <div class="ui grid">
    <div class="twelve wide column">
    Kejahatan
    </div>
    <div class="four wide column" style="padding-top: 0.5em;">
    <i class="square icon big" style="color: #BF55EC;"></i>
    </div>
    </div>
    </div>
    </div>
    <div class="content">
<?php
    foreach ($kejahatan as $kejahatan){?>
<div class="ui grid">
        <div class="four wide column">
        <img src="<?php echo $kejahatan->foto_source;?>"
class="ui small image"/>
        </div>
        <div class="twelve wide column">
        <span style="font-weight: bold;"><?php echo $kejahatan->username;?></span>
    <br/>
    <span style="font-size: smaller"><?php echo $kejahatan->keterangan;?></span>
    <br/>
    <span style="color: #666666;opacity: 0.5;font-size: smaller;"><?php echo $kejahatan->detail_waktu;?></span>
    </div>
    </div>
    <?php }?>
</div>
</div>
</div>
<div class="four wide column">
    <div class="ui card">
    <div class="content">
    <div class="header">
    <div class="ui grid">
    <div class="twelve wide column">
    Detail Tangkapan
</div>
<div class="four wide column" style="padding-top: 0.5em;">
    <i class="square icon big" style="color: #87D37C;"></i>
    </div>
    </div>
    </div>
    </div>
    <div class="content">
<?php
    foreach ($tangkapan as $tangkapan){?>
<div class="ui grid">
        <div class="four wide column">
        <img src="<?php echo $tangkapan->foto_source;?>"
class="ui small image"/>
        </div>
        <div class="twelve wide column">
        <span style="font-weight: bold;"><?php echo $tangkapan->username;?></span>
    <br/>
    <span style="font-size: smaller"><?php echo $tangkapan->keterangan;?></span>
    <br/>
    <span style="color: #666666;opacity: 0.5;font-size: smaller;"><?php echo $tangkapan->detail_waktu;?></span>
    </div>
    </div>
    <?php }?>
</div>
</div>
</div>
<!--<div class="four wide column">
    <div class="ui card">
    <div class="content">
    <div class="header">Laporan Keseluruhan</div>
</div>
<div class="content">
<?php
    foreach ($laporan as $laporan){
    ?>
<div class="ui grid">
        <div class="sixteen wide column">
        <span style="font-weight: bold;"><?php echo $laporan->username;?></span>
    <br/>
    <span>
    <?php
    switch ($laporan->jenis_laporan) {
        case 1:
            echo "Kejahatan";
            break;
        case 2:
            echo "Cuaca";
            break;
        case 3:
            echo "Keadaan Laut";
            break;
        case 4:
            echo "Panic Button";
            break;
        case 5:
            echo "Hasil Tangkapan";
            break;
    }
    ?>
</span>
    <br/>
    <span style="color: #666666;opacity: 0.5;font-size: smaller;"><span
    style="font-weight: bold;"><?php echo $laporan->detail_waktu;?></span></span>


    </div>
    </div>
    <hr/>
    <?php
}
?>
</div>
</div>
</div>

</div>

</div>-->
@endsection
