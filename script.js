document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => { document.getElementById("loader").style.display = "none"; }, 1000);

    document.querySelectorAll("nav ul li a").forEach(e => {
        e.addEventListener("click", t => {
            t.preventDefault();
            document.getElementById(e.getAttribute("href").substring(1)).scrollIntoView({ behavior: "smooth" });
        });
    });

    let scrollToTopBtn = document.getElementById("scrollToTop");
    window.addEventListener("scroll", () => {
        window.scrollY > 200 ? scrollToTopBtn.style.display = "block" : scrollToTopBtn.style.display = "none";
    });

    scrollToTopBtn.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });

    document.getElementById("toggleDarkMode").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    function loadArticles() {
        let articleList = document.getElementById("articleList");
        articleList.innerHTML = "";
        let articles = JSON.parse(localStorage.getItem("articles")) || [];

        articles.forEach((article, index) => {
            let articleDiv = document.createElement("div");
            articleDiv.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.content}</p>
                ${article.image ? `<img src="${article.image}" width="200">` : ""}
                <button onclick="deleteArticle(${index})">Hapus</button>
            `;
            articleList.appendChild(articleDiv);
        });
    }

    loadArticles();

    document.getElementById("articleForm").addEventListener("submit", (e) => {
        e.preventDefault();
        let title = document.getElementById("title").value;
        let content = document.getElementById("content").value;
        let imageUpload = document.getElementById("imageUpload").files[0];
        let newArticle = { title, content };

        if (imageUpload) {
            let reader = new FileReader();
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
