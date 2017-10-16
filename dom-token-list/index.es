// http://jsfiddle.net/zaqtg/10
// https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
// https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
// https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
// https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter

class DOMTokenList {

  constructor (node, symbol) {

    const
      nodes = []
    , expression = /{(\w+|#)}/

    , visit = node =>
        node.localName
            ? ELEMENT_NODE (node.attributes)
            : expression.test (node.textContent) && nodes.push (node)

    , ELEMENT_NODE = (attrs) =>
        [].slice
          .call (attrs)
          .map  (attr => expression.test (attr.value) && nodes.push (attr))

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit, null)


    while (walker.nextNode ()) 0 // Walk all nodes and do nothing.


    for (node of nodes)
      (node.text = node.textContent)
        .match (/[^{]+(?=})/g)
        .map   (symbol => (this [symbol] || (this [symbol] = [])).push (node))

  }

  bind (context) {

    const
      reset = symbol =>
        this [symbol].map // more than one occurrence
          (node => node.textContent = node.text)
        && symbol

   // must both run independently not in tandem

    , restore = (symbol) =>
         this [symbol].map (node =>
           (node.textContent =
             node.textContent
               .split ('{'+symbol+'}')
               .join  (context [symbol])))

    Object
      .keys (this)
      .map  (reset)
      .map  (restore)
  }
}
