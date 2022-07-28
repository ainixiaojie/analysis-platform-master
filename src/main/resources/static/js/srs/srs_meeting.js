    var sig = null;
    var publisher = null;
    var players = {}; // Key is display, value is a player object.
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

                // Subscribe if new user start to publish.
                if (msg.event === 'publish') {
                    if (msg.peer && msg.peer.publishing && msg.peer.display !== display) {
                        startPlay(host, room, msg.peer.display);
                    }
                }

                // Remove dead players.
                if (msg.event === 'join' || msg.event === 'leave') {
                    $.each(players, function(k, obj) {
                        let stillAlive = false;
                        msg.participants.forEach(function (participant) {
                            if (participant.display === k) stillAlive = true;
                        });

                        if (!stillAlive) {
                            obj.player.close();
                            obj.ui.remove();
                        }
                    });
                }
            };
            await sig.connect(conf.wsSchema, conf.wsHost, room, display);

            let r0 = await sig.send({action:'join', room:room, display:display});
            console.log('Signaling: join ok', r0);

            // Start publish media if signaling is ok.
            await startPublish(host, room, display);
            let r1 = await sig.send({action:'publish', room:room, display:display});
            console.log('Signaling: publish ok', r1);

            // Play the stream already in room.
            r0.participants.forEach(function(participant) {
                if (participant.display === display || !participant.publishing) return;
                startPlay(host, room, participant.display);
            });
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

            // Remove exists.
            if (players[display]) {
                players[display].ui.remove();
                players[display].player.close();
            }

            // Clone a player from template.
            let ui = $('#player').clone().attr('id', 'player-' + display);
            let video = ui.children('#rtc_media_player');
            console.log(video.length);
            let player = new SrsRtcPlayerAsync();

            players[display] = {ui:ui, video:video, player:player};
            $('.srs_players').append(ui);

            // Start play for this user.
            var url = 'webrtc://' + host + '/' + room + '/' + display + conf.query;
            video.show();
            ui.show();

            video.prop('srcObject', player.stream);

            player.play(url).then(function(session){
                ui.children('#peer').text('Peer: ' + url);
                video.prop('muted', false);
            }).catch(function (reason) {
                player.close();
                video.hide();
                console.error(reason);
            });
        };

        // Pass-by to SRS url.
        let conf = SrsRtcSignalingParse(window.location);
        $('#txt_host').val(conf.host);
        conf.room && $('#txt_room').val(conf.room);
        $('#txt_display').val(conf.display);

        // Update href for all navs.
        $('ul.srs_nav').children('li').not('.srs_ignore').children('a').each(function (i, e) {
            $(e).attr('href', $(e).attr('href') + conf.rawQuery);
        });

        $("#btn_start").click(startDemo);
        // Never play util windows loaded @see https://github.com/ossrs/srs/issues/2732
        if (conf.autostart) {
            window.addEventListener("load", function(){ startDemo(); });
        }
    });