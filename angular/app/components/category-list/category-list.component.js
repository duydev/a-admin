class CategoryListController{
  constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state

    let Category = this.API.all('category')

    Category.getList()
      .then((response) => {
        let dataSet = response.plain()

        this.dtOptions = DTOptionsBuilder.newOptions()
          .withOption('data', dataSet)
          .withOption('createdRow', createdRow)
          .withOption('responsive', true)
          //.withLanguageSource('//cdn.datatables.net/plug-ins/1.10.12/i18n/Vietnamese.json')
          .withBootstrap()

        this.dtColumns = [
          DTColumnBuilder.newColumn('id').withTitle('ID'),
          DTColumnBuilder.newColumn('name').withTitle('Tên'),
          DTColumnBuilder.newColumn('slug').withTitle('SEO URL'),
          DTColumnBuilder.newColumn(null).withTitle('Hành động').notSortable()
            .renderWith(actionsHtml)
        ]

        this.displayTable = true
      })

    let createdRow = (row) => {
      $compile(angular.element(row).contents())($scope)
    }

    let actionsHtml = (data) => {
      return `
                <a class="btn btn-xs btn-warning" ui-sref="admin.categoryedit({categoryId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
    }
  }

  update ()
  {
    let API = this.API
    let $scope = this.$scope
    let $compile = this.$compile
    let DTOptionsBuilder = this.DTOptionsBuilder
    let DTColumnBuilder = this.DTColumnBuilder

    let Category = API.all('category')

    Category.getList()
      .then((response) => {
        let dataSet = response.plain()

        this.dtOptions = DTOptionsBuilder.newOptions()
          .withOption('data', dataSet)
          .withOption('createdRow', createdRow)
          .withOption('responsive', true)
          //.withLanguageSource('//cdn.datatables.net/plug-ins/1.10.12/i18n/Vietnamese.json')
          .withBootstrap()

        this.dtColumns = [
          DTColumnBuilder.newColumn('id').withTitle('ID'),
          DTColumnBuilder.newColumn('name').withTitle('Tên'),
          DTColumnBuilder.newColumn('slug').withTitle('SEO URL'),
          DTColumnBuilder.newColumn(null).withTitle('Hành động').notSortable()
            .renderWith(actionsHtml)
        ]

        this.displayTable = true
      })

    let createdRow = (row) => {
      $compile(angular.element(row).contents())($scope)
    }

    let actionsHtml = (data) => {
      return `
                <a class="btn btn-xs btn-warning" ui-sref="admin.categoryedit({categoryId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
    }

  }

  delete (categoryId) {
      let API = this.API
      let $state = this.$state

      swal({
        title: 'Bạn có chắc không?',
        text: 'Bạn sẽ không thể phục hồi lại dữ liệu!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Có, hãy xóa nó!',
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        html: false
      }, function () {
        API.one('category', categoryId).remove()
          .then(() => {
            swal({
              title: 'Đã xóa!',
              text: 'Chủ đề đã được xóa.',
              type: 'success',
              confirmButtonText: 'OK',
              closeOnConfirm: true
            }, function () {
              $state.reload()
            })
          })
      })
    }

  $onInit(){
  }

}

export const CategoryListComponent = {
    templateUrl: './views/app/components/category-list/category-list.component.html',
    controller: CategoryListController,
    controllerAs: 'vm',
    bindings: {}
}
