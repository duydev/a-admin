<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

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
        'parent_id' => Input::get('parent_id'),
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

    public function parentlist()
    {
        // Lấy tất cả chuyên mục
        $cats = Category::all();
        $categorylist = collect([['id' => 0, 'name' => 'Đây là danh mục cha']]);
        //$categorylist = collect();

        // Đặt key cho tập hợp
        $cats = $cats->keyBy('id');

        // Hàng đợi
        $queue = [0];
        $name = [""];

        while (!$cats->isEmpty()) {
            // Tìm con
            $child = $cats->where('parent_id', end($queue))->first();
            // Nếu không tìm thấy
            if(!isset($child)) {
                // Bỏ phần tử cuối trong hàng đợi
                array_pop($queue);
                array_pop($name);
            } else {
                // Đổi tên
                if(end($queue) > 0)
                {
                    $child->name = end($name).' > '.$child->name;
                }
                // Đưa vào tập hợp kết quả
                $categorylist->push($child);
                // Đưa id vào hàng đợi
                array_push($queue, $child->id);
                array_push($name, $child->name);
                // Xóa child trong tập cats
                $cats->forget($child->id);
            }

        }

        return response()->success(compact('categorylist'));
    }
}
