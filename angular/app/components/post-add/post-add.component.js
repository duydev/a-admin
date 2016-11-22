class PostAddController{
    constructor($scope, API, FileUploader, $http){
      'ngInject';

      this.API = API

      // Khoi tao file uploader
      var uploader = $scope.uploader = new FileUploader({
        url: '/api/upload',
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

      this.showUpload = function()
      {
        uploader.clearQueue();
        document.getElementById('upload').click()
      }

      // Handle uploader event
      uploader.onAfterAddingFile = function(fileItem) {
        /*uploader.uploadItem(fileItem)
            .then(res => {
                console.debug(res)
            })*/
        console.debug(fileItem)

        let formData = new FormData()
        formData.append('image', fileItem._file)

        $http.post('/api/upload', formData,{
            transformRequest:angular.identity,
            headers:{'Content-type':undefined}
        }).then(res => {
            this.image = res.plain()
        })


      }




      let Category = this.API.all('category')

    Category.getList()
        .then((response) => {
            this.category = response.plain()
        })

      $scope.editorOptions = {
          // settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
      }

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
