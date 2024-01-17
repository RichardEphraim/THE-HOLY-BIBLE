document.addEventListener("DOMContentLoaded", function () {
    const verseList = document.querySelector(".verse");

    function displayVerses() {
        const queryParams = new URLSearchParams(window.location.search);
        const selectedBook = queryParams.get("book");
        const selectedChapter = queryParams.get("chapter");

        if (selectedBook && selectedChapter) {
            fetch("https://api.getbible.net/v2/kjv.json") // Keep the original API URL
                .then((response) => response.json())
                .then((all) => {
                    console.log(all);

                    const bookData = all.books.find((book) => book.name === selectedBook);

                    if (bookData) {
                        const chapterData = bookData.chapters.find((chapter) => chapter.chapter === parseInt(selectedChapter, 10));

                        if (chapterData) {
                            const displayVerses = chapterData.verses.map((verse) => {
                                return `    <p><span style="font-weight: bold; font-size: 30px;">${verse.verse}</span>${verse.text}</p>
                                `;
                            });

                            verseList.innerHTML = displayVerses.join('');
                        } else {
                            console.error("Selected chapter not found.");
                        }
                    } else {
                        console.error("Selected book not found.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching or parsing data:", error);
                });
        } else {
            console.error("Book or chapter not selected.");
        }
    }

    displayVerses();
});
