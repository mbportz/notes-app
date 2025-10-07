<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'title',
        'content',
    ];

    // Relationships
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function collaborators()
    {
        return $this->belongsToMany(User::class, 'note_collaborators')
            ->withPivot('can_edit', 'can_delete')
            ->withTimestamps();
    }
}
