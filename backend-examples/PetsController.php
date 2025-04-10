
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;
use Illuminate\Support\Facades\Validator;

class PetsController extends Controller
{
    /**
     * Display a listing of the pets.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pets = Pet::with('owner')->orderBy('created_at', 'desc')->get();
        return response()->json($pets);
    }

    /**
     * Display the specified pet.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $pet = Pet::with('owner')->find($id);
        
        if (!$pet) {
            return response()->json(['error' => 'Pet not found'], 404);
        }
        
        return response()->json($pet);
    }

    /**
     * Store a newly created pet in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'species' => 'required|string|max:50',
            'owner_id' => 'required|exists:owners,id',
            'breed' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:male,female,unknown',
            'microchip_id' => 'nullable|string|max:50',
            'weight' => 'nullable|numeric',
            'weight_unit' => 'nullable|in:kg,lb',
            'allergies' => 'nullable|string',
            'existing_conditions' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $pet = Pet::create($request->all());
        return response()->json([
            'message' => 'Pet created successfully',
            'data' => $pet
        ], 201);
    }

    /**
     * Update the specified pet in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $pet = Pet::find($id);
        
        if (!$pet) {
            return response()->json(['error' => 'Pet not found'], 404);
        }
        
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:50',
            'species' => 'sometimes|string|max:50',
            'owner_id' => 'sometimes|exists:owners,id',
            'breed' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'date_of_birth' => 'nullable|date',
            'gender' => 'sometimes|in:male,female,unknown',
            'microchip_id' => 'nullable|string|max:50',
            'weight' => 'nullable|numeric',
            'weight_unit' => 'nullable|in:kg,lb',
            'allergies' => 'nullable|string',
            'existing_conditions' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Update the pet with the new data
        $pet->update($request->all());
        
        return response()->json([
            'message' => 'Pet updated successfully',
            'data' => $pet
        ]);
    }

    /**
     * Remove the specified pet from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pet = Pet::find($id);
        
        if (!$pet) {
            return response()->json(['error' => 'Pet not found'], 404);
        }
        
        $pet->delete();
        return response()->json(['message' => 'Pet deleted successfully']);
    }
}
