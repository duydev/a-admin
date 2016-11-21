import { RouteBodyClassComponent } from './directives/route-bodyclass/route-bodyclass.component'
import { PasswordVerifyClassComponent } from './directives/password-verify/password-verify.component'
import {NgThumbClass} from './directives/ng-thumb/ng-thumb.component';

angular.module('app.components')
  .directive('routeBodyclass', RouteBodyClassComponent)
  .directive('passwordVerify', PasswordVerifyClassComponent)
  .directive('ngThumb', NgThumbClass)
