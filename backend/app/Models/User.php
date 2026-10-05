<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;
use Throwable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasUuids, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'image',
        'password',
    ];

    protected static function booted()
    {
        self::deleted(function (User $user) {
            try {
                $image_name = explode('image/', $user['image']);
                Storage::disk('public')->delete('image/'.$image_name[1]);
            } catch (Throwable) {
            }
        });
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array<int, string>
     */
    protected $with = ['permissions'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class);
    }

    public function assignPermission(string $permission): void
    {
        if ($permission) {
            $permission = Permission::firstOrCreate([
                'name' => $permission,
            ]);

            $this->permissions()->attach($permission);
        }
    }

    public function hasPermission(string $permission): bool
    {
        return $this->permissions()->where('name', $permission)->exists();
    }

    public function removePermission(string $permission): void
    {
        $permission = Permission::find([
            'name' => $permission,
        ])->first();

        $this->permissions()->detach($permission);
    }

    /**
     * Get the array representation of the model.
     */
    public function toArray(): array
    {
        $array = parent::toArray();

        $array['permissions'] = $this->permissions->pluck('name')->toArray();

        return $array;
    }
}
