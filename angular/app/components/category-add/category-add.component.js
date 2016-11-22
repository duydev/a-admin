class CategoryAddController{
  constructor (API, $state, $stateParams, $scope, $speakingurl) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.API = API
    this.$speakingurl = $speakingurl
    this.alerts = []

    let ParentList = this.API.all('categorylist')
    ParentList.getList()
      .then( res => {
        this.parentlist = res.plain()
      })


    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }

  }

  genSlug() {
    let name = this.name
    this.slug = this.$speakingurl.getSlug(name, {lang: 'vn'})
  }

  save (isValid) {
    this.alerts = []
    //this.$state.go(this.$state.current, {}, { alerts: 'test' })
    if (isValid) {

      let Category = this.API.all('category')
      let $state = this.$state

      Category
        .post({
          'name': this.name,
          'parent_id': this.parent_id,
          'slug': this.slug
        })
        .then(function () {

          let alert = { type: 'success', 'title': 'Thành công!', msg: 'Chủ đề đã được thêm.' }
          //$state.go($state.current, { alerts: alert })

          $state.transitionTo($state.current, { alerts: alert }, {
              reload: true,
              inherit: false,
              notify: true
          })
        }, function (response) {

          let alert = { type: 'error', 'title': 'Lỗi!', msg: response.data.message }
          //$state.go($state.current, { alerts: alert})

          $state.transitionTo($state.current, { alerts: alert }, {
              reload: true,
              inherit: false,
              notify: true
          })
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
