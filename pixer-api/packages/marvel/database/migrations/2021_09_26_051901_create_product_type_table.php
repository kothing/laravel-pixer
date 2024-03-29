<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('author_id')->nullable();
            $table->foreign('author_id')->references('id')->on('authors')->onDelete('cascade');
            $table->unsignedBigInteger('manufacturer_id')->nullable();
            $table->foreign('manufacturer_id')->references('id')->on('manufacturers')->onDelete('cascade');
            $table->boolean('is_digital')->default(0);
            $table->boolean('is_external')->default(0);
            $table->string('external_product_url')->nullable();
            $table->string('external_product_button_text')->nullable();
            $table->string('blocked_dates')->nullable();
        });

        Schema::create('digital_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('attachment_id');
            $table->string('url');
            $table->string('file_name');
            $table->string('fileable_type');
            $table->unsignedBigInteger('fileable_id');
            $table->timestamps();
        });

        Schema::create('ordered_files', function (Blueprint $table) {
            $table->id();
            $table->string('purchase_key');
            $table->unsignedBigInteger('digital_file_id');
            $table->foreign('digital_file_id')->references('id')->on('digital_files')->onDelete('cascade');
            $table->string('tracking_number')->nullable();
            $table->foreign('tracking_number')->references('tracking_number')->on('orders')->onDelete('cascade');
            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('download_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('token');
            $table->boolean('downloaded')->default(0);
            $table->unsignedBigInteger('digital_file_id')->nullable();
            $table->text('payload')->nullable();
            $table->foreign('digital_file_id')->references('id')->on('digital_files')->onDelete('cascade');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps();
        });

        Schema::table('variation_options', function (Blueprint $table) {
            $table->json('image')->after('title')->nullable();
            $table->boolean('is_digital')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('digital_files');
        Schema::dropIfExists('download_tokens');
        Schema::dropIfExists('ordered_files');
    }
}
