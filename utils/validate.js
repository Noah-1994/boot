const validate = (rules) => {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    if (typeof rule.pass === 'function') {
      const res = rule.pass()
      if (!res) return rule.message
    } else if (!rule.pass) return rule.message
  }
  return false
}

class Rule {
  constructor (pass, message) {
    this.pass = pass
    this.message = message
  }
}

module.exports = {
  validate, Rule
}
