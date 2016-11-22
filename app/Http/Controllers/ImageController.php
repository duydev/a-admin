<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;


use App\Http\Requests;

class ImageController extends Controller
{
    public function upload(Request $req)
    {
        if ($req->file('image')->isValid()) {
            $filename = $req->file('image')->getClientOriginalName();
            //$req->image->store('', 'upload');
            $file = $req->image->move(public_path("/upload"), $filename);
            $path = asset("upload/".$filename);
            return response()->success(compact('path'));
        }
        return response()->error();
    }
}
