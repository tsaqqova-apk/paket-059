const bagianutamaaudio = document.querySelector(".bagianutamaaudio"),
musicName = bagianutamaaudio.querySelector(".name"),
musicArtist = bagianutamaaudio.querySelector(".artist"),
playPauseBtn = bagianutamaaudio.querySelector(".play-pause"),
prevBtn = bagianutamaaudio.querySelector("#prev"),
nextBtn = bagianutamaaudio.querySelector("#next"),
mainAudio = bagianutamaaudio.querySelector("#main-audio"),
progressArea = bagianutamaaudio.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = bagianutamaaudio.querySelector(".sektordaftarisiaudio"),
tutupBagianAudio = bagianutamaaudio.querySelector("#tutupbagianaudioplayer");
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;
window.addEventListener("load", ()=>{
	loadMusic(musicIndex);
	playingSong();
	berikanbatasbawahcustom();
});
function loadMusic(indexNumb){
	musicName.innerText = allMusic[indexNumb - 1].name;
	musicArtist.innerText = allMusic[indexNumb - 1].artist;
	mainAudio.src = `${jalur_pemuatan_audio}${allMusic[indexNumb - 1].src}.mp3`;
}

function bacaDurasi(index){
	let src = allMusic[index].src;
	let span = document.getElementById(
		`durasi-${src}`
	);
	let audio = new Audio();
	audio.preload = "metadata";
	audio.src = `${jalur_pemuatan_audio}${src}.mp3`;

    audio.onloadedmetadata = function(){

        let menit =
            Math.floor(audio.duration/60);

        let detik =
            Math.floor(audio.duration%60);

        if(detik<10)
            detik="0"+detik;

        let hasil =
            `${menit}:${detik}`;

        span.innerText = hasil;

        span.setAttribute(
            "t-duration",
            hasil
        );



    };

}





/* Play Music Function */
function playMusic(){
	bagianutamaaudio.classList.add("paused");
	playPauseBtn.querySelector("i").innerText = "pause";
	mainAudio.play();
}
/* Pause Music Function */
function pauseMusic(){
	bagianutamaaudio.classList.remove("paused");
	playPauseBtn.querySelector("i").innerText = "play_arrow";
	mainAudio.pause();
}
/* Prev Music Function */
function prevMusic(){
	/* Decrement of musicIndex by 1 */
	musicIndex--;
	/* If musicIndex is less than 1 then musicIndex will be the array length so the last music play. */
	musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
	bacaDurasi(musicIndex-1);

	loadMusic(musicIndex);

	playMusic();

	playingSong();
}
/* Next Music Function */
function nextMusic(){
	/* Increment of musicIndex by 1 */
	musicIndex++;
	/* If musicIndex is greater than array length then musicIndex will be 1 so the first music play. */
	musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
	bacaDurasi(musicIndex-1);

	loadMusic(musicIndex);

	playMusic();

	playingSong();
}
/* Play or Pause Button Event */
playPauseBtn.addEventListener("click", ()=>{
	const isMusicPlay = bagianutamaaudio.classList.contains("paused");
	/* If isPlayMusic is true then call pauseMusic else call playMusic. */
	isMusicPlay ? pauseMusic() : playMusic();
	playingSong();
});
/* Prev Music Button Event */
prevBtn.addEventListener("click", ()=>{
	prevMusic();
});
/* Next Music Button Event */
nextBtn.addEventListener("click", ()=>{
	nextMusic();
});
/* Update progress bar width according to music current time! */
mainAudio.addEventListener("timeupdate", (e)=>{
	/* Getting playing song currentTime! */
	const currentTime = e.target.currentTime;
	/* Getting playing song total duration! */
	const duration = e.target.duration;
	let progressWidth = (currentTime / duration) * 100;
	progressBar.style.width = `${progressWidth}%`;
	let musicCurrentTime = bagianutamaaudio.querySelector(".current-time"),
	musicDuartion = bagianutamaaudio.querySelector(".max-duration");


	/* Update playing song current time! */
	let currentMin = Math.floor(currentTime / 60);
	let currentSec = Math.floor(currentTime % 60);
	/* If sec is less than 10 then add 0 before it! */
	if(currentSec < 10){
		currentSec = `0${currentSec}`;
	}
	musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});





mainAudio.addEventListener("loadeddata",()=>{

    let musicDuartion =
        bagianutamaaudio.querySelector(".max-duration");

    let menit =
        Math.floor(mainAudio.duration/60);

    let detik =
        Math.floor(mainAudio.duration%60);

    if(detik<10)
        detik="0"+detik;

    musicDuartion.innerText=
        `${menit}:${detik}`;

});





/* Update playing song currentTime on according to the progress bar width! */
progressArea.addEventListener("click", (e)=>{
	/* Getting width of progress bar! */
	let progressWidth = progressArea.clientWidth;
	/* Getting offset x value! */
	let clickedOffsetX = e.offsetX;
	/* Getting song total duration! */
	let songDuration = mainAudio.duration;
	mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
	/* Calling playMusic function! */
	playMusic();
	playingSong();
});
/* Change loop, shuffle, repeat icon onclick! */
const repeatBtn = bagianutamaaudio.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
	/* Getting this tag innerText! */
	let getText = repeatBtn.innerText;
	switch(getText){
		case "repeat":
			repeatBtn.innerText = "repeat_one";
			repeatBtn.setAttribute("title", "Song looped");
			break;
		case "repeat_one":
			repeatBtn.innerText = "shuffle";
			repeatBtn.setAttribute("title", "Playback shuffled");
			break;
		case "shuffle":
			repeatBtn.innerText = "repeat";
			repeatBtn.setAttribute("title", "Playlist looped");
			break;
	}
});
/* Code for What to Do After Song Ended */
mainAudio.addEventListener("ended", ()=>{
	/* We'll do according to the icon means if user has set icon to loop song then we'll repeat the current song and will do accordingly. */
	/* Getting this tag innerText! */
	let getText = repeatBtn.innerText;
	switch(getText){
		case "repeat":
			/* Calling nextMusic function! */
			nextMusic();
			break;
		case "repeat_one":
			/* Setting audio current time to 0! */
			mainAudio.currentTime = 0;
			/* Calling loadMusic function with argument, in the argument there is a index of current song! */
			loadMusic(musicIndex);
			/* Calling playMusic function! */
			playMusic();
			break;
		case "shuffle":
			/* Genereting random index/numb with max range of array length. */
			let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
			do{
				randIndex = Math.floor((Math.random() * allMusic.length) + 1);
			/* This loop run until the next random number won't be the same of current musicIndex. */
			}while(musicIndex == randIndex);
			/* Passing randomIndex to musicIndex! */
			musicIndex = randIndex;
			loadMusic(musicIndex);
			playMusic();
			playingSong();
			break;
	}
});
/* Show music list onclick of music icon! */
tutupBagianAudio.addEventListener("click", ()=>{

	location.href = "https://play.google.com/store/apps/dev?id=7855387885472827190";
});
const ulTag = bagianutamaaudio.querySelector("ul");
/* Let create li tags according to array length for list! */
for (let i = 0; i < allMusic.length; i++) {
	/* Let's pass the song name, artist from the array! */
	let liTag = `<li li-index="${i + 1}">
					<div class="row">
						<span>${allMusic[i].name}</span>
						
					</div>
					<span id="durasi-${allMusic[i].src}" class="audio-duration"><a style="font-size: 20px;font-family: 'Material Icons';">volume_up</a></span>
					
				</li>`;
	/* Inserting the li inside ul tag! */
	ulTag.insertAdjacentHTML("beforeend", liTag);
}

/* Play particular song from the list onclick of li tag! */
function playingSong(){
	const allLiTag = ulTag.querySelectorAll("li");
	for (let j = 0; j < allLiTag.length; j++) {
		let audioTag = allLiTag[j].querySelector(".audio-duration");
		if(allLiTag[j].classList.contains("playing")){
			allLiTag[j].classList.remove("playing");
			let adDuration = audioTag.getAttribute("t-duration");
			audioTag.innerText = adDuration;
		}
		/* If the li tag index is equal to the musicIndex then add playing class in it! */
		if(allLiTag[j].getAttribute("li-index") == musicIndex){
			allLiTag[j].classList.add("playing");
			audioTag.innerText = "Playing";
		}
		allLiTag[j].setAttribute("onclick", "clicked(this)");
	}
}
/* Particular li Clicked Function */
function clicked(element){
	let getLiIndex = element.getAttribute("li-index");
	/* Updating Current Song index with Clicked li index */
	musicIndex = getLiIndex;
	bacaDurasi(musicIndex-1);
	loadMusic(musicIndex);
	playMusic();
	playingSong();
	/* Sesuaikan kembali batas bawah otomatis! */
	berikanbatasbawahcustom();
}
/* Fungsi Mengatur Batas Bawah Daftar Putar Audio */
function berikanbatasbawahcustom() {
	var elemenyangkitatiru = document.getElementById("sektorpengontrolaudioid");
	var elemenyangdituju = document.getElementsByClassName("sektordaftarisiaudio");
	for (var i = 0; i < elemenyangdituju.length; i++) {
		var tinggielemenyangditiru = elemenyangkitatiru.offsetHeight;
		elemenyangdituju[i].style.bottom = tinggielemenyangditiru + "px";
		/*elemenyangdituju[i].style.paddingBottom = tinggielemenyangditiru + "px";*/
	}
	/* Kode untuk Menutup Elemen Splash Screen Penutup Saat Loading */
	document.getElementById("satirpenutupsaatloadingid").hidden = true;
}


/* PENTING !!!!!!!! */
/* Tambahan Menghadapi Next-Gen SDK */
function sinkronkanTampilanPlayer() {
    if (mainAudio.paused) {
        bagianutamaaudio.classList.remove("paused");
        playPauseBtn.querySelector("i").innerText = "play_arrow";
    } else {
        bagianutamaaudio.classList.add("paused");
        playPauseBtn.querySelector("i").innerText = "pause";
    }
}
mainAudio.addEventListener("pause", () => {
    sinkronkanTampilanPlayer();
});

mainAudio.addEventListener("play", () => {
    sinkronkanTampilanPlayer();
});