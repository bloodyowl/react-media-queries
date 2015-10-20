import getCollidingKey from "../getCollidingKey"

tape("getCollidingKey", (test) => {
  test.equal(getCollidingKey({a: 1}, {b: 2}), null)
  test.equal(getCollidingKey({a: 1}, {a: 2}), "a")
  test.equal(getCollidingKey({a: 1}, {b: 2}, {a: 3}), "a")
  test.equal(getCollidingKey({b: 1}, {a: 2}, {a: 3}), "a")
  test.end()
})
