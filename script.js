document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.mood-btn');
  const songList = document.getElementById('song-list');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const mood = button.getAttribute('data-mood');
      getPlaylist(mood);
    });
  });

  function getPlaylist(mood) {
    // Example API call to Last.fm (you can use Spotify or any other music API)
    const apiKey = 'YOUR_LASTFM_API_KEY';  // You can replace this with your own API key from Last.fm or Spotify
    const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${mood}&api_key=${apiKey}&format=json`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        songList.innerHTML = ''; // Clear previous songs
        const songs = data.toptracks.track.slice(0, 5); // Show top 5 songs

        songs.forEach(song => {
          const li = document.createElement('li');
          li.innerHTML = `${song.name} by ${song.artist.name}`;
          songList.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching playlist:', error));
  }
});

