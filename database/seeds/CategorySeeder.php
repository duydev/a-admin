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
            'name' => 'Hoạt Động',
            'slug' => 'hoat-dong'
        ],
        [
            'name' => 'Kỹ Năng',
            'slug' => 'ky-nang'
        ],
        [
            'name' => 'Văn Bản',
            'slug' => 'van-ban'
        ]
      ];

      Category::create($data);

    }
}
