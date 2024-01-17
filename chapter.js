const chapters = document.querySelector(".chapter-holder");

function fetchAndDisplayBooks(testament) {
  fetch(`https://api.getbible.net/v2/kjv.json`)
    .then((response) => response.json())
    .then((all) => {
      const books = testament === "old" ? all.books.slice(0, 39) : all.books.slice(39, 66);
      const displayAy = books.map((book) => {
        return `<button class="chapters">${book.name}</button>`;
      });
      chapters.innerHTML = displayAy.join("");
    })
    .catch((error) => {
      console.error("Error fetching or parsing data:", error);
    });
}

// Add click events to book buttons
chapters.addEventListener("click", function(event) {
  const clickedBookButton = event.target;
  if (clickedBookButton.classList.contains("chapters")) {
    const bookName = clickedBookButton.textContent;
    const urlParams = new URLSearchParams({ book: bookName });
    window.location.href = "chap.html?" + urlParams.toString();
  }
});

// Chapter selection
const chapterSelect = document.getElementById("chapter-select");
chapterSelect.addEventListener("change", function() {
  fetchAndDisplayBooks(this.value === "1" ? "old" : "new");
});

// Initial display
fetchAndDisplayBooks("old"); // Or "new" if you want to start with the New Testament
