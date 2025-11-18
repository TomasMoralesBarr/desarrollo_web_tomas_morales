package com.tarea4desarrollo.tarea4.Controllers;

import com.tarea4desarrollo.tarea4.models.AvisoAdopcion;
import com.tarea4desarrollo.tarea4.services.AvisoAdopcionService;
import com.tarea4desarrollo.tarea4.services.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class EvaluacionController {
    
    @Autowired
    private AvisoAdopcionService avisoService;
    
    @Autowired
    private NotaService notaService;
    
    @GetMapping("/")
    public String index() {
        return "redirect:/evaluacion";
    }
    
    @GetMapping("/evaluacion")
    public String mostrarEvaluacion(Model model) {
        List<AvisoAdopcion> avisos = avisoService.obtenerTodosLosAvisos();
        
        // Calcular promedio de notas para cada aviso
        Map<Integer, Double> promedios = new HashMap<>();
        for (AvisoAdopcion aviso : avisos) {
            Double promedio = notaService.obtenerPromedio(aviso.getId());
            promedios.put(aviso.getId(), promedio);
        }
        
        model.addAttribute("avisos", avisos);
        model.addAttribute("promedios", promedios);
        
        return "evaluacion";
    }
}