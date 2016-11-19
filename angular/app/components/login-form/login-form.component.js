class LoginFormController {
  constructor ($rootScope, $auth, $state, $stateParams, API, AclService) {
    'ngInject'

    delete $rootScope.me

    this.$auth = $auth
    this.$state = $state
    this.$stateParams = $stateParams
    this.AclService = AclService

    this.successMsg = $stateParams.successMsg
    this.loginfailederror = ''
    this.loginfailed = false
  }

  $onInit () {
    this.username = ''
    this.password = ''
  }

  login () {
    this.loginfailederror = ''
    this.loginfailed = false

    let user = {
      username: this.username,
      password: this.password
    }

    this.$auth.login(user)
      .then((response) => {
        let data = response.data.data
        let AclService = this.AclService

        angular.forEach(data.userRole, function (value) {
          AclService.attachRole(value)
        })

        AclService.setAbilities(data.abilities)
        this.$auth.setToken(response.data)
        this.$state.go('admin.dashboard')
      })
      .catch(this.failedLogin.bind(this))
  }

  failedLogin (res) {
    if (res.status == 401) {
      this.loginfailed = true
    } else {

      // other kinds of error returned from server
      for (var error in res.data.errors) {
        this.loginfailederror += res.data.errors[error] + ' '
      }

    }
  }
}

export const LoginFormComponent = {
  templateUrl: './views/app/components/login-form/login-form.component.html',
  controller: LoginFormController,
  controllerAs: 'vm',
  bindings: {}
}
