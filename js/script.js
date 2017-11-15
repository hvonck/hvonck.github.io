var channelId = 'UC8C7ncaMYnXyu-pRU0S9FLg';
var videoWidth = '100%';
var videoHeight = 'auto';
var maxVideoResults = 5;

var colors = [
  "red",
  "green",
  "blue"
];

$(document).ready(function(){
  $.get(
    "https://www.googleapis.com/youtube/v3/channels", {
      part: 'contentDetails',
      id: channelId,
      key: 'AIzaSyBj4NR2ccKANrB7X85GvG5pcfUyKlWyMus' },
      function(data){
        $.each(data.items, function(i, item){
          console.log(item);
          pId = item.contentDetails.relatedPlaylists.uploads;
          getVideos(pId);
        })
      }
  );

  function getVideos(pId) {
    $.get(
      "https://www.googleapis.com/youtube/v3/playlistItems", {
        part: 'snippet',
        maxResults: maxVideoResults,
        playlistId: pId,
        key: 'AIzaSyBj4NR2ccKANrB7X85GvG5pcfUyKlWyMus' },
        function(data){
          var output = '';
          $.each(data.items, function(i, item){
            console.log(item);
            videoTitle = item.snippet.title;
            videoId = item.snippet.resourceId.videoId;
            videoDescription = item.snippet.description;

            output += '<div width="50%" style="background-color: ' + colors[i % colors.length] + '">';
            output += '<h1>';
            output += videoTitle;
            output += '</h1>';
            output += '<iframe width="' + videoWidth + '" height="' + videoHeight + '" src=\"//www.youtube.com/embed/' + videoId + '\">';
            output += '</iframe>';
            output += '<pre>';
            output += '<b>Description:</b>\n';
            output += videoDescription;
            output += '</pre>';
            output += '</div>';

            $('#results').append(output);
          })
        }
    );
  }
});
