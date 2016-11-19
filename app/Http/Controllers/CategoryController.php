<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Category;
use Input;

class CategoryController extends Controller
{

  public function getAll()
  {
      $category = Category::all();

      return response()->success(compact('category'));
  }

  public function get($id)
  {
      $category = Category::find($id);

      return response()->success($category);
  }

  public function create()
    {
        $category = Category::create([
            'name' => Input::get('name'),
            'slug' => Input::get('slug')
        ]);

        return response()->success(compact('category'));
    }

  public function update(Request $request)
  {
      $userForm = array_dot(
          app('request')->only(
              'data.id',
              'data.name',
              'data.slug'
          )
      );

      $categoryId = intval($userForm['data.id']);

      $category = Category::find($categoryId);

      $this->validate($request, [
          'data.id' => 'required|integer',
          'data.name' => 'required|min:3',
          'data.slug' => 'required|min:3'
      ]);

      $userData = [
          'name' => $userForm['data.name'],
          'slug' => $userForm['data.slug']
      ];

      $affectedRows = Category::where('id', '=', $categoryId)->update($userData);

      return response()->success('success');
  }


  public function delete($id)
  {
      $category = Category::find($id);
      $category->delete();
      return response()->success('success');
  }

}
