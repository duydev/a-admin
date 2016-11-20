<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  protected $fillable = [
    'category_id',
    'user_id',
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

    static::updating(function($table)  {
    });

    static::deleting(function($table)  {
    });

    static::saving(function($table)  {
    });
  }

  public function category() {
    return $this->belongsTo('Category', 'parent_id');
  }

  public function user() {
    return $this->belongsTo('Users', 'user_id');
  }


}
