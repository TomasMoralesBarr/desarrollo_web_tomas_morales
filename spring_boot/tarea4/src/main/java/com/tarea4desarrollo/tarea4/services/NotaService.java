package com.tarea4desarrollo.tarea4.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tarea4desarrollo.tarea4.models.Nota;
import com.tarea4desarrollo.tarea4.repository.NotaRepo;

@Service
public class NotaService {
    
    @Autowired
    private NotaRepo notaRepo;
    
    @Transactional
    public Nota agregarNota(Integer avisoId, Integer valorNota) {
        if (valorNota < 1 || valorNota > 7) {
            throw new IllegalArgumentException("La nota debe estar entre 1 y 7");
        }
        
        Nota nota = new Nota();
        nota.setAvisoId(avisoId);
        nota.setNota(valorNota);
        
        return notaRepo.save(nota);
    }
    
    public Double obtenerPromedio(Integer avisoId) {
        Double promedio = notaRepo.findPromedioByAvisoId(avisoId);
        return promedio != null ? Math.round(promedio * 10.0) / 10.0 : null;
    }
    
    public Long contarNotas(Integer avisoId) {
        return notaRepo.countByAvisoId(avisoId);
    }
}
