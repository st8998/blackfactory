export default function withLoading(attr = 'loading') {
  return function (func) {
    return function (...args) {
      this.setState({ [attr]: true })
      return Promise.resolve(func.apply(this, args))
        .catch(err => console.log(err, err.stack))
        .then(() => this.setState({ [attr]: false }))
    }
  }
}
