document.addEventListener("DOMContentLoaded", () => {
    genTable(getNames());
    document.querySelector("th:nth-child(2)").onclick = () => sortTable("name", 2);
    document.querySelector("th:nth-child(3)").onclick = () => sortTable("level", 3);
    document.querySelector("th:nth-child(4)").onclick = () => sortTable("group", 4);
    document.querySelector("th:nth-child(5)").onclick = () => sortTable("pvp", 5);
    document.querySelector("th:nth-child(6)").onclick = () => sortTable("diff", 6);
});

//格式化 <title> 轉換成 YYYY/MM/DD
document.addEventListener("DOMContentLoaded", () => {
    let rawTitle = document.title.trim();
    if (rawTitle.length === 8) {
        let year = rawTitle.substring(0, 4);
        let month = rawTitle.substring(4, 6);
        let day = rawTitle.substring(6, 8);
        document.getElementById("resultDay").textContent = `${year}/${month}/${day}`;
    }
    else {
        document.getElementById("resultDay").textContent = rawTitle;
    }
});

function genTable(names, column = "level") {
    // 決定排序用的 index
    let indexMap = {
        name: 1,
        level: 3,
        group: 5,
        pvp: 7,
        diff: 9
    };
    let idx = indexMap[column];

    // 計算排名
    let ranks = [];
    let currentRank = 1;
    for (let i = 0; i < names.length; i++) {
        if (i > 0 && names[i][idx] === names[i - 1][idx]) {
            // 重複 → 用前一個排名
            ranks[i] = ranks[i - 1];
        } else {
            // 不重複 → 用目前累計人數 + 1
            ranks[i] = currentRank;
        }
        currentRank = i + 1 + 1; // 下一個排名 = 已經顯示的人數 + 1
    }

    // 產生表格
    let text = "";
    for (let i = 0; i < names.length; i++) {
        text += `<tr>`;
        text += `<td>${ranks[i]}</td>`;   // 序（排名）
        text += `<td>${names[i][0]}</td>`; // 玩家暱稱
        text += `<td>${names[i][2]}</td>`; // 等級
        text += `<td>${names[i][4]}</td>`; // 公會戰組別
        text += `<td>${names[i][6]}</td>`; // PVP段位
        text += `<td>${names[i][8]}</td>`; // 較前週
        text += `</tr>`;
    }
    document.getElementById("show").innerHTML = text;
}

let sortState = {
    name: true,
    level: true,
    group: true,
    pvp: true,
    diff: true
};

function sortTable(column, thIndex) {
    let data = getNames();
    let indexMap = {
        name: 1,
        level: 3,
        group: 5,
        pvp: 7,
        diff: 9
    };
    let idx = indexMap[column];

    let asc = sortState[column];
    sortState[column] = !asc;

    data.sort((a, b) => {
        let valA = parseInt(a[idx], 10);
        let valB = parseInt(b[idx], 10);
        // return asc ? valB - valA : valA - valB; // 1 表示最高排名
        return asc ? valA - valB : valB - valA;
    });

    genTable(data, column);

    resetHeaders();
    let th = document.querySelector(`th:nth-child(${thIndex})`);
    th.innerHTML = th.textContent + (asc ? " ▼" : " ▲");
}

function resetHeaders() {
    let headers = document.querySelectorAll("thead th");
    headers[0].textContent = "序";
    headers[1].textContent = "遊戲暱稱";
    headers[2].textContent = "等級";
    headers[3].textContent = "公會戰組別";
    headers[4].textContent = "PVP段位";
    headers[5].textContent = "較前週";
}