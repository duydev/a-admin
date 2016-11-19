<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  protected $table = 'category';
  protected $fillable = ['name', 'slug'];

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
