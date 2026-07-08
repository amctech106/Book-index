const tableBody = document.getElementById("tableBody");

// URL سے q حاصل کریں
const params = new URLSearchParams(window.location.search);
const keyword = params.get("q") || "";

let searchData = [];

async function loadData() {
    try {
        const response = await fetch("search-data.json");
        searchData = await response.json();

        showResults();
    } catch (error) {
        console.error(error);
    }
}

loadData();

function showResults() {

    tableBody.innerHTML = "";

    const value = keyword.trim().toLowerCase();

    const results = searchData.filter(item => {

        if (!item || typeof item !== "object") return false;

        const title = String(item.title ?? "").toLowerCase();
        const page = String(item.page ?? "");
        const volume = String(item.volume ?? "");

        return (
            title.includes(value) ||
            page.includes(value) ||
            volume.includes(value)
        );

    });

    // اگر کوئی نتیجہ نہ ملے
    if (results.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;color:red;font-weight:bold;">
                    کوئی ریکارڈ نہیں ملا
                </td>
            </tr>
        `;
    } else {
        // ٹیبل میں رزلٹ شامل کریں
        results.forEach(item => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.title}</td>
                <td>${item.volume}</td>
                 <td>${item.page}</td>
            `;

            // Row پر کلک
            row.style.cursor = "pointer";

            row.addEventListener("click", () => {
                window.location.href = item.file;
            });

            tableBody.appendChild(row);
        });
    }

    // نتائج کی تعداد دکھائیں
    const totalResults = document.getElementById("totalResults");
    if (totalResults) {
        totalResults.innerHTML = `
            تلاش : <b>${keyword}</b>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            کل نتائج : <b>${results.length}</b>
        `;
    }
}