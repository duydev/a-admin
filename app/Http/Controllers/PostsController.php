<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Post;
use Input;

class PostsController extends Controller
{
    public function getAll()
    {
        $posts = Post::all();

        return response()->success(compact('posts'));
    }

    public function get($id)
    {
        $post = Post::find($id);

        return response()->success($post);
    }

    public function create()
    {
        $post = Post::create([
            'title' => Input::get('title'),
            'short_content' => Input::get('short_content'),
            'content' => Input::get('content'),
            'image' => Input::get('image'),
            'slug' => Input::get('slug'),
            'status' => Input::get('status'),
        ]);

        return response()->success(compact('post'));
    }

    public function update(Request $request)
    {
        $userForm = array_dot(
            app('request')->only(
                'data.id',
                'data.title',
                'data.short_content',
                'data.content',
                'data.image',
                'data.slug',
                'data.status'
            )
        );

        $postId = intval($userForm['data.id']);

        $post = Post::find($postId);

        $this->validate($request, [
            'data.id' => 'required|integer',
            'data.title' => 'required|min:3',
            'data.content' => 'required|min:3',
            'data.slug' => 'required|min:3'
        ]);

        $userData = [
            'title' => $userForm['data.title'],
            'short_content' => $userForm['data.short_content'],
            'content' => $userForm['data.content'],
            'image' => $userForm['data.image'],
            'slug' => $userForm['data.slug'],
            'status' => $userForm['data.status']
        ];

        $affectedRows = Post::where('id', '=', $postId)->update($userData);

        return response()->success('success');
    }


    public function delete($id)
    {
        $post = Post::find($id);
        $post->delete();
        return response()->success('success');
    }
}
