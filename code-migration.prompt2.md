Act as a senior backend engineer migrating a Spring Boot REST API to Express.js.

Requirements:
- Map Spring MVC controllers to Express routes correctly
- Replace annotations (@RestController, @Service, @Autowired) with JS-native patterns
- Preserve validation, business rules, and response contracts
- Use middleware for cross-cutting concerns (validation, errors, logging)
- Make the solution async-ready and production-grade
- add automated test

Do NOT:
- Replicate Spring annotations in JavaScript
- Create large monolithic route files

Provide:
- Express route definitions
- Service/domain logic
- Error handling strategy
- Brief explanation of key migration decisions

Spring Boot source:

package com.example.orders.controller;

import com.example.orders.domain.Order;
import com.example.orders.domain.OrderSummary;
import com.example.orders.service.OrderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/process")
    public OrderSummary processOrder(@RequestBody Order order) {
        return orderService.processOrder(order);
    }
}
