const hymn = document.getElementById("hymn");
const restartBtn = document.getElementById("restart");
const forward = document.getElementById("forward");
const rewind = document.getElementById("rewind");
const loop = document.getElementById("loop");
const instrumental = document.getElementById("instrumental");

function updateLyrics() {
  const currentTime = hymn.currentTime;
  const currentLine = document.getElementById("current-line");
  const prevPrevLine = document.getElementById("prev-prev-line");
  const prevLine = document.getElementById("prev-line");
  const nextLine = document.getElementById("next-line");
  const nextNextLine = document.getElementById("next-next-line");

  const lyrics = [
    { time: 0, text: "[Instrumental]" },
    { time: 9, text: "Sintang paaralan, tanglaw ka ng bayan" },
    { time: 15, text: "Pandayan ng isip ng kabataan" },
    { time: 22, text: "Kami ay lumaki nang salat sa yaman" },
    { time: 27, text: "Hanap na dunong ay iyong alay" },
    { time: 33, text: "Ang layunin mong makatao" },
    { time: 38, text: "Dinarangal ng Pilipino" },
    { time: 44, text: "Ang iyong aral, diwa, adhikang taglay" },
    { time: 51, text: "PUP, aming gabay" },
    { time: 53, text: "Paaralang dakila" },
    { time: 59, text: "PUP, pinagpala!" },
    { time: 65, text: "Gagamitin ang karunungan" },
    { time: 71, text: "Mula sa'yo, para sa bayan" },
    { time: 78, text: "Ang iyong aral, diwa, adhikang taglay" },
    { time: 84, text: "PUP, aming gabay" },
    { time: 87, text: "Paaralang dakila" },
    { time: 93, text: "PUP, pinagpala!" },
    { time: 101, text: "[End of Hymn]" }
  ];

  let isLyricChanged = null;

  for (let i = 0; i < lyrics.length; i++) {
    const lyric = lyrics[i];

    if (
      lyric.time === Math.floor(currentTime) &&
      Math.floor(currentTime) !== 0
    ) {
      isLyricChanged = lyric;
      break;
    }
  }

  if (isLyricChanged) {
    currentLine.classList.add("push-up");
    prevLine.classList.add("push-down");
  } else {
    currentLine.classList.remove("push-up");
    prevLine.classList.remove("push-down");
  }

  // Clear previous lines if current time is behind over them

  if (currentTime < lyrics[2].time) {
    prevPrevLine.innerText = "";
  }

  if (currentTime < lyrics[1].time) {
    prevLine.innerText = "";
  }

  // Clear next lines if current time is ahead over them

  if (currentTime >= lyrics[lyrics.length - 1].time) {
    nextLine.innerText = "";
  }

  if (currentTime >= lyrics[lyrics.length - 2].time) {
    nextNextLine.innerText = "";
  }

  for (let idx = 0; idx < lyrics.length; idx++) {
    // Setting previous of previous line
    if (currentTime >= lyrics[idx].time && idx > 1) {
      prevPrevLine.innerText = lyrics[idx - 2].text;
    }

    // Setting previous line
    if (currentTime >= lyrics[idx].time && idx !== 0) {
      prevLine.innerText = lyrics[idx - 1].text;
    }

    // Setting current line
    if (currentTime >= lyrics[idx].time) {
      currentLine.innerText = lyrics[idx].text;
    }

    // Setting next line
    if (
      currentTime >= lyrics[idx].time &&
      currentTime < lyrics[lyrics.length - 1].time
    ) {
      nextLine.innerText = lyrics[idx + 1].text;
    }

    // Setting next of next line
    if (
      currentTime >= lyrics[idx].time &&
      currentTime < lyrics[lyrics.length - 2].time
    ) {
      nextNextLine.innerText = lyrics[idx + 2].text;
    }
  }
}

function handlePlayPUPHymn() {
  const titleBlock = document.getElementById("title-block");
  const lyricsBlock = document.getElementById("lyrics");
  const tab = document.getElementById("status-tab");
  const cd = document.getElementById("rotating-cd");

  titleBlock.classList.remove("max-height");
  lyricsBlock.style.display = "flex";
  tab.innerText = "Now Playing";
  cd.style.animationName = "rotating";
}

function handlePausePUPHymn() {
  const tab = document.getElementById("status-tab");
  const cd = document.getElementById("rotating-cd");
  tab.innerText = "Paused Playing";
  cd.style.animationName = "unset";
}

function handleEndPUPHymn() {
  const titleBlock = document.getElementById("title-block");
  const lyricsBlock = document.getElementById("lyrics");
  const tab = document.getElementById("status-tab");
  const cd = document.getElementById("rotating-cd");

  titleBlock.classList.add("max-height");
  lyricsBlock.style.display = "none";
  cd.style.animationName = "unset";
  tab.innerText = "Ended";
}

function handleRestart() {
  hymn.currentTime = 0;
  hymn.play();
}

function handleForward() {
  hymn.currentTime = hymn.currentTime + 5;
}

function handleRewind() {
  hymn.currentTime = hymn.currentTime - 5;
  handlePlayPUPHymn();
}

function handleLoop() {
  if (!hymn.loop) {
    loop.style.backgroundColor = "#ffbb00";
  } else {
    loop.style.backgroundColor = "white";
  }

  hymn.loop = !hymn.loop;
}

function handleSpaceBarPress(event) {
  if (event.key === " " && hymn.paused) {
    event.preventDefault();
    hymn.play();
    return;
  }
  if (event.key === " " && !hymn.paused) {
    event.preventDefault();
    hymn.pause();
    return;
  }
}

function toggleInstrumentalMode() {
  const hymnSource = document.getElementById("hymn-source");
  const instrumentalTab = document.getElementById("instrumental-tab");

  if (!hymnSource.isInstrumental) {
    hymnSource.src = "./assets/imno-ng-pup-instrumental.mp3";
    instrumental.style.backgroundColor = "#ffbb00";
    instrumentalTab.style.display = "inline-block";
  } else {
    hymnSource.src = "./assets/imno-ng-pup.mp3";
    instrumental.style.backgroundColor = "white";
    instrumentalTab.style.display = "none";
  }

  const time = hymn.currentTime;

  hymn.load();
  hymn.currentTime = time;
  hymn.play();
  hymnSource.isInstrumental = !hymnSource.isInstrumental;
}

hymn.addEventListener("timeupdate", updateLyrics);
hymn.addEventListener("play", handlePlayPUPHymn);
hymn.addEventListener("pause", handlePausePUPHymn);
hymn.addEventListener("ended", handleEndPUPHymn);

restartBtn.addEventListener("click", handleRestart);
forward.addEventListener("click", handleForward);
rewind.addEventListener("click", handleRewind);
loop.addEventListener("click", handleLoop);

document.addEventListener("keydown", handleSpaceBarPress);

instrumental.addEventListener("click", toggleInstrumentalMode);
