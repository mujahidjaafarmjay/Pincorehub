<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RoutingTest extends TestCase
{
    /** @test */
    public function it_can_access_a_test_route()
    {
        $this->get('/api/test-route')->assertOk();
    }
}
