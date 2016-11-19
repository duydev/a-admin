class ForgotPasswordController {
  constructor (API, $state) {
    'ngInject'

    this.API = API
    this.$state = $state
    this.formSubmitted = false
    this.serverError = ''
  }

  $onInit () {
    this.email = ''
  }

  submit () {
    this.serverError = ''

    this.API.all('auth/password/email').post({
      email: this.email
    }).then(() => {
      this.$state.go('admin.login', { successMsg: `Bạn vừa nhận được một email kèm theo link reset lại mật khẩu.` })
    }, (res) => {
      for (var error in res.data.errors) {
        this.serverError += res.data.errors[error] + ' '
      }
      this.formSubmitted = true
    })
  }
}

export const ForgotPasswordComponent = {
  templateUrl: './views/app/components/forgot-password/forgot-password.component.html',
  controller: ForgotPasswordController,
  controllerAs: 'vm',
  bindings: {}
}
