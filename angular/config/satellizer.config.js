export function SatellizerConfig ($authProvider) {
  'ngInject'

  $authProvider.httpInterceptor = function () {
    return true
  }

  $authProvider.loginUrl = '/api/auth/login'
  $authProvider.tokenRoot = 'data' // compensates success response macro
}
