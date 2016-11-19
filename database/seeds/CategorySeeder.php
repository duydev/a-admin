<?php

use Illuminate\Database\Seeder;

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
            'id' => 1,
            'name' => 'Hoạt Động'
        ],
        [
            'id' => 2,
            'name' => 'Kỹ Năng'
        ],
        [
            'id' => 4,
            'name' => 'Văn Bản'
        ]
      ];

      DB::table('category')->insert($data);

    }
}
