<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarefa;

use App\Models\Membro;
use App\Http\Requests\StoreMembroRequest;
use App\Http\Requests\UpdateMembroRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

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
    
    public function index()
    {
        $membros = Membro::all()->map(function ($membro) {            
            $membro->tarefas_count = \App\Models\Tarefa::where('membro_id', (string) $membro->id)->count();
                
            return $membro;
        });

        return response()->json($membros);
    }

   
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMembroRequest $request): JsonResponse
    {
        $validatedData = $request->validated();
        
        if (isset($validatedData['senha'])) {
            $validatedData['senha'] = bcrypt($validatedData['senha']);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('Membro', 'public');
            $validatedData['image'] = url('storage/' . $path);
        }

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
    public function update(Request $request, string $id)
    {
        $membro = Membro::findOrFail($id);
        
        if ($request->has('membro_destino_id') && !empty($request->membro_destino_id)) {
            Tarefa::where('membro_id', $membro->id)
                ->where('status', 'pendente')
                ->update(['membro_id' => $request->membro_destino_id]);
        }
        
        $membro->update($request->all());

        return response()->json(['message' => 'Membro atualizado e tarefas migradas (se aplicável).']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id): JsonResponse
    {
        $membro = $this->membro->findOrFail($id);

        if ($membro->image) {
            $imagePath = str_replace(url('storage/') . '/', '', $membro->image);
            Storage::disk('public')->delete($imagePath);
        }

        $membro->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
