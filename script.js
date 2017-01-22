let configuration = {
  get: function (target, name) {
    console.log ('Name', name)
    console.log ('Target', target)

    return target[name] || 'SHAZAAAM!'
  }
}

class Dummy {
  constructor (configuration) {
    this.foo = 'foo'
    console.log ('this', this)

    return new Observer (this, configuration)
  }

  get bar () { return 'bar' }
}

window.dummy = new Dummy (configuration)
//window.dummy = new Dummy (new Validator)
console.log (dummy)

window.state = new State ({foo: 'bar', baz: 'bat'})

state.foo = 'w'

console.log (state.foo)
