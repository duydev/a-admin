class CategoryEditController{
    constructor ($stateParams, $state, API) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }

    let categoryId = $stateParams.categoryId

    let Category = API.service('category')

    Category.one(categoryId).get()
      .then((response) => {
        this.category = API.copy(response)
      })
  }

  save (isValid) {
    if (isValid) {
      let $state = this.$state
      this.category.put()
        .then(() => {
          let alert = { type: 'success', 'title': 'Thành công!', msg: 'Chủ đề đã được cập nhật.' }
          $state.go($state.current, { alerts: alert})
        }, (response) => {
          let alert = { type: 'error', 'title': 'Lỗi!', msg: response.data.message }
          $state.go($state.current, { alerts: alert})
        })
    } else {
      this.formSubmitted = true
    }
  }

    $onInit(){
    }
}

export const CategoryEditComponent = {
    templateUrl: './views/app/components/category-edit/category-edit.component.html',
    controller: CategoryEditController,
    controllerAs: 'vm',
    bindings: {}
}
