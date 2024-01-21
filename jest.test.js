// 运行 npx jest jest.test.js 进行检测
test('test common matcher', () => {
  expect( 2 + 2 ).toBe(4)
  expect(2 + 2).not.toBe(5)
})

test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  expect(4).toBeGreaterThan(3)
  expect(2).toBeLessThan(3)
})

test('test object', () => {
  expect({name: '1111'}).toEqual({name: '1111'})
})