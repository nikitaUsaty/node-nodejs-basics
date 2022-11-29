const parseEnv = () => {
  let first = process.env.RSS_foo
  let second = process.env.RSS_bar

  console.log(`RSS_foo = ${first}; RSS_bar = ${second}`)
}

parseEnv()
