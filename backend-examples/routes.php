
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PetsController;
use App\Http\Controllers\OwnersController;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\VaccinationsController;
use App\Http\Controllers\ConsultationsController;
use App\Http\Controllers\LabTestsController;
use App\Http\Controllers\SurgeriesController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User profile
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Pets routes
    Route::apiResource('pets', PetsController::class);
    
    // Owners routes
    Route::apiResource('owners', OwnersController::class);
    Route::get('owners/{id}/pets', [OwnersController::class, 'getOwnerPets']);
    
    // Appointments routes
    Route::apiResource('appointments', AppointmentsController::class);
    Route::get('appointments/stats', [AppointmentsController::class, 'getStats']);
    
    // Vaccinations routes
    Route::apiResource('vaccinations', VaccinationsController::class);
    
    // Consultations routes
    Route::apiResource('consultations', ConsultationsController::class);
    
    // Lab tests routes
    Route::apiResource('laboratory', LabTestsController::class);
    
    // Surgeries routes
    Route::apiResource('surgery', SurgeriesController::class);
    
    // Shop routes
    Route::get('shop/products', [ShopController::class, 'getProducts']);
    Route::get('shop/products/{id}', [ShopController::class, 'getProductById']);
    Route::get('shop/cart', [ShopController::class, 'getCart']);
    Route::post('shop/cart/add', [ShopController::class, 'addToCart']);
    Route::put('shop/cart/update', [ShopController::class, 'updateCartItem']);
    Route::delete('shop/cart/remove', [ShopController::class, 'removeCartItem']);
    Route::post('shop/checkout', [ShopController::class, 'checkout']);
    Route::get('shop/orders', [ShopController::class, 'getOrders']);
    Route::get('shop/orders/{id}', [ShopController::class, 'getOrderById']);
});
