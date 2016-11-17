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
var markers = {!! $map_laporan !!}
console.log(markers.length);
var locations = [];

for(var i = 0 ; i < markers.length ; i++){
    locations.push(i);
}
console.log(locations);


var locations = [
    ['Bondi Beach', -6.4925083, 107.61, 4],
    ['Coogee Beach', -33.923036, 151.259052, 5],
    ['Cronulla Beach', -34.028249, 151.157507, 3],
    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    ['Maroubra Beach', -33.950198, 151.259302, 1]
];

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: new google.maps.LatLng(-6.4925083, 107.61),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

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
