<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->string('path')->unique();
            // $table->text('description')->nullable();
            $table->string('type', 10)->comment('File type, as such: image, video, audio, archive');
            $table->unsignedBigInteger('task_id')->nullable();
            $table->timestamps();

            $table->foreign('task_id')
            ->references('id')
            ->on('tasks')
            ->onDelete('CASCADE')
            ->onUpdate('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
}
