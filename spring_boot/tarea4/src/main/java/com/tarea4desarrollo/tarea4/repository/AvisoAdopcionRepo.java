package com.tarea4desarrollo.tarea4.repository;

import com.tarea4desarrollo.tarea4.models.AvisoAdopcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvisoAdopcionRepo extends JpaRepository<AvisoAdopcion, Integer> {
}
