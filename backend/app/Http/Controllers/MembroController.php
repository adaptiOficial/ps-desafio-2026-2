<?php

namespace App\Http\Controllers;

use App\Models\Membro;
use App\Http\Requests\StoreMembroRequest;
use App\Http\Requests\UpdateMembroRequest;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class MembroController extends Controller
{

    protected Membro $membro;

    public function __construct(Membro $membro)
    {
        $this->membro = $membro;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $membros = $this->membro->all();
        return response()->json($membros, Response::HTTP_OK);
    }

   
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMembroRequest $request): JsonResponse
    {
        $validatedData = $request->validated();
        $membro = $this->membro->create($validatedData);
        return response()->json($membro, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id): JsonResponse
    {
        $membro = $this->membro->findOrFail($id);
    
        return response()->json($membro, Response::HTTP_OK);
    }

  

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMembroRequest $request, String $id): JsonResponse
    {
        $validatedData = $request->validated();
        $membro = $this->membro->findOrFail($id);
        $membro->update($validatedData);
        return response()->json($membro, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id): JsonResponse
    {
        $membro = $this->membro->findOrFail($id);
        $membro->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
