void (_ => {

  //create an observer instance
  // Can always default to DOMContentLoaded
  // https://bugs.webkit.org/show_bug.cgi?id=38995#c26
  (new MutationObserver ( mutations => {

    for (let mutation of mutations)
      for (let node of mutation.addedNodes) {
           /^p/.test (node.rel)
             && /\-/.test (node.id)
             && load (node)

        !! /\-/.test (node.localName)
            && (link = document.querySelector ('#'+node.localName))
            && link.content
            && stamp.call (node, link.content)
            && customElements.upgrade (node)
      }
  }))

  .observe (document.documentElement, { childList: true, subtree: true })


  void


  [].slice
    .call (document.querySelectorAll ('[rel^=pre][id~="-"]'))
    .map  (load)


  // XHR Specs
  // https://xhr.spec.whatwg.org
  // Progress events
  // https://xhr.spec.whatwg.org/#interface-progressevent
  // Loader - https://trac.webkit.org/browser/trunk/WebCore/loader/loader.cpp
  function load (link) {
    let xhr = new XMLHttpRequest

    xhr.link   = link
    xhr.onload = onload
    // progress events won't fire unless defining before open
    xhr.open ('GET', link.href)
    xhr.responseType = 'document'
    // Max requests
    xhr.send ()
  }


  // https://bugs.webkit.org/show_bug.cgi?id=38995
  // https://www.w3.org/TR/html5/document-metadata.html#the-link-element
  // https://github.com/w3c/preload/pull/40
  function onload (link) {
    link = this.link

    let
      response =
        this.response

    , anchor =
        link.nextChild

    , template =
        link.content =
           response.querySelector ('template')

    for (let node of document.querySelectorAll (link.id))
    //(let node of document.getElementsByTagName (link.id))
      template && stamp.call (node, template)


    for (let node of response.querySelectorAll ('style,link,script'))
      process (link, node, anchor)
  }


  function process (link, node, anchor) {
      let
        // https://chromium.googlesource.com/chromium/src.git/+/0661feafc9a84f03b04dd3719b8aaa255dfaec63/third_party/WebKit/Source/core/loader/LinkLoader.cpp
        as = node.getAttribute ('as')

      , clone =
          document.createElement
            ('script' == as ? as : node.localName)

      void

      ['id', 'rel', 'href', 'src', 'textContent', 'as', 'defer', 'crossOrigin'/* , media */]
        // setAttribute won't work for textContent and likewise explicit set for crossorigin
        // Mutually exclusive!!! ?!??!?!?!?!?
        .map (attr => node [attr] && attr in clone && (clone [attr] = node [attr]))

      // use rel = 'preload stylesheet' for async
      // or use media=snuggsi => media || 'all' trick
      // loadCSS - https://github.com/filamentgroup/loadCSS
      // http://keithclark.co.uk/articles/loading-css-without-blocking-render
      'style' == as
      // https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/#markup-based-async-loader
        && (clone.rel = 'stylesheet')

      'script' == as // smelly
        && (clone.src = clone.href)

      link
        .parentNode
        .insertBefore (clone, anchor)
  }

  // Slot replacement & light DOM stamping
  // https://github.com/w3c/webcomponents/issues/288
  // https://dom.spec.whatwg.org/#slot-assigned-nodes
  function stamp (template) {

    template =
      document.importNode (template, true)

    let slot

    [] // distribute attributes
      .slice
      .call (template.attributes)
      .map  (attr =>
        !   this.attributes [attr.name]
        &&  this.setAttribute (attr.name, attr.value))


    for (let replacement of this.querySelectorAll ('[slot]'))
      (slot = (template.content || template).querySelector
       ( 'slot[name=' + replacement.getAttribute ('slot') + ']' ))

      && // this could be slow
        slot.parentNode.replaceChild (replacement, slot)

    return this.innerHTML = template.innerHTML
  }

}) ()

