import {PostEditComponent} from './app/components/post-edit/post-edit.component';
import {PostAddComponent} from './app/components/post-add/post-add.component';
import {PostListComponent} from './app/components/post-list/post-list.component';

import { UserProfileComponent } from './app/components/user-profile/user-profile.component'
import { UserEditComponent } from './app/components/user-edit/user-edit.component'
import { UserPermissionsEditComponent } from './app/components/user-permissions-edit/user-permissions-edit.component'
import { UserPermissionsAddComponent } from './app/components/user-permissions-add/user-permissions-add.component'
import { UserPermissionsComponent } from './app/components/user-permissions/user-permissions.component'
import { UserRolesEditComponent } from './app/components/user-roles-edit/user-roles-edit.component'
import { UserRolesAddComponent } from './app/components/user-roles-add/user-roles-add.component'
import { UserRolesComponent } from './app/components/user-roles/user-roles.component'
import { UserListsComponent } from './app/components/user-lists/user-lists.component'
import { DashboardComponent } from './app/components/dashboard/dashboard.component'
import { NavSidebarComponent } from './app/components/nav-sidebar/nav-sidebar.component'
import { NavHeaderComponent } from './app/components/nav-header/nav-header.component'
import { LoginLoaderComponent } from './app/components/login-loader/login-loader.component'
import { ResetPasswordComponent } from './app/components/reset-password/reset-password.component'
import { ForgotPasswordComponent } from './app/components/forgot-password/forgot-password.component'
import { LoginFormComponent } from './app/components/login-form/login-form.component'

import { CategoryListComponent } from './app/components/category-list/category-list.component'
import {CategoryEditComponent} from './app/components/category-edit/category-edit.component';
import {CategoryAddComponent} from './app/components/category-add/category-add.component';

angular.module('app.components')
	.component('postEdit', PostEditComponent)
	.component('postAdd', PostAddComponent)
	.component('postList', PostListComponent)


  .component('userProfile', UserProfileComponent)
  .component('userEdit', UserEditComponent)
  .component('userPermissionsEdit', UserPermissionsEditComponent)
  .component('userPermissionsAdd', UserPermissionsAddComponent)
  .component('userPermissions', UserPermissionsComponent)
  .component('userRolesEdit', UserRolesEditComponent)
  .component('userRolesAdd', UserRolesAddComponent)
  .component('userRoles', UserRolesComponent)
  .component('userLists', UserListsComponent)
  .component('dashboard', DashboardComponent)
  .component('navSidebar', NavSidebarComponent)
  .component('navHeader', NavHeaderComponent)
  .component('loginLoader', LoginLoaderComponent)
  .component('resetPassword', ResetPasswordComponent)
  .component('forgotPassword', ForgotPasswordComponent)
  .component('loginForm', LoginFormComponent)

  .component('categoryList', CategoryListComponent)
  .component('categoryEdit', CategoryEditComponent)
  .component('categoryAdd', CategoryAddComponent)