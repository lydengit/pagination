export class Fetch {
    //: !important - url must be provided at the instanciating
    constructor(url) {
        this.url = url
    }
    //: fetch data from DB and converts to JSON
    static async fetchData(src) {
        let res = await fetch(src)
        let data = await res.json()
        return data
    }
    //:return data obj
    async loadData() {
        let data = await Fetch.fetchData(this.url).then(data => (data))
        return data
    }
}