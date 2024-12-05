document.addEventListener("DOMContentLoaded", () => {
    const shuffleButton = document.querySelectorAll('.player-control-icons')[0];
    const prevButton = document.querySelectorAll('.player-control-icons')[1];
    const playButton = document.querySelectorAll('.player-control-icons')[2];
    const nextButton = document.querySelectorAll('.player-control-icons')[3];
    const loopButton = document.querySelectorAll('.player-control-icons')[4];  
    const progressBar = document.querySelector('.progress-bar');
    const currTime = document.querySelector('.curr-time');
    const totTime = document.querySelector('.tot-time');
    const volumeControl = document.querySelector('.vol-rnge');
    let currentSongIndex = 0;

    const audioPlayer = document.getElementById('audioPlayer');
   

    const songs = [
        { title: "Namo Namo", artist: "Amit Trivedi", src: "./songs/song9.mp3" },
        { title: "Are Dwarpaalo", artist: "Ram Kumar Lakha", src: "./songs/song1.mp3" },
        { title: "Chhoti Chhoti Gaiya Chhote Chhote Gwal", artist: "Mridul Krishan Shastri", src :"./songs/song3.mp3"},
        { title: "Radhika Gori Se", artist: "Jaya Kishori", src: "./songs/song4.mp3" },
        { title: "Sham Savere Dekhu Tumko Kitna Sundar Roop Ha", artist: "VATS RECORDS BHAKTI", src: "./songs/song5.mp3" },
        { title: "Meri Lagi Shyam Sang Preet", artist: "Devi Chitralekha", src: "./songs/song6.mp3" },
        { title: "Banke Bihari ki dekh chavi", artist: "Gaurav Krishna Goswami", src: "./songs/song7.mp3" },
        { title: "Teri Banki Ada ne", artist: "Gaurav Krishna Goswami", src: "./songs/song8.mp3" },
        { title: "Kishori Kuch Aisa", artist: "Gaurav Krishna Goswami", src: "./songs/song10.mp3" },
        { title: "Barsane Wali Radhe", artist: "Gaurav Krishna Goswami", src: "./songs/song13.mp3" }
    ];

    audioPlayer.src = songs[currentSongIndex].src;

    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.classList.add('playing');
        } else {
            audioPlayer.pause();
            playButton.classList.remove('playing');
        }
    });


    loopButton.addEventListener('click', () => {
        console.log("Loop Button is Clicked");
    });


    shuffleButton.addEventListener('click', () => {
        console.log("Shuffle Button is Clicked");
    });


    audioPlayer.addEventListener('timeupdate', () => {
        if (!isNaN(audioPlayer.duration)) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.value = progress;
            progressBar.style.backgroundSize = `${progress}% 100%`;
    
            
            const minutes = Math.floor(audioPlayer.currentTime / 60);
            const seconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');
            currTime.textContent = `${minutes}:${seconds}`;
    
            
            const totMinutes = Math.floor(audioPlayer.duration / 60);
            const totSeconds = Math.floor(audioPlayer.duration % 60).toString().padStart(2, '0');
            totTime.textContent = `${totMinutes}:${totSeconds}`;
        }
    });
    

    progressBar.addEventListener('input', (e) => {
        const seekTime = (e.target.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    
    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
    });

    
    const songCards = document.querySelectorAll('.card');
    songCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentSongIndex = index % songs.length;
            audioPlayer.src = songs[currentSongIndex].src;
            audioPlayer.play();
            playButton.src = './assets/pause_icon.png';
            updateSongInfo();
        });
    });

    
    function updateSongInfo() {
        const albumInfo = document.querySelector('.album-info');
        albumInfo.querySelector('h5').textContent = songs[currentSongIndex].title;
        albumInfo.querySelector('p').textContent = songs[currentSongIndex].artist;
    }

    

    
    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        audioPlayer.src = songs[currentSongIndex].src;
        audioPlayer.play();
        
        updateSongInfo();
    });

    
    prevButton.addEventListener('click',()=>{
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        audioPlayer.src = songs[currentSongIndex].src;
        audioPlayer.play();
        
        updateSongInfo();
    })


    
    audioPlayer.addEventListener('ended', () => {
        playButton.classList.remove('playing');
        progressBar.value = 0;
        progressBar.style.backgroundSize = '0% 100%';
    });
    ;

    
    const sidebar = document.querySelector('.sidebar');
    window.addEventListener('resize', () => {
        sidebar.style.display = window.innerWidth <= 1025 ? 'none' : 'block';
    });

    // Initial update
    updateSongInfo();
}); 