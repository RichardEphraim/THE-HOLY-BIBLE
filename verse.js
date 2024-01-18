document.addEventListener("DOMContentLoaded", function () {
    const verseList = document.querySelector(".verse");

    function displayVerses(selectedBook, selectedChapter) {
        fetch("https://api.getbible.net/v2/kjv.json") // Keep the original API URL
            .then((response) => response.json())
            .then((all) => {
                console.log(all);

                const bookData = all.books.find((book) => book.name === selectedBook);

                if (bookData) {
                    const chapterData = bookData.chapters.find((chapter) => chapter.chapter === parseInt(selectedChapter, 10));

                    if (chapterData) {
                        // Display chapterData.name only once at the top
                        verseList.innerHTML = `<div>${chapterData.name}</div>`;
                        
                        // Display individual verses
                        const displayVerses = chapterData.verses.map((verse) => {
                            return `<p><span style="font-weight: bold; font-size: 20px;">${verse.verse}</span>${verse.text}</p>`;
                        });

                        verseList.innerHTML += displayVerses.join('');
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
    }

    function goToChapter(selectedBook, targetChapter) {
        // Redirect to the same page with the updated chapter
        window.location.href = `?book=${selectedBook}&chapter=${targetChapter}`;
    }

    function setupNavigationButtons(selectedBook, currentChapter) {
        const prevChapterButton = document.createElement('button');
        prevChapterButton.textContent = 'Previous Chapter';
        prevChapterButton.addEventListener('click', () => {
            const targetChapter = Math.max(currentChapter - 1, 1); // Ensure not to go below chapter 1
            goToChapter(selectedBook, targetChapter);
        });

        const nextChapterButton = document.createElement('button');
        nextChapterButton.textContent = 'Next Chapter';
        nextChapterButton.addEventListener('click', () => {
            const targetChapter = currentChapter + 1;
            // You may want to set a maximum chapter based on the actual number of chapters in the book
            goToChapter(selectedBook, targetChapter);
        });

        document.body.appendChild(prevChapterButton);
        document.body.appendChild(nextChapterButton);
    }

    const queryParams = new URLSearchParams(window.location.search);
    const selectedBook = queryParams.get("book");
    const selectedChapter = queryParams.get("chapter");

    if (selectedBook && selectedChapter) {
        displayVerses(selectedBook, selectedChapter);
        setupNavigationButtons(selectedBook, parseInt(selectedChapter, 10));
    } else {
        console.error("Book or chapter not selected.");
    }
});
