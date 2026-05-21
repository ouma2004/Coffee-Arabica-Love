package com.example.coffee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.coffee.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(String status);

    List<Order> findAllByOrderByCreatedAtDesc();

    @Query("SELECT DATE(o.createdAt), SUM(o.total) FROM Order o GROUP BY DATE(o.createdAt)")
    List<Object[]> salesByDay();

    @Query("SELECT FUNCTION('MONTH', o.createdAt), SUM(o.total) FROM Order o GROUP BY FUNCTION('MONTH', o.createdAt)")
    List<Object[]> salesByMonth();

}
