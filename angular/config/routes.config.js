export function RoutesConfig ($stateProvider, $urlRouterProvider) {
  'ngInject'

  var getView = (viewName) => {
    return `./views/app/pages/${viewName}/${viewName}.page.html`
  }

  var getLayout = (layout) => {
    return `./views/app/pages/${layout}/${layout}.page.html`
  }

  $urlRouterProvider.otherwise('/home')

  $stateProvider

  /***************/
  /* FRONT STATE */
  /***************/

    .state('app', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: getView('main-layout')
        },
        'header@app': {
          templateUrl: getView('header')
        },
        'footer@app': {
          templateUrl: getView('footer')
        },
        main: {}
      },
      data: {
        css: [
          'css/style.css',
          'css/custom.css'
        ],
        bodyClass: ''
      }
    })

    // Trang chủ
    .state('app.home', {
      url: '/home',
      views: {
        'main@app': {
          templateUrl: getView('home')
        }
      }
    })

  /***************/
  /* ADMIN STATE */
  /***************/
    .state('admin', {
      //abstract: true,
      url: '/admin',
      views: {
        'layout': {
          templateUrl: getLayout('admin-layout')
        },
        'header@admin': {
          templateUrl: getView('admin-header')
        },
        'footer@admin': {
          templateUrl: getView('admin-footer')
        },
        main: {}
      },
      data: {
        auth: true,
        bodyClass: 'hold-transition skin-blue sidebar-mini'
      }
    })
    .state('admin.dashboard', {
      url: '/',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          templateUrl: getView('admin-dashboard')
        }
      }
    })
    .state('admin.profile', {
      url: '/profile',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<user-profile></user-profile>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('admin.userlist', {
      url: '/user-lists',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<user-lists></user-lists>'
        }
      }
    })
    .state('admin.useredit', {
      url: '/user-edit/:userId',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<user-edit></user-edit>'
        }
      },
      params: {
        alerts: null,
        userId: null
      }
    })
    .state('admin.userroles', {
      url: '/user-roles',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<user-roles></user-roles>'
        }
      }
    })
    .state('admin.userpermissions', {
      url: '/user-permissions',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<user-permissions></user-permissions>'
        }
      }
    })
    .state('admin.userpermissionsadd', {
      url: '/user-permissions-add',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<user-permissions-add></user-permissions-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('admin.userpermissionsedit', {
      url: '/user-permissions-edit/:permissionId',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<user-permissions-edit></user-permissions-edit>'
        }
      },
      params: {
        alerts: null,
        permissionId: null
      }
    })
    .state('admin.userrolesadd', {
      url: '/user-roles-add',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<user-roles-add></user-roles-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('admin.userrolesedit', {
      url: '/user-roles-edit/:roleId',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<user-roles-edit></user-roles-edit>'
        }
      },
      params: {
        alerts: null,
        roleId: null
      }
    })


    // Hành động của admin

    // Đăng nhập admin
    .state('admin.login', {
      url: '/login',
      views: {
        'layout@': {
          templateUrl: getView('login')
        }
      },
      data: {
        auth: false, // Khong can xac thuc
        bodyClass: 'hold-transition login-page'
      },
      params: {
        registerSuccess: null,
        successMsg: null
      }
    })

    // Đăng xuất admin
    .state('admin.logout', {
      url: '/logout',
      views: {
        main: {
          controller: function ($rootScope, $scope, $auth, $state, AclService) {
            $auth.logout().then(function () {
              delete $rootScope.me
              AclService.flushRoles()
              AclService.setAbilities({})
              $state.go('admin')
            })
          }
        }
      },
      data: {
        auth: true // Can xac thuc
      }
    })

    .state('admin.loginloader', {
      url: '/login-loader',
      views: {
        'layout@': {
          templateUrl: getView('login-loader')
        }
      },
      data: {
        auth: false,
        bodyClass: 'hold-transition login-page'
      }
    })

    // Quên mật khẩu
    .state('admin.forgot_password', {
      url: '/forgot-password',
      views: {
        'layout@': {
          templateUrl: getView('forgot-password')
        }
      },
      data: {
        auth: false,
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('admin.reset_password', {
      url: '/reset-password/:email/:token',
      views: {
        'layout@': {
          templateUrl: getView('reset-password')
        }
      },
      data: {
        auth: false,
        bodyClass: 'hold-transition login-page'
      }
    })


    // Category
    .state('admin.category', {
      url: '/category',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          templateUrl: getView('admin-category')
        }
      },
      params: {
        alerts: null
      }
    })

    .state('admin.categoryedit', {
      url: '/category-edit/:categoryId',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<category-edit></category-edit>'
        }
      },
      params: {
        alerts: null,
        categoryId: null
      }
    })

    // Posts
    .state('admin.postlist', {
      url: '/post-list',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<post-list></post-list>'
        }
      }
    })
    .state('admin.postadd', {
      url: '/post-add',
      data: {
        auth: true
      },
      views: {
        'main@admin': {
          template: '<post-add></post-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('admin.postedit', {
      url: '/post-edit/:postId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<post-edit></post-edit>'
        }
      },
      params: {
        alerts: null,
        categoryId: null
      }
    })




}