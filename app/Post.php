<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  protected $fillable = [
    'title',
    'short_content',
    'content',
    'image',
    'slug',
    'status'
  ];

  public static function boot() {

    parent::boot();

    static::creating(function ($model) {
        $model->setCreatedAt($model->freshTimestamp());
    });

    // create a event to happen on updating
    static::updating(function($table)  {
    //  $table->updated_by = Auth::user()->username;
    });

    // create a event to happen on deleting
    static::deleting(function($table)  {
    //  $table->deleted_by = Auth::user()->username;
    });

    // create a event to happen on saving
    static::saving(function($table)  {
    //  $table->created_by = Auth::user()->username;
    });
  }
}
