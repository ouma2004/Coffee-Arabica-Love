package com.example.coffee.controller;

import com.example.coffee.repository.OrderRepository;
import com.example.coffee.repository.ProductRepository;
import com.example.coffee.model.Order;
import com.example.coffee.model.OrderItem;
import java.time.LocalDate;
import java.util.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private ProductRepository productRepo;

    @GetMapping
    public List<Order> getAll() {
        return orderRepo.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/{id}")
    public Order getById(@PathVariable Long id) {
        return orderRepo.findById(id).orElse(null);
    }

    @GetMapping("/status/{status}")
    public List<Order> getByStatus(@PathVariable String status) {
        return orderRepo.findByStatus(status);
    }

    @PostMapping
    public Order create(@RequestBody Order order) {
        double total = 0;
        for (OrderItem item : order.getItems()) {
            var product = productRepo.findById(item.getProduct().getId()).orElse(null);
            if (product != null) {
                item.setProduct(product);
                item.setOrder(order);
                item.setPrice(product.getPrice() * item.getQuantity());
                total += item.getPrice();
            }
        }
        order.setTotal(total);
        return orderRepo.save(order);
    }

    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestBody String status) {
        status = status.replace("\"", "").trim();
        Order order = orderRepo.findById(id).orElse(null);
        if (order != null) {
            order.setStatus(status);
            return orderRepo.save(order);
        }
        return null;
    }

    @PutMapping("/{id}/payment")
    public Order updatePayment(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Order order = orderRepo.findById(id).orElse(null);
        if (order != null) {
            String payment = body.get("payment");
            order.setPayment(payment);
            return orderRepo.save(order);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        orderRepo.deleteById(id);
    }

    // ===== NOUVELLES STATISTIQUES =====

    @GetMapping("/stats/overview")
    public Map<String, Object> getOverview() {
        Map<String, Object> stats = new HashMap<>();

        List<Order> allOrders = orderRepo.findAll();

        // Total des ventes
        double totalRevenue = allOrders.stream()
                .mapToDouble(Order::getTotal)
                .sum();

        // Nombre de commandes
        stats.put("totalOrders", allOrders.size());
        stats.put("totalRevenue", totalRevenue);

        // Par statut
        stats.put("pending", orderRepo.findByStatus("PENDING").size());
        stats.put("preparing", orderRepo.findByStatus("PREPARING").size());
        stats.put("ready", orderRepo.findByStatus("READY").size());
        stats.put("delivered", orderRepo.findByStatus("DELIVERED").size());

        // Ventes aujourd'hui
        LocalDate today = LocalDate.now();
        double todayRevenue = allOrders.stream()
                .filter(o -> o.getCreatedAt().toLocalDate().equals(today))
                .filter(o -> "PAID".equals(o.getPayment())) // ✅ seulement payé
                .mapToDouble(Order::getTotal)
                .sum();

        stats.put("todayRevenue", todayRevenue);

        // Ventes ce mois
        int currentMonth = today.getMonthValue();
        double monthRevenue = allOrders.stream()
                .filter(o -> o.getCreatedAt().getMonthValue() == currentMonth)
                .filter(o -> "PAID".equals(o.getPayment()))
                .mapToDouble(Order::getTotal)
                .sum();
        stats.put("monthRevenue", monthRevenue);

        return stats;
    }

    @GetMapping("/stats/daily")
    public List<Map<String, Object>> getDailyStats() {
        List<Map<String, Object>> result = new ArrayList<>();
        List<Object[]> data = orderRepo.salesByDay();

        for (Object[] row : data) {
            Map<String, Object> item = new HashMap<>();
            item.put("date", row[0].toString());
            item.put("total", row[1]);
            result.add(item);
        }

        return result;
    }

    @GetMapping("/stats/monthly")
    public List<Map<String, Object>> getMonthlyStats() {
        List<Map<String, Object>> result = new ArrayList<>();
        List<Object[]> data = orderRepo.salesByMonth();

        for (Object[] row : data) {
            Map<String, Object> item = new HashMap<>();
            item.put("month", row[0]);
            item.put("total", row[1]);
            result.add(item);
        }

        return result;
    }

    @GetMapping("/stats/products")
    public List<Map<String, Object>> getProductStats() {
        List<Map<String, Object>> result = new ArrayList<>();

        // Compter les produits les plus vendus
        Map<String, Integer> productCount = new HashMap<>();
        Map<String, Double> productRevenue = new HashMap<>();

        List<Order> allOrders = orderRepo.findAll();
        for (Order order : allOrders) {
            for (OrderItem item : order.getItems()) {
                String productName = item.getProduct().getName();
                productCount.put(productName,
                        productCount.getOrDefault(productName, 0) + item.getQuantity());
                productRevenue.put(productName,
                        productRevenue.getOrDefault(productName, 0.0) + item.getPrice());
            }
        }

        for (String productName : productCount.keySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("product", productName);
            item.put("quantity", productCount.get(productName));
            item.put("revenue", productRevenue.get(productName));
            result.add(item);
        }

        // Trier par quantité décroissante
        result.sort((a, b) -> Integer.compare(
                (Integer) b.get("quantity"),
                (Integer) a.get("quantity")));

        return result;
    }
}