package com.tracker.homeexpense.model;

import java.time.Instant;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "expense")
public class Expense {
    
    @Id
    private Long id;

    private String description;

    @Column(name = "expense_date")
    private Instant expenseDate;

    private String place; 

    @ManyToOne
    private Category category;

    @ManyToOne
    private User user;

    public Expense() {
    }

    public Expense(Long id, String description, Instant expenseDate, String place, Category category, User user) {
        this.id = id;
        this.description = description;
        this.expenseDate = expenseDate;
        this.place = place;
        this.category = category;
        this.user = user;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getExpenseDate() {
        return this.expenseDate;
    }

    public void setExpenseDate(Instant expenseDate) {
        this.expenseDate = expenseDate;
    }

    public String getPlace() {
        return this.place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Expense id(Long id) {
        this.id = id;
        return this;
    }

    public Expense description(String description) {
        this.description = description;
        return this;
    }

    public Expense expenseDate(Instant expenseDate) {
        this.expenseDate = expenseDate;
        return this;
    }

    public Expense place(String place) {
        this.place = place;
        return this;
    }

    public Expense category(Category category) {
        this.category = category;
        return this;
    }

    public Expense user(User user) {
        this.user = user;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Expense)) {
            return false;
        }
        Expense expense = (Expense) o;
        return Objects.equals(id, expense.id) && Objects.equals(description, expense.description) && Objects.equals(expenseDate, expense.expenseDate) && Objects.equals(place, expense.place) && Objects.equals(category, expense.category) && Objects.equals(user, expense.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, description, expenseDate, place, category, user);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", description='" + getDescription() + "'" +
            ", expenseDate='" + getExpenseDate() + "'" +
            ", place='" + getPlace() + "'" +
            ", category='" + getCategory() + "'" +
            ", user='" + getUser() + "'" +
            "}";
    }

    

}