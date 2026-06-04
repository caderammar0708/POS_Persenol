<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class CashierRouteAccessTest extends TestCase
{
    public function test_sales_routes_do_not_require_admin_middleware(): void
    {
        $salesIndex = Route::getRoutes()->getByName('sales.index');
        $salesHistory = Route::getRoutes()->getByName('sales.history');

        $this->assertNotNull($salesIndex);
        $this->assertNotNull($salesHistory);
        $this->assertFalse(in_array('admin', $salesIndex->gatherMiddleware(), true));
        $this->assertFalse(in_array('admin', $salesHistory->gatherMiddleware(), true));
    }
}
