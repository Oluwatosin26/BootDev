const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')


test('normalize https://wagslane.dev/path/ to wagslane.dev/path', () => {
    expect(normalizeURL('https://wagslane.dev/path/')).toBe('wagslane.dev/path')
})
test('normalize https://wagsLane.Dev/path to wagslane.dev/path', () => {
    expect(normalizeURL('https://wagsLane.Dev/path')).toBe('wagslane.dev/path')
})
test('normalize https://wagslane.dev/path to wagslane.dev/path', () => {
    expect(normalizeURL('https://wagslane.dev/path')).toBe('wagslane.dev/path')
})
test('normalize http://wagslane.dev/path to wagslane.dev/path', () => {
    expect(normalizeURL('http://wagslane.dev/path')).toBe('wagslane.dev/path')
})

test('getting url from html', () => {
    const baseURL = 'https://blog.boot.dev'
    expect(getURLsFromHTML('<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>', baseURL)).toEqual([ 'https://blog.boot.dev/' ])
})

test('getting url from html', () => {
    const baseURL = 'https://blog.boot.dev'
    expect(getURLsFromHTML('<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>', baseURL)).toEqual([ 'https://blog.boot.dev/path/one' ])
})

test('getting url from html', () => {
    const baseURL = 'https://blog.boot.dev'
    expect(getURLsFromHTML('<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>', baseURL)).toEqual([  ])
})

test('getting url from html', () => {
    const baseURL = 'https://blog.boot.dev'
    expect(getURLsFromHTML('<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>', baseURL)).toEqual([ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ])
})



