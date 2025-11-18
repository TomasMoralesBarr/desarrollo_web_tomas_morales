package com.tarea4desarrollo.tarea4.repository;

import com.tarea4desarrollo.tarea4.models.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotaRepo extends JpaRepository<Nota, Integer> {
    
    List<Nota> findByAvisoId(Integer avisoId);
    
    @Query("SELECT AVG(n.nota) FROM Nota n WHERE n.avisoId = :avisoId")
    Double findPromedioByAvisoId(@Param("avisoId") Integer avisoId);
    
    @Query("SELECT COUNT(n) FROM Nota n WHERE n.avisoId = :avisoId")
    Long countByAvisoId(@Param("avisoId") Integer avisoId);
}
