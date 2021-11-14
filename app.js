import { Pagination } from './Pagination.js'
import { Fetch } from './Fetch.js'

const pg = new Pagination() //:1 instanciate Pangination and provide initial number of list to be generated
const fetch = new Fetch('./data.json')

window.onload = async () => {
    const setItems = document.getElementById('set-items')
    const whatever = document.getElementById('next')
    const back = document.getElementById('back')
    const first = document.getElementById('first')
    const last = document.getElementById('last')
    const data = await fetch.loadData()
    pg.len = data.numbers.length //: ! 3rd must get data length
    pg.setList() //:! 2st must initialize list items
    pg.countPages(pg.startList)
    pg.setPageCount()
    createPageBtns()
    let pageBtns = document.querySelectorAll('.page-btns button')
    setPageCount()
    loadList()

    setItems.onchange = setList
    whatever.onclick = goNext
    back.onclick = goBack
    last.onclick = goToLast
    first.onclick = goToFirst
    pageBtns.forEach(btn => btn.onclick = goToPage)
    pg.resetBtns([{ disabled: pageBtns[pg.currentPage - 1] }])

    //: functions
    function setList(e) {
        let countList = Number(e.target.value)

        pg.startList = countList
        pg.setList()
        pg.countPages(countList)
        createPageBtns()
        pg.setPageCount()
        pageBtns = document.querySelectorAll('.page-btns button')
        setPageCount()
        pageBtns.forEach(btn => btn.onclick = goToPage)

        loadList()
        pg.resetBtns(countList)
        pg.resetBtns([{ enabled: first }, { enabled: back }, { enabled: next }, { enabled: last }, { disabled: pageBtns[pg.currentPage - 1] }])
        if (countList == 0) {
            pg.resetBtns([{ disabled: first }, { disabled: back }, { disabled: next }, { disabled: last }])
        }
        if (pg.listCount === 0) {
            pg.resetBtns([{ disabled: pageBtns[pg.currentPage - 1] }])
        }
    }

    function goNext() {
        pg.goNext()
        setPageCount()
        loadList()
        pg.resetBtns([{ enabled: first }, { enabled: back }, { enabled: next }, { enabled: last }])
        if (pg.end === pg.len) {
            pg.resetBtns([{ enabled: first }, { enabled: back }, { disabled: next }, { disabled: last }])
        }
        pg.resetPrevBtn(pageBtns)
        pg.resetBtns([{ disabled: pageBtns[pg.currentPage - 1] }])
    }
    function goBack() {
        pg.goBack()
        setPageCount()
        loadList()
        pg.resetBtns([{ enabled: first }, { enabled: back }, { enabled: next }, { enabled: last }])
        if (pg.start === 0 || pg.start === 1) {
            pg.resetBtns([{ disabled: first }, { disabled: back }, { enabled: next }, { enabled: last }])
        }
        pg.resetPrevBtn(pageBtns)
        pg.resetBtns([{ disabled: pageBtns[pg.currentPage - 1] }])

    }
    function goToFirst() {
        pg.toFirst()
        setPageCount()
        loadList()
        pg.resetPrevBtn(pageBtns)
        pg.resetBtns([{ disabled: first }, { disabled: back }, { enabled: next }, { enabled: last }, { disabled: pageBtns[pg.currentPage - 1] }])
    }
    function goToLast() {
        pg.toLast()
        setPageCount()
        loadList()
        pg.resetPrevBtn(pageBtns)
        pg.resetBtns([{ enabled: first }, { enabled: back }, { disabled: next }, { disabled: last }, { disabled: pageBtns[pg.currentPage - 1] }])
    }

    function goToPage(e) {
        let id = e.target.dataset.id
        pg.currentPage = id
        pg.goToPage(id)
        loadList()
        pg.resetPrevBtn(pageBtns)
        pg.resetBtns([{ disabled: e.target }])
        if (pg.currentPage === 1) {
            pg.resetBtns([{ disabled: first }, { disabled: back }, { enabled: next }, { enabled: last }])
        } else if (pg.currentPage === (pg.pageLen - 1)) {
            pg.resetBtns([{ enabled: first }, { enabled: back }, { disabled: next }, { disabled: last }])
        } else {
            pg.resetBtns([{ enabled: first }, { enabled: back }, { enabled: next }, { enabled: last }])
        }
    }

    async function loadList() {
        const listItems = document.querySelector('.list-items')
        listItems.innerHTML = ''
        const data = await fetch.loadData()
        let html = createList(data.numbers)
        listItems.append(html)
    }

    function createList(data) {
        const ul = document.createElement('ul')
        const frag = document.createDocumentFragment()

        for (let i = pg.start; i < pg.end; i++) {
            let li = document.createElement('li')
            li.textContent = data[i].key
            ul.append(li)
        }
        frag.append(ul)
        return frag
    }

    function createPageBtns() {
        const pageBtns = document.querySelector('.page-btns')
        const frag = document.createDocumentFragment()
        pageBtns.innerHTML = ''

        for (let i = 1; i < pg.pageLen; i++) {
            let btn = document.createElement('button')
            btn.type = 'button'
            btn.dataset.id = i
            btn.className = 'hide'
            btn.textContent = i
            frag.append(btn)
        }
        pageBtns.append(frag)
    }
    function setPageCount() {
        pg.hideBtns(pageBtns)
        for (let i = pg.startPage; i < pg.endPage; i++) {
            pageBtns[i].classList.remove('hide')
        }
    }
}