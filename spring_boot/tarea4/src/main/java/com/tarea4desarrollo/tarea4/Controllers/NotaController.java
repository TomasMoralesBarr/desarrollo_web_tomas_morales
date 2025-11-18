package com.tarea4desarrollo.tarea4.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tarea4desarrollo.tarea4.models.Nota;
import com.tarea4desarrollo.tarea4.services.NotaService;

@RestController
@RequestMapping("/api/notas")
public class NotaController {
    
    @Autowired
    private NotaService notaService;
    
    @PostMapping("/agregar")
    public ResponseEntity<Map<String, Object>> agregarNota(
            @RequestParam("avisoId") Integer avisoId,
            @RequestParam("nota") Integer valorNota) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validar nota
            if (valorNota == null || valorNota < 1 || valorNota > 7) {
                response.put("success", false);
                response.put("mensaje", "La nota debe ser un número entre 1 y 7");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Agregar nota
            Nota nota = notaService.agregarNota(avisoId, valorNota);
            
            // Calcular nuevo promedio
            Double promedio = notaService.obtenerPromedio(avisoId);
            Long totalNotas = notaService.contarNotas(avisoId);
            
            response.put("success", true);
            response.put("mensaje", "Nota agregada exitosamente");
            response.put("notaId", nota.getId());
            response.put("promedio", promedio);
            response.put("totalNotas", totalNotas);
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("mensaje", e.getMessage());
            return ResponseEntity.badRequest().body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("mensaje", "Error al procesar la solicitud: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/promedio/{avisoId}")
    public ResponseEntity<Map<String, Object>> obtenerPromedio(@PathVariable Integer avisoId) {
        Map<String, Object> response = new HashMap<>();
        
        Double promedio = notaService.obtenerPromedio(avisoId);
        Long totalNotas = notaService.contarNotas(avisoId);
        
        response.put("avisoId", avisoId);
        response.put("promedio", promedio);
        response.put("totalNotas", totalNotas);
        
        return ResponseEntity.ok(response);
    }
}