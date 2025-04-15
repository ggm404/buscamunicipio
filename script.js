let data = [];

fetch("data.json")
  .then(res => res.json())
  .then(json => { data = json; })
  .catch(err => console.error("Error loading data:", err));

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const resultContainer = document.getElementById("resultContainer");

  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    resultContainer.innerHTML = "";

    if (!term) return;

    const results = data.filter(item =>
      item["MUNICIPIO (INEGI)"]?.toLowerCase().includes(term)
    );

    if (results.length === 0) {
      resultContainer.innerHTML = "<p>No se encontraron coincidencias.</p>";
      return;
    }

    let html = "<table><thead><tr>";
    Object.keys(results[0]).forEach(key => {
      html += `<th>${key}</th>`;
    });
    html += "</tr></thead><tbody>";

    results.forEach(row => {
      html += "<tr>";
      Object.values(row).forEach(val => {
        html += `<td>${val || ""}</td>`;
      });
      html += "</tr>";
    });

    html += "</tbody></table>";
    resultContainer.innerHTML = html;
  });
});
