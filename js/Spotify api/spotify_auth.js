//to be placed on wherever start session is
//authenticate on click of id="auth"

//to be changed to session page's url
//personal note: remember to add to spotify's app dashboard
const redirect_uri = "http://127.0.0.1:5501/index.html#";
//

const client_id = "8829529abdc04af28a7fbc4428d376b6";
const scopes = "user-library-read user-read-email user-read-private user-read-playback-state playlist-read-private user-follow-read user-read-currently-playing user-read-playback-position streaming user-read-recently-played user-top-read user-modify-playback-state playlist-read-collaborative";
var url = "https://accounts.spotify.com/authorize";
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scopes);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
console.log(url);
document.getElementById("auth").addEventListener("click", function(){location.assign(url)});
