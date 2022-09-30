const { JSDOM } = require('jsdom')
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));


function normalizeURL(url){
    const myUrl = new URL(url)
    output = `${myUrl.hostname}${myUrl.pathname}`    
    if (output.length > 0 && output.slice(-1) === '/'){
        output = output.slice(0, -1)
      }
    return output
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const documentObject = new JSDOM(htmlBody)
    const domElements = documentObject.window.document.querySelectorAll('a')
    //console.log(obj)
    for (const eachElement of domElements){
        if (eachElement.href.slice(0,1) === '/'){
            console.log(`${eachElement.href}`)
            try {
                urls.push(new URL(eachElement.href, baseURL).href)
            } catch(err) {
                console.log(`${err.message}: ${eachElement.href}`)
            }
        } else {
            console.log(`${eachElement.href}`)
            try {
                urls.push(new URL(eachElement.href).href)
            } catch(err) {
                console.log(`${err.message}: ${eachElement.href}`)
            }
        }
        
    }
    return urls
}

async function crawlPage2(baseURL, currentURL, pages){
    // if this is an offsite URL, bail immediately
  const currentUrlObj = new URL(currentURL)
  const baseUrlObj = new URL(baseURL)
  if (currentUrlObj.hostname !== baseUrlObj.hostname){
    return pages
  }
  
  const normalizedURL = normalizeURL(currentURL)

  // if we've already visited this page
  // just increase the count and don't repeat
  // the http request
  if (pages[normalizedURL] > 0){
    pages[normalizedURL]++
    return pages
  }

  // initialize this page in the map
  // since it doesn't exist yet
  pages[normalizedURL] = 1

  // fetch and parse the html of the currentURL
  console.log(`crawling ${currentURL}`)
  let htmlBody = ''
  try {
    const resp = await fetch(currentURL)
    if (resp.status > 399){
      console.log(`Got HTTP error, status code: ${resp.status}`)
      return pages
    }
    const contentType = resp.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response: ${contentType}`)
      return pages
    }
    htmlBody = await resp.text()
  } catch (err){
    console.log(err.message)
  }

  const nextURLs = getURLsFromHTML(htmlBody, baseURL)
  for (const nextURL of nextURLs){
    pages = await crawlPage2(baseURL, nextURL, pages)
  }

  return pages
}


async function crawlPage(baseURL){
    //console.log(`We are scrapping ${baseURL}`)
    try{
        const response = await fetch(baseURL)
        if (response.status > 399){
            console.log(`Got HTTP error, status code:${response.status}`)
            return
        }
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')){
            console.log(`Got non-html response ${contentType}`)
            return
        }
        console.log(await response.text())
    }catch(err){
        console.log(err.message)
    }
    
    
    //return response.json()
}
//const baseURL = 'https://blog.boot.dev'
//const linkTest = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
//const linkTest = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
//const linkTest = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
//const linkTest = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
//const linkAnalysis = getURLsFromHTML(linkTest, baseURL)
//console.log(linkAnalysis)

module.exports = {
    normalizeURL, getURLsFromHTML, crawlPage, crawlPage2
}