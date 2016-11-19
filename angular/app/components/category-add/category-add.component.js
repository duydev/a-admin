class CategoryAddController{
  constructor (API, $state, $stateParams) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.API = API
    this.alerts = []

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }
  }

  save (isValid) {
    this.$state.go(this.$state.current, {}, { alerts: 'test' })
    if (isValid) {

      let Category = this.API.all('category')
      let $state = this.$state

      Category
        .post({
          'name': this.name,
          'slug': this.slug
        })
        .then(function () {
          let alert = { type: 'success', 'title': 'Thành công!', msg: 'Chủ đề đã được thêm.' }
          $state.go($state.current, { alerts: alert})
        }, function (response) {
          let alert = { type: 'error', 'title': 'Lỗi!', msg: response.data.message }
          $state.go($state.current, { alerts: alert})
        })

    } else {
      this.formSubmitted = true
    }
  }
}

export const CategoryAddComponent = {
    templateUrl: './views/app/components/category-add/category-add.component.html',
    controller: CategoryAddController,
    controllerAs: 'vm',
    bindings: {}
}
