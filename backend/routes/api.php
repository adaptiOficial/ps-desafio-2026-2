<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\ProjetoMembroController;
use App\Http\Controllers\TarefaController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
});

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::apiResource('membros', \App\Http\Controllers\MembroController::class);
Route::apiResource('projetos', \App\Http\Controllers\ProjetoController::class);
Route::post('projetos/{projeto}/membros', [ProjetoMembroController::class, 'store']);
Route::apiResource('tarefas', TarefaController::class);

require __DIR__.'/auth.php';
