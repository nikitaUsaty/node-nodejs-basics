import { Worker, isMainThread } from 'node:worker_threads'

import { cpus } from 'os'

const performCalculations = async () => {
  let resultArray = []

  const CPUs = cpus()

  if (isMainThread) {
    const threadAmount = CPUs.length

    const threads = new Set()

    let n = 10

    for (let i = 0; i < threadAmount - 1; i++) {
      threads.add(
        new Worker('./src/wt/worker.js', {
          workerData: { n: n++, order: n },
        })
      )
    }
    for (let worker of threads) {
      worker.on('error', (err) => {
        resultArray.push({ status: 'error', data: null })
      })

      worker.on('exit', () => {
        threads.delete(worker)

        if (threads.size === 0) {
          console.log(sortArr(resultArray))
        }
      })

      worker.on('message', (msg) => {
        resultArray.push(msg)
      })
    }
  }
}

await performCalculations()

const sortArr = (arr) => {
  let sortedArr = arr.sort((a, b) => a.order - b.order)
  sortedArr.map((el) => delete el.order)

  return sortedArr
}
