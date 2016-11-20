<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

      $data = [
        [
          'parent_id' => 0,
          'name' => 'Hoạt Động',
          'slug' => 'hoat-dong'
        ],
        [
          'parent_id' => 0,
          'name' => 'Kỹ Năng',
          'slug' => 'ky-nang'
        ],
        [
          'parent_id' => 0,
          'name' => 'Văn Bản',
          'slug' => 'van-ban'
        ]
      ];

      Category::create($data);

    }
}
