<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => ['web']], function () {
    Route::get('/', 'AngularController@serveApp');
    Route::get('/unsupported-browser', 'AngularController@unsupported');
    Route::get('user/verify/{verificationCode}', ['uses' => 'Auth\AuthController@verifyUserEmail']);
    Route::get('auth/{provider}', ['uses' => 'Auth\AuthController@redirectToProvider']);
    Route::get('auth/{provider}/callback', ['uses' => 'Auth\AuthController@handleProviderCallback']);
    Route::get('/api/authenticate/user', 'Auth\AuthController@getAuthenticatedUser');
});

$api->group(['middleware' => ['api']], function ($api) {
    $api->controller('auth', 'Auth\AuthController');

    // Password Reset Routes...
    $api->post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
    $api->get('auth/password/verify', 'Auth\PasswordResetController@verify');
    $api->post('auth/password/reset', 'Auth\PasswordResetController@reset');
});

$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    $api->get('users/me', 'UserController@getMe');
    $api->put('users/me', 'UserController@putMe');
});

$api->group(['middleware' => ['api', 'api.auth', 'role:admin.super|admin.user']], function ($api) {
    $api->controller('users', 'UserController');
});

$api->group(['middleware' => ['api', 'api.auth', 'role:admin.super']], function ($api) {
    // Category
    $api->get('category', 'CategoryController@getAll');
    $api->get('category/{id}', 'CategoryController@get');
    $api->get('categorylist', 'CategoryController@parentlist');

    $api->post('category', 'CategoryController@create');
    $api->put('category', 'CategoryController@update');
    $api->delete('category/{id}', 'CategoryController@delete');

    // Posts
    $api->get('posts', 'PostsController@getAll');
    $api->get('post/{id}', 'PostsController@get');
    $api->post('post', 'PostsController@create');
    $api->put('post', 'PostsController@update');
    $api->delete('post/{id}', 'PostsController@delete');

    // Image upload
    $api->post('upload', 'ImageController@upload');
});
