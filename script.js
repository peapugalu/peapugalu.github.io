document.addEventListener("DOMContentLoaded", function () {
    console.log("Website Pea Pugalu siap!");

    // Smooth scrolling untuk navigasi
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fungsi menampilkan artikel dari localStorage
    function loadArticles() {
        const articleList = document.getElementById("articleList");
        articleList.innerHTML = "";
        const articles = JSON.parse(localStorage.getItem("articles")) || [];
        
        articles.forEach(article => {
            const articleDiv = document.createElement("div");
            articleDiv.classList.add("article");
            articleDiv.innerHTML = `<h3>${article.title}</h3><p>${article.content}</p>`;
            articleList.appendChild(articleDiv);
        });
    }

    loadArticles();

    // Fungsi upload artikel
    document.getElementById("articleForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        if (title && content) {
            const newArticle = { title, content };
            let articles = JSON.parse(localStorage.getItem("articles")) || [];
            articles.unshift(newArticle);
            localStorage.setItem("articles", JSON.stringify(articles));

            document.getElementById("title").value = "";
            document.getElementById("content").value = "";

            loadArticles();
        }
    });
});
