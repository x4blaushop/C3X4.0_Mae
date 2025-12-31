document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchBtn");
  const frame = document.getElementById("searchFrame");

  function executarPesquisa() {
    const termo = input.value.trim();
    if (!termo) return;

    const query = encodeURIComponent(termo);
    frame.src = `https://www.bing.com/search?q=${query}`;
  }

  button.addEventListener("click", executarPesquisa);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      executarPesquisa();
    }
  });
});
