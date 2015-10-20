const getCollidingKey = (...args) => {
  const map = {}
  let index = -1
  const length = args.length
  while(++index < length) {
    let object = args[index]
    for(let key in object) {
      if(!object.hasOwnProperty(key)) {
        continue
      }
      if(map.hasOwnProperty(key)) {
        return key
      }
      map[key] = true
    }
  }
  return null
}

export default getCollidingKey
