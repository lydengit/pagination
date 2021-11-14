export class Pagination {
    constructor(startList, pageCount) {
        this.startList = Number(startList) || 15
        this.pageCount = Number(pageCount) || 6
    }
    len //:! leng of data
    start = 1 //: start loop
    end = 0 //: end loop. Loop runs between 'start' and 'end'
    listCount = 0 //:count of list items (used to incriment and decriment 'start' and 'end')
    currentPage = 1 //: track current page (page button)
    pageLen = 0 //: total pages
    startPage = 0 //: start loop
    endPage = 0 //: end loop

    //:! set list - number of items in the list per page
    setList() {
        //: 0 for select all to show all list items 
        this.startList = Number(this.startList)
        if (this.startList === 0) {
            this.end = this.len
        } else {
            this.end = this.startList
        }
        this.start = 0
        this.listCount = this.startList
        this.currentPage = 1
        this.startPage = 0
        this.endPage = this.pageLen
    }

    goNext() {
        //: when get to last page set 'end' to 'data.length' and returns so it won't go off length
        if (this.end === this.len) {
            return
        }

        //: go to the next group page-set when currentPage / pageCount remainder = 0
        if (this.currentPage % this.pageCount === 0) {
            this.startPage += this.pageCount
            this.endPage = this.startPage + this.pageCount
            if (this.endPage >= this.pageLen) {
                this.endPage = this.pageLen - 1
            }
        }

        //: increment by current very click
        this.start += this.listCount
        this.end += this.listCount
        this.currentPage += 1

        if (this.end >= this.len) {
            this.end = this.len
            return
        }
    }

    goBack() {
        if (this.start === 0 || this.start === 1) {
            return
        }
        //: reset end to current value to keep the same decrement value as before eg. 10
        if (this.end === this.len) {
            this.end = this.start + this.listCount
        }

        this.start -= this.listCount
        this.end -= this.listCount
        this.currentPage -= 1
        if (this.currentPage === 1) return

        //: go to the next group button set when currentPage / pageCount remainder = 0
        if (this.currentPage % this.pageCount === 0) {
            this.startPage -= this.pageCount
            this.endPage = this.startPage + this.pageCount
        }
    }

    toFirst() {
        //: simply reset 'start' and 'end' to the initial values
        this.start = 0
        this.end = this.listCount
        this.currentPage = 1
        this.startPage = 0
        this.setPageCount()
    }

    toLast() {
        this.start = this.listCount * Math.ceil(this.len / this.listCount) - this.listCount
        this.end = this.len

        this.startPage = (this.pageCount * Math.ceil(this.pageLen / this.pageCount) - this.pageCount)
        this.endPage = this.pageLen - 1

        if (this.startPage === this.endPage) {
            this.startPage = this.pageLen - (this.pageCount + 1)
        }
        this.currentPage = this.pageLen - 1 //: ! NodeList[] length is 1 less
    }

    countPages(num) {
        num = Number(num)
        if (num === 0) {
            this.pageLen = 2
            return
        }
        let val = Math.ceil(this.len / num) + 1
        this.pageLen = val
    }

    //: reset 'start' and 'end' corresponding to page button click
    goToPage(num) {
        num = Number(num)
        this.end = num * this.listCount
        this.start = this.end - this.listCount
        this.currentPage = num
        if (this.end > this.len) this.end = this.len
    }

    setPageCount() {
        if (this.pageCount >= this.pageLen) {
            this.endPage = this.pageLen - 1
        } else {
            this.endPage = this.pageCount
        }
    }
    /**
     * create an array of object {key:value} 
     * keys point to buttons
     * values are buttons corrisponding to the variables in the UI
     * all collected as soon as an instance of the object is instanciated
     */
    resetBtns(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].disabled) {
                arr[i].disabled.disabled = true
            } else if (arr[i].enabled) {
                arr[i].enabled.disabled = false
            } else {
                break
            }
        }
    }
    //: reset the page button previvous from disabled 'true' back to 'false'
    resetPrevBtn(arr) {
        for (let i of arr) {
            if (i.disabled === true) {
                i.disabled = false
                break
            }
        }
    }
    //: hide all page buttons that don't contain a class hide
    hideBtns(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i].classList.contains('hide')) {
                arr[i].classList.add('hide')
            }
        }
    }
}

/**
 * @INSTRUCTION
 * 1: initialize StartList and PageCount (number of items on the list in one page, number of pages)
 * 2: Set len (length) of data
 */