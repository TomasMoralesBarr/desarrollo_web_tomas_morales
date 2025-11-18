package com.tarea4desarrollo.tarea4.services;

import com.tarea4desarrollo.tarea4.models.AvisoAdopcion;
import com.tarea4desarrollo.tarea4.repository.AvisoAdopcionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvisoAdopcionService {
    
    @Autowired
    private AvisoAdopcionRepo avisoRepo;
    
    public List<AvisoAdopcion> obtenerTodosLosAvisos() {
        return avisoRepo.findAll();
    }
    
    public AvisoAdopcion obtenerAvisoPorId(Integer id) {
        return avisoRepo.findById(id).orElse(null);
    }
}
