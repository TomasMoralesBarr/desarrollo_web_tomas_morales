package com.tarea4desarrollo.tarea4.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "nota")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Nota {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "aviso_id", nullable = false)
    private Integer avisoId;
    
    @Column(nullable = false)
    private Integer nota;
    
    @ManyToOne
    @JoinColumn(name = "aviso_id", insertable = false, updatable = false)
    private AvisoAdopcion aviso;
}
