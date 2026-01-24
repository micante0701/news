window.addEventListener("DOMContentLoaded", function () {
    let select = document.getElementById("dateSelect");
    let latestDate = select.options[1].value; // 第一個日期就是最新的
    select.value = latestDate;
    document.getElementById("contentFrame").src = latestDate + ".html";
});

document.getElementById("dateSelect").addEventListener("change", function () {
    let latestDate = this.options[1].value;
    let date = this.value;
    if (date) {
        document.getElementById("contentFrame").src = date + ".html";
    } else {
        // 選回 "-- 請選擇 --" → 顯示最新日期
        document.getElementById("contentFrame").src = latestDate + ".html";
    }
});