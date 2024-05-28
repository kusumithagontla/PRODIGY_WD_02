    const stopwatchDuration = document.getElementById("stopwatchDuration");
    const start = document.getElementById("start");
    const lap = document.getElementById("lap");
    const stop = document.getElementById("stop");
    const reset = document.getElementById("reset");
    const laps = document.getElementById("laps");

    let hrs = 0,
        mins = 0,
        sec = 0,
        ms = 0,
        timeInterval;

    start.onclick = () => {
        timeInterval = setInterval(() => {
            ms++;
            if (ms == 100) {
                sec++;
                ms = 0;
            }
            if (sec == 60) {
                mins++;
                sec = 0;
            }
            if (mins == 60) {
                hrs++;
                mins = 0;
            }

            stopwatchDuration.innerHTML = `${zeroPad(hrs)}:${zeroPad(mins)}:${zeroPad(sec)}:${zeroPad(ms)}`;
            
        }, 10);

        start.style.display = "none";
        stop.style.display = "block";
        lap.style.display = "block";
        reset.style.display = "none";
        lap.removeAttribute("disabled");
    };

    const zeroPad = (num) => {
        return String(num).padStart(2, "0");
    };

    let count = 0;
    lap.onclick = () => {
        count++;
        let li = document.createElement("li");
        li.innerHTML = `#${count}-${zeroPad(hrs)}:${zeroPad(mins)}:${zeroPad(sec)}:${zeroPad(ms)}`;
        laps.appendChild(li);
        laps.scroll({ top: laps.scrollHeight, behavior: "smooth" });
    };

    stop.onclick = () => {
        clearInterval(timeInterval);
        lap.style.display = "none";
        reset.style.display = "block";
        start.style.display = "block";
        start.innerHTML = "Resume";
        stop.style.display = "none";
    };

    reset.onclick = () => {
        laps.innerHTML = "";
        hrs = mins = sec = ms = count = 0;
        clearInterval(timeInterval);
        stopwatchDuration.innerHTML = "00:00:00:00";

        start.innerHTML = "Start";
        lap.style.display = "block";
        lap.setAttribute("disabled", true);
        reset.style.display = "none";
        start.style.display = "block";
        stop.style.display = "none";
    };

