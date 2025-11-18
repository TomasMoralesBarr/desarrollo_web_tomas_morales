package com.tarea4desarrollo.tarea4.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comuna")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comuna {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false, length = 200)
    private String nombre;
    
    @Column(name = "region_id", nullable = false)
    private Integer regionId;
    
    @ManyToOne
    @JoinColumn(name = "region_id", insertable = false, updatable = false)
    private Region region;
}