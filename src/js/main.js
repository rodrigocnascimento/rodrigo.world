'use strict'

/**
 * Aplicação do efeito 3d no menu
 * @param  {[String]} menuSelector    Elemento que será aplicado o meu
 * @param  {[String]} contentSelector Elemento que contém o conteúdo
 * @return {[Meny menu]}
 */
function meny(menuSelector, contentSelector) {
  return Meny.create({
    // The element that will be animated in from off screen
    menuElement: document.querySelector(menuSelector),

    // The contents that gets pushed aside while Meny is active
    contentsElement: document.querySelector(contentSelector),

    // The alignment of the menu (top/right/bottom/left)
    position: 'left',
    threshold: 40,
  })
}

/**
 * Aplica o efeito de roll nos links selecionados
 * @param  {[String]} selector Elemento que será aplicado efeito de rolagem no link
 * @return void
 */
function linkify(selector) {
  if (!document.body.style['perspective']) {
    throw '[rollinkify] Property document.body.style.perspective not supported'
  }

  let nodes = document.querySelectorAll(selector)

  for (let i = 0, len = nodes.length; i < len; i++) {
    let node = nodes[i]
    node.innerHTML =
      '<span data-title="' + node.text + '">' + node.innerHTML + '</span>'
  }
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
  const menu = meny('#meny', '#content')

  let hamburguerMenu = document.querySelector('#menu-hamburguer > i')
  const thx1138 = document.querySelector('#thx1138')

  const toggleHamburguerMenu = function () {
    toggleIcon(hamburguerMenu, ['fa-arrow-right', 'fa-bars'])
  }

  hamburguerMenu.addEventListener('click', () => menu.open())
  thx1138.addEventListener('mouseover', (e) => (e.target.innerHTML = 'r?'))
  thx1138.addEventListener('mouseout', (e) => (e.target.innerHTML = 'r!'))

  menu.addEventListener('open', toggleHamburguerMenu)

  menu.addEventListener('close', toggleHamburguerMenu)

  linkify('.linkify')
} catch (e) {
  console.error(e)
}
