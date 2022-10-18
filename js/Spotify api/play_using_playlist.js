//to be placed on session page

//1. Get playlist uris from user
//input:
//output: array[str playlist_uri]
async function get_playlist(){
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
        console.log(name)
        //Display playlists
        uri = uri.split(":")[2]
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

