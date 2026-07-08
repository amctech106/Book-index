// ===============================
// Global Search Engine - Part 1
// ===============================

const searchInput = document.querySelector(".search");
const resultBox = document.querySelector(".search-results");

const btn = document.getElementById("searchBtn");

btn.addEventListener("click", () => {

    const keyword = searchInput.value.trim();

    if (keyword === "") return;

    window.location.href =
        `search-results.html?q=${encodeURIComponent(keyword)}`;

});



let searchData = [];

// JSON لوڈ کریں
async function loadSearchData() {

    try {

        const response = await fetch("search-data.json");

        searchData = await response.json();

        console.log(`${searchData.length} Records Loaded`);

    } catch (error) {

        console.error("JSON Load Error :", error);

    }

}

loadSearchData();


// ===============================
// سرچ شروع
// ===============================

// // searchInput.addEventListener("input", function () {

// //     const value = this.value.trim().toLowerCase();

// //     resultBox.innerHTML = "";

// //     if (value === "") {

// //         resultBox.style.display = "none";

// //         return;

// //     }

// //     const results = searchData.filter(item => {

// //     console.log(item);

// //     return (
// //         item.title &&
// //         item.title.toLowerCase().includes(value)
// //     );

// // });

//     resultBox.style.display = "block";
//         // اگر کچھ نہ ملے
//     if (results.length === 0) {

//         resultBox.innerHTML = `
//             <div class="not-found">
//                 کوئی ریکارڈ نہیں ملا
//             </div>
//         `;

//         return;
//     }

//     // پہلے 100 رزلٹ دکھائیں
//     results.slice(0, 100).forEach(item => {

//         const card = document.createElement("div");

//         card.className = "search-item";

//         card.innerHTML = `
//             <h3>${item.title}</h3>

//             <p>
//                 📚 جلد : ${item.volume}
//                 &nbsp;&nbsp;&nbsp;
//                 📄 صفحہ : ${item.page}
//             </p>

//             <small>${item.file}</small>
//         `;

//         card.addEventListener("click", function () {

//             window.location.href = item.file;

//         });

//         resultBox.appendChild(card);

//     });

//     });

// ===============================
// ESC دبانے پر سرچ بند
// ===============================

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        searchInput.value = "";
        resultBox.innerHTML = "";
        resultBox.style.display = "none";

    }

});

// ===============================
// سرچ باکس کے باہر کلک کریں
// ===============================

document.addEventListener("click", function (e) {

    if (
        !searchInput.contains(e.target) &&
        !resultBox.contains(e.target)
    ) {

        resultBox.style.display = "none";

    }

});

// ===============================
// دوبارہ Input پر رزلٹ دکھائیں
// ===============================

searchInput.addEventListener("click", function () {

    if (
        this.value.trim() !== "" &&
        resultBox.innerHTML !== ""
    ) {

        resultBox.style.display = "block";

    }

});
