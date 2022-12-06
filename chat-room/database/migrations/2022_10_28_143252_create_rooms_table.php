<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();

            $table->string("name");

            $table->string("description")->default("");

            $table->smallInteger("slow_mode")->default(0);

            $table->boolean("is_private")->default(true);

            $table->boolean("read_only")->default(false);

            $table->boolean("locked")->default(false);

            $table->string("background_path")->nullable()->default(null);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rooms');
    }
};
