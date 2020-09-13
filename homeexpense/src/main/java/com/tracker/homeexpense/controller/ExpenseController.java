package com.tracker.homeexpense.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import com.tracker.homeexpense.model.Category;
import com.tracker.homeexpense.model.Expense;
import com.tracker.homeexpense.repository.CategoryRepository;
import com.tracker.homeexpense.repository.ExpenseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExpenseController {
    
    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/expenses")
    Collection<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @GetMapping("/expenses/{id}")
    ResponseEntity<?> getExpenseById(@PathVariable Long id) {
        Optional<Expense> expense = expenseRepository.findById(id);
        return expense.map(response -> ResponseEntity.ok(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/expenses")
    ResponseEntity<Expense> createExpense(@Validated @RequestBody Expense expense) throws URISyntaxException {
        Expense savedExpense = expenseRepository.save(expense);
        return ResponseEntity.created(new URI("/api/category" + savedExpense.getId())).body(savedExpense);
    }

    @PutMapping("expenses/{id}")
    ResponseEntity<Expense> updateCategory(@Validated @RequestBody Expense expense) {
        Expense updatedExpense = expenseRepository.save(expense);
        return ResponseEntity.ok(updatedExpense);
    }

    @DeleteMapping("expenses/{id}")
    ResponseEntity<?> deleteExpense(@PathVariable Long id) { 
        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
