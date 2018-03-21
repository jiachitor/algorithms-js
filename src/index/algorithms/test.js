module.exports = {
  getOne: function () {
    return new Promise((resolve, reject) => {
      // 这个 api 是公开的。
      fetch('http://api.icndb.com/jokes/random')
        .then(res => res.json())
        .then(data => {
          resolve(data.value.joke);
        })
    })
  }
}