class PostAddController{
    constructor($scope, API, FileUploader){
      'ngInject';

      // Khoi tao file uploader
      var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php',
        queueLimit: 1 // Upload 1 file duy nhat
      });

      // Filters
      uploader.filters.push({
        name: 'imageFilter',
        fn: function(item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });

      // Handle uploader event
      uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
      };

      $scope.showUpload = function()
      {
        uploader.clearQueue();
        document.getElementById('upload').click()
      }


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
