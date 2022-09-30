function printReport(pages) {
    console.log("===========================")
    console.log("                           ")
    console.log("Report printing is starting")
    console.log("===========================")
    const so = sortPages(pages)
    for (const i of so){
        console.log(`Found ${i[0]} internal links to ${i[1]}`)
    }
}

function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a,b) =>{
        return b[1] - a[1];
    })
    return pagesArr
}

module.exports = {
    printReport, sortPages
}