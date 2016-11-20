class PostAddController{
    constructor($scope, API){
      'ngInject';

      let Category = API.service('category')

      Category.getList()
        .then( res => {
          $scope.category = res.plain()
        })

      $scope.editorOptions = {
          // settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
      };

    }

    $onInit(){
    }
}

export const PostAddComponent = {
    templateUrl: './views/app/components/post-add/post-add.component.html',
    controller: PostAddController,
    controllerAs: 'vm',
    bindings: {}
}
