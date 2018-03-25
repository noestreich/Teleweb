var video = document.getElementById('video');
var hls = new Hls();
    
function playtv(streamId) {
    var stream = streams[streamId]
    $('#senderknopf').text(streamId);
    $('#senderknopf-sm').text(streamId);
    $('#'+streamId).addClass('active').siblings().removeClass('active');
    if (Hls.isSupported()) {
        hls.loadSource(stream);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
            var test = stream;
            return test;
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = stream;
        video.addEventListener('canplay', function() {
            video.play();
            var test = stream;
            return test;
        });
    }
}

//MUTE
$("video").prop('muted', true);

$("#mute-video").click(function() {
    if ($("video").prop('muted')) {
        $("video").prop('muted', false);
        $("#mute-video").html("Audio");
        $('#mute-video').addClass('btn-primary').removeClass('bg-dark');

    } else {
        $("video").prop('muted', true);
        $("#mute-video").html("<strike>Audio</strike>");
        $('#mute-video').addClass('bg-dark').removeClass('btn-primary');
    }
});

function leise(e) {
    if ((e.type == "keydown" && e.which == 77)) {
        if ($("video").prop('muted')) {
            $("video").prop('muted', false);
            $("#mute-video").html("Audio");
            $('#mute-video').addClass('btn-primary').removeClass('bg-dark');

        } else {
            $("video").prop('muted', true);
            $("#mute-video").html("<strike>Audio</strike>");
            $('#mute-video').addClass('bg-dark').removeClass('btn-primary');
        }
    }
}

$('body').keydown(leise);

function fullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.getElementById("video");
    if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}


function vollbild(e) {
    if ((e.type == "keydown" && e.which == 70)) {
        fullscreen();
    }
}
$('body').keydown(vollbild);


$("#fullscreen").click(function() {
    fullscreen();
});

function hochschalten(e) {
    if ((e.type == "keydown" && (e.which == 187 || e.which == 107 || e.which == 171)) || (e.type == "click")) {
        //alert( "Enter-schmenter" );
        var keys = Object.keys(streams);
        var jetzt = $('#senderknopf').text();
        var index = keys.indexOf(jetzt);
        var nextIndex = (index+1 > Object.keys(streams).length-1) ? 0 : index+1;
        var next = keys[nextIndex];
        playtv(next);
    } else if (e.type == "keydown" && e.which == 13) {
        alert("du hast enter gedrueckt");
    }
}

$('#hoch').click(hochschalten);
$('body').keydown(hochschalten);

function runterschalten(e) {
    if ((e.type == "keydown" && (e.which == 189 || e.which == 109 || e.which == 173)) || (e.type == "click")) {
        //alert( "Enter-schmenter" );
        var keys = Object.keys(streams);
        var jetzt = $('#senderknopf').text();
        var index = keys.indexOf(jetzt);
        var nextIndex = (index-1 < 0) ? Object.keys(streams).length-1 : index-1;
        var next = keys[nextIndex];
        playtv(next);
    } else if (e.type == "keydown" && e.which == 13) {
        alert("du hast enter gedrueckt");
    }
}

$('#runter').click(runterschalten);
$('body').keydown(runterschalten);

$(function() {
    for (var sender in streams)
    {
        $('.channelList').append('<button id="'+sender+'" type="button" class="btn-sm btn-primary btn-space sender active">'+sender+'</button>')
    }
    
    playtv('ARD');
    
    $('.sender').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        playtv($(this).text());
    })
});