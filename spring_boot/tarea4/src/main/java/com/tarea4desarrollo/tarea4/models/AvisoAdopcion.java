package com.tarea4desarrollo.tarea4.models;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "aviso_adopcion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvisoAdopcion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "fecha_ingreso", nullable = false)
    private LocalDateTime fechaIngreso;
    
    @Column(name = "comuna_id", nullable = false)
    private Integer comunaId;
    
    @Column(length = 100)
    private String sector;
    
    @Column(nullable = false, length = 200)
    private String nombre;
    
    @Column(nullable = false, length = 100)
    private String email;
    
    @Column(length = 15)
    private String celular;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoMascota tipo;
    
    @Column(nullable = false)
    private Integer cantidad;
    
    @Column(nullable = false)
    private Integer edad;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "unidad_medida", nullable = false, length = 1)
    private UnidadMedida unidadMedida;
    
    @Column(name = "fecha_entrega", nullable = false)
    private LocalDateTime fechaEntrega;
    
    @Column(length = 500)
    private String descripcion;
    
    @ManyToOne
    @JoinColumn(name = "comuna_id", insertable = false, updatable = false)
    private Comuna comuna;
    
    @OneToMany(mappedBy = "aviso")
    private List<Nota> notas;
    
    public enum TipoMascota {
        gato, perro
    }
    
    public enum UnidadMedida {
        a, m
    }
}