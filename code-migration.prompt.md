Migrate this Java code to modern JavaScript as a senior engineer.

Focus on:
- Business logic preservation
- Functional and immutable patterns
- Clear separation of concerns
- Async-ready design
- Avoiding Java-style coding in JS

Do NOT do a line-by-line translation.
Explain important design decisions briefly.

Java code:
public class OrderService {

    public OrderSummary processOrder(Order order) {
        if (order == null) {
            throw new IllegalArgumentException("Order cannot be null");
        }

        if (order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order has no items");
        }

        double total = 0.0;
        for (OrderItem item : order.getItems()) {
            total += item.getPrice() * item.getQuantity();
        }

        if (total > 1000) {
            total = total * 0.9; // 10% discount
        }

        return new OrderSummary(order.getId(), total);
    }
}

