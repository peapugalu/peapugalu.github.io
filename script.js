document.addEventListener("DOMContentLoaded", function () {
    console.log("Website Pea Pugalu siap!");

    // Smooth scroll
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Menampilkan artikel dari localStorage
    function loadArticles() {
        const articleList = document.getElementById("articleList");
        articleList.innerHTML = "";
        const articles = JSON.parse(localStorage.getItem("articles")) || [];

        articles.forEach((article, index) => {
            const articleDiv = document.createElement("div");
            articleDiv.classList.add("article");
            articleDiv.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.content}</p>
                ${article.image ? `<img src="${article.image}" alt="Gambar Artikel">` : ""}
                <button class="delete-btn" onclick="deleteArticle(${index})">Hapus</button>
            `;
            articleList.appendChild(articleDiv);
        });
    }

    loadArticles();

    // Upload Artikel
    document.getElementById("articleForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const imageUpload = document.getElementById("imageUpload").files[0];

        const newArticle = { title, content };

        if (imageUpload) {
            const reader = new FileReader();
            reader.onload = function (e) {
                newArticle.image = e.target.result;
                saveArticle(newArticle);
            };
            reader.readAsDataURL(imageUpload);
        } else {
            saveArticle(newArticle);
        }
    });

    function saveArticle(article) {
        let articles = JSON.parse(localStorage.getItem("articles")) || [];
        articles.unshift(article);
        localStorage.setItem("articles", JSON.stringify(articles));
        loadArticles();
    }

    window.deleteArticle = function (index) {
        let articles = JSON.parse(localStorage.getItem("articles")) || [];
        articles.splice(index, 1);
        localStorage.setItem("articles", JSON.stringify(articles));
        loadArticles();
    };
});
