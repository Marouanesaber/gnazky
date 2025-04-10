
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'name',
        'species',
        'breed',
        'color',
        'date_of_birth',
        'gender',
        'microchip_id',
        'weight',
        'weight_unit',
        'allergies',
        'existing_conditions',
        'notes',
        'insurance_provider',
        'insurance_policy_number',
        'status',
    ];

    // Define relationship with owner
    public function owner()
    {
        return $this->belongsTo(Owner::class);
    }

    // Define relationship with appointments
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
    
    // Define relationship with vaccinations
    public function vaccinations()
    {
        return $this->hasMany(Vaccination::class);
    }
    
    // Define relationship with lab tests
    public function labTests()
    {
        return $this->hasMany(LabTest::class);
    }
    
    // Define relationship with surgeries
    public function surgeries()
    {
        return $this->hasMany(Surgery::class);
    }
    
    // Define relationship with consultations
    public function consultations()
    {
        return $this->hasMany(Consultation::class);
    }
}
