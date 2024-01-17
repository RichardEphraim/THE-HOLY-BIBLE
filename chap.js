document.addEventListener("DOMContentLoaded", function () {
  const chapterList = document.querySelector(".chapters");

  function displayChapters() {
    const queryParams = new URLSearchParams(window.location.search);
    const selectedBook = queryParams.get("book");

    if (selectedBook) {
      fetch("https://api.getbible.net/v2/kjv.json")
        .then((response) => response.json())
        .then((all) => {
          console.log(all);

          const bookData = all.books.find((book) => book.name === selectedBook);

          if (bookData) {
            const displayChapters = bookData.chapters.map((chapter) => {
              return `<button onclick="navigateToVerse('${encodeURIComponent(selectedBook)}', ${chapter.chapter})">${chapter.chapter}</button>`;
            });

            chapterList.innerHTML = displayChapters.join('');
          } else {
            console.error("Selected book not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching or parsing data:", error);
        });
    } else {
      console.error("No book selected.");
    }
  }

  displayChapters();
});

function navigateToVerse(book, chapter) {
  window.location.href = `verse.html?book=${book}&chapter=${chapter}`;
}
