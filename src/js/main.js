'use strict'

/**
 * Aplica o efeito de roll nos links selecionados
 * @param  {[String]} selector Elemento que será aplicado efeito de rolagem no link
 * @return void
 */
function linkify(selector) {
  let nodes = document.querySelectorAll(selector)

  for (let i = 0, len = nodes.length; i < len; i++) {
    let node = nodes[i]
    node.innerHTML =
      '<span data-title="' + node.text + '">' + node.innerHTML + '</span>'
  }
}

function getLatestArticles() {
  let articlesDOM = document.querySelector('#articles')
  fetch('https://dev.to/api/articles?username=rodrigocnascimento').then(
    async (articlesResponse) => {
      const articles = await articlesResponse.json()

      for (let article of articles) {
        let articleElement = document.createElement('li')
        let articleLink = document.createElement('a')
        const articlePublishedISODate = new Intl.DateTimeFormat('pt-br').format(
          new Date(article.created_at).getTime()
        )

        articleLink.href = article.url
        articleLink.innerText = `${articlePublishedISODate} - ${article.title}`
        articleLink.className = 'article-link linkify'
        articleElement.appendChild(articleLink)
        articlesDOM.appendChild(articleElement)
      }
      linkify('.linkify')
    }
  )
}
/**
 * Muda o icone do menu de acordo com o array passado
 * @param  {String} selector Elemento que terá as classes trocadas
 * @param  {Array} classes Classes a serem trocadas
 * @return void
 */
function toggleIcon(element, classes) {
  classes.forEach((className) => element.classList.toggle(className))
}

try {
  const thx1138 = document.querySelector('#thx1138')

  thx1138.addEventListener('mouseover', (e) => (e.target.innerHTML = 'r?'))
  thx1138.addEventListener('mouseout', (e) => (e.target.innerHTML = 'r!'))

  getLatestArticles()

  linkify('.linkify')
} catch (e) {
  console.error(e)
}
