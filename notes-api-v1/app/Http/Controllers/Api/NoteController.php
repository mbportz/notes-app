<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    // GET /api/notes
    public function index(Request $request)
    {
        $user = $request->user();

        $notes = Note::query()
            ->where('owner_id', $user->id)
            ->orWhereHas('collaborators', function ($q) use ($user) {
                $q->where('users.id', $user->id);
            })
            ->latest('notes.id')
            ->paginate(10);

        return response()->json($notes);
    }

    // POST /api/notes
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'   => ['required', 'string', 'max:200'],
            'content' => ['nullable', 'string'],
        ]);

        $note = Note::create([
            'owner_id' => $request->user()->id,
            'title'    => $data['title'],
            'content'  => $data['content'] ?? null,
        ]);

        return response()->json($note, 201);
    }

    // GET /api/notes/{note}
    public function show(Request $request, Note $note)
    {
        $user = $request->user();

        $canSee = $note->owner_id === $user->id
            || $note->collaborators()->where('users.id', $user->id)->exists();

        abort_unless($canSee, 403, 'Not authorized to view this note.');

        return response()->json($note);
    }

    // PUT/PATCH /api/notes/{note}
    public function update(Request $request, Note $note)
    {
        abort_unless($note->owner_id === $request->user()->id, 403, 'Only owner can update.');

        $data = $request->validate([
            'title'   => ['sometimes', 'string', 'max:200'],
            // content can be null (to clear) → use nullable so empty string is allowed too
            'content' => ['nullable', 'string'],
        ]);

        $note->update($data);

        return response()->json($note->refresh());
    }

    // DELETE /api/notes/{note}
    public function destroy(Request $request, Note $note)
    {
        abort_unless($note->owner_id === $request->user()->id, 403, 'Only owner can delete.');

        $note->delete();

        return response()->json(null, 204);
    }
}
