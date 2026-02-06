Act as a senior JavaScript engineer migrating legacy vanilla JavaScript
(ES5 / early ES6) code to a modern JavaScript version (ES2020+).

Requirements:
- Preserve business logic and runtime behavior exactly
- Upgrade syntax safely (var → const/let, functions → arrow where appropriate)
- Introduce modern language features only where they add clarity:
  - const / let
  - arrow functions
  - destructuring
  - optional chaining
  - nullish coalescing
  - async / await (where applicable)
- Improve readability, maintainability, and testability
- Separate pure logic from side effects
- Make the code async-ready without changing execution semantics
- Add automated tests (Jest or similar) covering core logic

Avoid:
- Line-by-line mechanical translation
- Over-engineering or unnecessary abstractions
- Introducing frameworks or build tools unless explicitly required
- Changing public APIs or breaking existing contracts
- Using Java-style or overly functional patterns that hurt clarity

Provide:
- Modernized JavaScript implementation
- Before vs after key changes (brief)
- Automated test examples
- Explanation of important migration decisions

Legacy JavaScript source:
// orderService.js (Legacy Vanilla JS)

// Constructor function (pre-ES6)
function OrderService() {}

OrderService.prototype.processOrder = function (order) {

    if (!order) {
        throw new Error("Order cannot be null");
    }

    if (!order.items || order.items.length === 0) {
        throw new Error("Order has no items");
    }

    var total = 0;

    for (var i = 0; i < order.items.length; i++) {
        var item = order.items[i];
        total = total + (item.price * item.quantity);
    }

    if (total > 1000) {
        total = total * 0.9; // 10% discount
    }

    return {
        orderId: order.id,
        total: total
    };
};

// Usage example
var service = new OrderService();

var order = {
    id: "ORD-101",
    items: [
        { price: 400, quantity: 2 },
        { price: 300, quantity: 1 }
    ]
};

try {
    var summary = service.processOrder(order);
    console.log("Order Summary:", summary);
} catch (e) {
    console.error("Error:", e.message);
}

