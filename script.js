document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const resultsTable = document.getElementById("resultsTable");

  let data = [];

  // Fetch the JSON data
  fetch("data.json")
    .then(response => response.json())
    .then(json => {
      data = json;
    })
    .catch(error => {
      console.error("Error loading JSON:", error);
    });

  // Handle search input
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Clear previous results
    resultsTable.innerHTML = "";

    if (searchTerm === "") return;

    // Step 1: Filter rows based on search term
    const results = data.filter(row =>
      row["MUNICIPIO (INEGI)"]?.toLowerCase().includes(searchTerm)
    );

    // Step 2: Remove fully identical duplicates
    const uniqueResults = Array.from(
      new Map(results.map(row => [JSON.stringify(row), row])).values()
    );

    // Step 3: Display header (if results exist)
    if (uniqueResults.length > 0) {
      const headerRow = document.createElement("tr");
      Object.keys(uniqueResults[0]).forEach(key => {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
      });
      resultsTable.appendChild(headerRow);
    }

    // Step 4: Display rows
    uniqueResults.forEach(row => {
      const tr = document.createElement("tr");
      Object.values(row).forEach(value => {
        const td = document.createElement("td");
        td.textContent = value;
        tr.appendChild(td);
      });
      resultsTable.appendChild(tr);
    });
  });
});
