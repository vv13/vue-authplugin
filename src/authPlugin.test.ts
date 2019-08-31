import authPlugin from './authPlugin'

const optionAuthCode = ['auth1', 'auth2']
const optionAuthMap = new Map([['canFly', 'auth1']])

test('init', () => {
  // init standard option type
  const instance = new authPlugin({
    authMap: optionAuthMap,
    authCode: optionAuthCode,
  })
  expect(instance.authCode.get('auth1')).toBe('auth1')
  expect(instance.authMap.get('canFly')).toBe('auth1')

  // init by other option type
  const instance2 = new authPlugin({
    authMap: { canFly: 'auth1' },
    authCode: ['auth1', 'auth2'],
  })
  expect(instance2.authCode.get('auth1')).toBe('auth1')
  expect(instance2.authMap.get('canFly')).toBe('auth1')
})
test('verify number authCode param', () => {
  const instance = new authPlugin({
    authCode: [1, 2, 3],
  })
  expect(instance.verify(1)).toBeTruthy()
  expect(instance.verify(2)).toBeTruthy()
  expect(instance.verify('3')).toBeFalsy()
  expect(instance.verify(3)).toBeTruthy()
})
test('verify string param', () => {
  const instance = new authPlugin({
    authMap: optionAuthMap,
    authCode: optionAuthCode,
  })
  expect(instance.verify('auth1')).toBeTruthy()
  expect(instance.verify('auth2')).toBeTruthy()
  expect(instance.verify('auth3')).toBeFalsy()
  expect(instance.verify('')).toBeTruthy()
})

test('verify array param', () => {
  const instance = new authPlugin({
    authMap: optionAuthMap,
    authCode: optionAuthCode,
  })
  expect(instance.verify(['auth1', 'auth3'])).toBeTruthy()
  expect(instance.verify(['auth3', 'auth4'])).toBeFalsy()
  expect(instance.verify([])).toBeTruthy()
})

test('verify object param', () => {
  const instance = new authPlugin({
    authMap: optionAuthMap,
    authCode: optionAuthCode,
  })
  expect(instance.verify({})).toBeTruthy()
  expect(instance.verify({ auth1: true, auth2: true })).toBeTruthy()
  expect(instance.verify({ auth1: true, auth2: false })).toBeFalsy()
  expect(instance.verify({ auth3: false, auth4: false })).toBeTruthy()
  expect(instance.verify({ canFly: true, auth4: false })).toBeTruthy()
})
