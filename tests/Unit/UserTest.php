<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function test_admin_role_is_detected_case_insensitively(): void
    {
        $user = new User([
            'role' => 'Admin',
            'email' => 'staff@example.com',
        ]);

        $this->assertTrue($user->isAdmin());
    }

    public function test_admin_email_is_detected_even_when_role_is_not_admin(): void
    {
        $user = new User([
            'role' => 'cashier',
            'email' => 'admin@example.com',
        ]);

        $this->assertTrue($user->isAdmin());
    }
}
