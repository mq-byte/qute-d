const concurrencyFetch = async (arr, max = 5) => {
  const res = []
  let i = 0
  let k = 0
  let current = 0

  return new Promise((resolve, reject) => {
    const run = () => {
      while (current < max && i < arr.length) {
        ;((i) => {
          arr[i]()
            .then((r) => {
              res[i] = r
            })
            .finally(() => {
              current--
              if (i < arr.length) {
                run()
              }
              k++
              if (k === arr.length) {
                resolve(res)
              }
            })
        })(i)
        current++
        i++
      }
    }
    run()
  })
}

export default concurrencyFetch
