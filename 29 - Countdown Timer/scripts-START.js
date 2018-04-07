let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countDown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            clearInterval(countDown);
            return;
        }

        displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timeStamp) {
    const endTime = new Date(timeStamp);
    const endHour = endTime.getHours();
    const endMinute = endTime.getMinutes();
    endTimeDisplay.textContent = `Be Back At ${endHour > 12 ? endHour - 12 : endHour}:${endMinute < 10 ? '0' : ''}${endMinute}`;
}

function startTime() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTime));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes * 60);
    this.reset();
})