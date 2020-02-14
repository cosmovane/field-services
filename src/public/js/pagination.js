const paginationDiv = document.getElementById('pagination')
const newsFeed = document.getElementById("newsFeed")

const createButton = (page, type) => {
    if (type === 'first') {
        return `
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item disabled"><a class="page-link" href="#"><i class="far fa-arrow-alt-circle-left"></i> </a>
                </li>
                <li class="page-item disabled"><a class="page-link" href="#">1</a></li>
                <li class="page-item" data-goto="${2}"><a class="page-link" href="#">2 <i class="far fa-arrow-alt-circle-right"></i></a>
                </li>
            </ul>
        </nav>
        `
    } else if (type === 'regular') {
        return `<nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" data-goto="${page - 1}"><a class="page-link" href="#"><i class="far fa-arrow-alt-circle-left"></i> ${page - 1}</a>
                </li>
                <li class="page-item disabled"><a class="page-link" href="#">${page}</a></li>
                <li class="page-item" data-goto="${page + 1}"><a class="page-link" href="#">${page + 1} <i class="far fa-arrow-alt-circle-right"></i></a>
                </li>
            </ul>
        </nav>`
    } else if (type === 'last') {
        return `<nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" data-goto="${page - 1}"><a class="page-link" href="#"><i class="far fa-arrow-alt-circle-left"></i> ${page - 1}</a>
                </li>
                <li class="page-item disabled"><a class="page-link" href="#">${page}</a></li>
                <li class="page-item disabled"><a class="page-link" href="#"> <i class="far fa-arrow-alt-circle-right"></i></a>
                </li>
            </ul>
        </nav>`
    }

}

const pages = (page) => {
    const pages = Math.ceil(news.length / 5)
    let button

    if (page === 1 && pages > 1) {
        button = createButton(page, 'first')
    } else if (page < pages) {
        button = createButton(page, 'regular')
    } else if (page === pages && pages > 1) {
        button = createButton(page, 'last')
    }
    paginationDiv.innerHTML = button
}

const pagination = (page, resPerPage = 5) => {
    const start = (page - 1) * resPerPage
    const end = page * resPerPage
    const test = news.slice(start, end).forEach((current, index) => {
        const date = current.created_at.split('-')
        const regularHtml = `<article class="blog_style1">
        <div class="blog_img">
            <img class="img-fluid" src="/uploads/${current.image}" alt="">
        </div>
        <div class="blog_text">
            <div class="blog_text_inner">

                <div class="cat">
                    <p><i class="fa fa-calendar" aria-hidden="true"></i> ${date[1]}/${date[2].slice(0, 2)}/${date[0]}</p>
                </div>
                <a href="/news/show/${current.id}">
                    <h4>${current.title}</h4>
                </a>
                <p>${current.summary}</p>
                <a class="blog_btn" href="/news/show/${current.id}">Read More</a>
            </div>
        </div>
    </article>`
        const adminHtml = `<article class="blog_style1">
    <div class="blog_img">
        <img class="img-fluid" src="/uploads/${current.image}" alt="">
    </div>
    <div class="blog_text">
        <div class="blog_text_inner">

            <div class="cat">
                <p><i class="fa fa-calendar" aria-hidden="true"></i> ${date[1]}/${date[2].slice(0, 2)}/${date[0]}</p>
            </div>
            <a href="/news/show/${current.id}">
                <h4>${current.title}</h4>
            </a>
            <p>${current.summary}</p>
            <a class="blog_btn" href="/news/show/${current.id}">Read More</a>
            <div class="">
                <br>
                <a href="/news/edit/${current.id}"><i class="far fa-edit"></i></a>
                <a href="/news/delete/${current.id}"><i class="far fa-trash-alt"></i></a>
            </div>
        </div>
    </div>
</article>`
        newsFeed.innerHTML += user.isAdmin ? adminHtml : regularHtml
    })
}

paginationDiv.addEventListener('click', e => {
    const btn = e.target.closest('.page-item')
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10)
        newsFeed.innerHTML = ''
        pages(goToPage)
        pagination(goToPage)
    }
})

pagination(1)

if (news.length > 5) {
    pages(1)
}