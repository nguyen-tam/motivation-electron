// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

function daysInYear(year) 
{         
	return isLeapYear(year) ? 366 : 365;
}

function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
}

function isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

function getProgressYearPercentage() {
    let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);

    let amountOfDays = daysInYear(now.getYear());

    return Math.round( (amountOfDays - day) / amountOfDays * 100);
}

function getProgressMonthPercentage() {

    let date = new Date();
    let time = new Date(date.getTime());
    time.setMonth(date.getMonth() + 1);
    time.setDate(0);
    let days =time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;
    let amountOfDays = daysInMonth(date.getMonth() + 1, date.getYear());

    return Math.round( days / amountOfDays * 100);
  
}

function getProgressDayPercentage() {
    var actualTime = new Date(Date.now());
    var endOfDay = new Date(actualTime.getFullYear(), actualTime.getMonth(), actualTime.getDate() + 1, 0, 0, 0);
    var timeRemaining = endOfDay.getTime() - actualTime.getTime();

    let miniSecondsPerDay = 1000 * 60 * 60 * 24;

    return Math.round( timeRemaining / miniSecondsPerDay * 100);
}

function countData() {
    let yearPercent = getProgressYearPercentage();
    let monthPercent = getProgressMonthPercentage();
    let dayPercent = getProgressDayPercentage();

    document.getElementById("dayPercent").textContent = dayPercent + "%";
    document.getElementById("monthPercent").textContent = monthPercent + "%";
    document.getElementById("yearPercent").textContent = yearPercent + "%";

    document.getElementById("progressDay").value = ( 100 - dayPercent);
    document.getElementById("progressMonth").value = ( 100 - monthPercent);
    document.getElementById("progressYear").value = ( 100 - yearPercent);
}      

countData();
setInterval(function(){ countData(); }, 24 * 60 * 60 * 1000);