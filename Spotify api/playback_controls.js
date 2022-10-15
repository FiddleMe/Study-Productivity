//To be placed on session page
//initialises spotify web player
//Add controls to:
    //start/stop => id="togglePlay"
    //next => id="next"
    //back => id="back"
//add <script src="https://sdk.scdn.co/spotify-player.js"></script> above
var token = window.location.hash;
token = token.replace("#access_token=","");
token = token.split("&")[0];

console.log(token);
var urlParams = new URLSearchParams(window.location.search);
const state = urlParams.get('state');
if (stateKey == state){
    console.log("grant access");
}

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

    document.getElementById('next').onclick = function() {
            player.nextTrack();
    };
    
    document.getElementById('back').onclick = function() {
        player.previousTrack();
    };

};