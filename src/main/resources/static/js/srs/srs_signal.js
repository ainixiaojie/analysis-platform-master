    var sig = null;
    var publisher = null;
    var player = null;
    var control_refresh_peer = null;
    var control_alert_peer = null;
    $(function(){
        console.log('?wss=x to specify the websocket schema, ws or wss');
        console.log('?wsh=x to specify the websocket server ip');
        console.log('?wsp=x to specify the websocket server port');
        console.log('?host=x to specify the SRS server');
        console.log('?room=x to specify the room to join');
        console.log('?display=x to specify your nick name');

        var startDemo = async function () {
            var host = $('#txt_host').val();
            var room = $('#txt_room').val();
            var display = $('#txt_display').val();

            // Connect to signaling first.
            if (sig) {
                sig.close();
            }
            sig = new SrsRtcSignalingAsync();
            sig.onmessage = function (msg) {
                console.log('Notify: ', msg);

                if (msg.event === 'leave') {
                    $('#player').hide();
                }

                if (msg.event === 'publish') {
                    if (msg.peer && msg.peer.publishing && msg.peer.display !== display) {
                        startPlay(host, room, msg.peer.display);
                    }
                }

                if (msg.event === 'control') {
                    if (msg.param === 'refresh') {
                        setTimeout(function () {
                            window.location.reload();
                        }, 500);
                    } else if (msg.param === 'alert') {
                        alert('From ' + msg.peer.display + ': ' + msg.data);
                    }
                }

                if (msg.participants.length >= 2) {
                    $('.srs_merge').show();
                } else {
                    $('.srs_merge').hide();
                }
            };
            await sig.connect(conf.wsSchema, conf.wsHost, room, display);

            control_refresh_peer = async function () {
                let r1 = await sig.send({action:'control', room:room, display:display, call:'refresh'});
                console.log('Signaling: control peer to refresh ok', r1);
            };
            control_alert_peer = async function () {
                let r1 = await sig.send({action:'control', room:room, display:display, call:'alert', data:$('#txt_alert').val()});
                console.log('Signaling: control peer to alert ok', r1);
            };

            let r0 = await sig.send({action:'join', room:room, display:display});
            console.log('Signaling: join ok', r0);

            // For one to one demo, alert and ignore when room is full.
            if (r0.participants.length > 2) {
                alert('Room is full, already ' + (r0.participants.length - 1) + ' participants');
                sig.close();
                return;
            }

            // Start publish media if signaling is ok.
            await startPublish(host, room, display);
            let r1 = await sig.send({action:'publish', room:room, display:display});
            console.log('Signaling: publish ok', r1);

            // Play the stream already in room.
            r0.participants.forEach(function(participant) {
                if (participant.display === display || !participant.publishing) return;
                startPlay(host, room, participant.display);
            });

            if (r0.participants.length >= 2) {
                $('.srs_merge').show();
            }
        };

        var startPublish = function (host, room, display) {
            $(".ff_first").each(function(i,e) {
                $(e).text(display);
            });

            var url = 'webrtc://' + host + '/' + room + '/' + display + conf.query;
            $('#rtc_media_publisher').show();
            $('#publisher').show();

            if (publisher) {
                publisher.close();
            }
            publisher = new SrsRtcPublisherAsync();
            $('#rtc_media_publisher').prop('srcObject', publisher.stream);

            return publisher.publish(url).then(function(session){
                $('#self').text('Self: ' + url);
            }).catch(function (reason) {
                publisher.close();
                $('#rtc_media_publisher').hide();
                console.error(reason);
            });
        };

        var startPlay = function (host, room, display) {
            $(".ff_second").each(function(i,e) {
                $(e).text(display);
            });

            var url = 'webrtc://' + host + '/' + room + '/' + display + conf.query;
            $('#rtc_media_player').show();
            $('#player').show();

            if (player) {
                player.close();
            }

            player = new SrsRtcPlayerAsync();
            $('#rtc_media_player').prop('srcObject', player.stream);

            player.play(url).then(function(session){
                $('#peer').text('Peer: ' + display);
                $('#rtc_media_player').prop('muted', false);
            }).catch(function (reason) {
                player.close();
                $('#rtc_media_player').hide();
                console.error(reason);
            });
        };

        // Pass-by to SRS url.
        let conf = SrsRtcSignalingParse(window.location);
        $('#txt_host').val(conf.host);
        conf.room && $('#txt_room').val(conf.room);
        $('#txt_display').val(conf.display);

        $(".ff_host").each(function(i,e) {
            $(e).text(conf.host);
        });
        $(".ff_app").each(function(i,e) {
            $(e).text($('#txt_room').val());
        });
        $('#ff_preview').attr('href', 'http://ossrs.net/players/srs_player.html?app=' + $('#txt_room').val() + '&stream=merge.flv&server=' + conf.host + '&vhost=' + conf.host + '&autostart=true');

        // Update href for all navs.
        $('ul.srs_nav').children('li').not('.srs_ignore').children('a').each(function (i, e) {
            $(e).attr('href', $(e).attr('href') + conf.rawQuery);
        });

        $('#btn_apply').click(function () {
            if ($('#txt_wx_video_tcurl').val() !== '' && $('#txt_wx_video_stream').val() !== '') {
                $('#ff_wxvideo').text('"' + $('#txt_wx_video_tcurl').val() + $('#txt_wx_video_stream').val() + '"').show();
                $('#ff_output').hide();
                $('#ff_preview').parent().hide();
            } else {
                $('#ff_wxvideo').hide();
                $('#ff_output').show();
                $('#ff_preview').parent().show();
            }
        });

        $("#btn_start").click(startDemo);
        // Never play util windows loaded @see https://github.com/ossrs/srs/issues/2732
        if (conf.autostart) {
            window.addEventListener("load", function(){ startDemo(); });
        }
    });