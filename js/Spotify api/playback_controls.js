//To be placed on session page
//initialises spotify web player
//Add controls to:
    //start/stop => id="togglePlay"
    //next => id="next"
    //back => id="back"
    // document.getElementsByTagName("BODY")[0].addEventListener("load", startSpotify, false);
//document.body.addEventListener("load", startSpotify);


if (window.location.hash.replace("#access_token=","").split("&")[0]){
    console.log("yes");
    startSpotify();
}
function startSpotify() {
    var spotify_script = document.createElement('script');

    spotify_script.setAttribute('src','https://sdk.scdn.co/spotify-player.js');

    document.head.appendChild(spotify_script);

    var token = window.location.hash.replace("#access_token=","").split("&")[0];
    // token = token.replace("#access_token=","");
    // token = token.split("&")[0];
    console.log(token);
    
    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
            name: "WebApp Music Player",
            getOAuthToken: (cb) => {
            cb(token);
            },
            volume: 0.5,
        });
    
        // Player Ready
        player.addListener("ready", ({ device_id }) => {
            console.log("Ready with Device ID", device_id);
    
            // After player is ready, change current device to this player
            const connect_to_device = () => {
            console.log("Changing to device");
            let change_device = fetch("https://api.spotify.com/v1/me/player", {
                method: "PUT",
                body: JSON.stringify({
                device_ids: [device_id],
                play: false,
                }),
                headers: new Headers({
                Authorization: "Bearer " + token,
                }),
            }).then((response) => console.log(response));
            };
            connect_to_device();
        });
    
        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline", device_id);
        });
    
        // Error Handling
        player.addListener("initialization_error", ({ message }) => {
            console.error(message);
        });
        player.addListener("authentication_error", ({ message }) => {
            console.error(message);
        });
        player.addListener("account_error", ({ message }) => {
            console.error(message);
        });
    
        // Start device connection
        player.connect().then((success) => {
            if (success) {
            console.log("The Web Playback SDK successfully connected to Spotify!");
            }
        });
    
        // Toggle Play Button
        document.getElementById("togglePlay").onclick = function () {
            player.togglePlay();
        };
    
        document.getElementById('next').onclick = function next() {
                player.nextTrack();
        };
        
        document.getElementById('back').onclick = function() {
            player.previousTrack();
        };
        test();
    };
    async function set_playlist(){
        console.log("Getting Playlist");
        const response = await fetch("https://api.spotify.com/v1/me/playlists",
        {
            method: "GET",
            headers: new Headers({
            Authorization: "Bearer " + token,
            }),
        }
        )
        var data = await response.json();
        console.log(data);
        var uris = new Array;
        for(i in data.items){
            let name = data.items[i].name
            let uri = data.items[i].uri
            uri = uri.split(":")[2]
            console.log(name)
            const template = document.createElement('li');
            template.innerHTML = name;

            template.value = uri;
            template.id = uri;
            document.getElementById("playlists").appendChild(template);
            document.getElementById(uri).addEventListener("click",playplaylist);

            //Display playlists
            
            console.log(uri)
            uris.push(uri)
        }
        console.log(uris);
        return uris
    }
    
    
    //2. Get song uris from playlist uri
    //input:str playlist_uri
    //output: array[str song_uri]
    async function get_songs_from_playlist(playlist_uri){
        console.log("Getting Song From Playlist");
        const response = await 
        fetch("https://api.spotify.com/v1/playlists/"+playlist_uri+"/tracks",
            {
                method: "GET",
                headers: new Headers({
                Authorization: "Bearer " + token,
                }),
            })
        var data = await response.json();
        console.log(data);
        console.log(data.items[0].track.uri);
    
        var songs = new Array;
        for (i in data.items){
            songs.push(data.items[i].track.uri)
        }
        console.log(songs);
        return songs
    }
    
    
    //3.Play Song(s)
    //input:array[str uri]
    //output:
    function play_song(uri){
        console.log("Changing song");
        fetch(
            "https://api.spotify.com/v1/me/player/play",
            {
            method: "PUT",
            body: JSON.stringify({
                uris: uri,
            }),
            headers: new Headers({
                Authorization: "Bearer " + token,
            }),
            }
        )
        .then((data) => console.log(data));
        };
    
    async function test (){
        var playlist_uris = await set_playlist();
            console.log(playlist_uris);
        
    }  
    async function playplaylist(e){
        var uri = e.target.id
        var songs = await get_songs_from_playlist(uri);
        play_song(songs);
    }
        

}

//to be placed on session page

//1. Get playlist uris from user
//input:
//output: array[str playlist_uri]
