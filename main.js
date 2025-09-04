    // Datos de comunas por región
    // Usar region_comuna.js para poblar regiones y comunas

        // Datos de ejemplo para detalles de adopción
        const adoptionDetails = [
            {
                fechaPublicacion: '2025-08-18 12:00',
                fechaEntrega: '2025-08-20 15:00',
                region: 'Región Metropolitana',
                comuna: 'Las Condes',
                sector: 'Martin de Zamora',
                nombre: 'María Jose',
                email: 'maria.jose@email.com',
                celular: '+569.87654321',
                contacto: 'WhatsApp: @mariaj',
                tipo: 'Perros',
                cantidad: 3,
                edad: '2 meses',
                descripcion: 'Cachorros adorables y muy juguetones.',
                fotos: ["/assets/goldenpuppies2.jpg", "/assets/goldenpuppies.jpg", "/assets/goldenpuppies3.webp"]
            },
            {
                fechaPublicacion: '2025-08-17 19:00',
                fechaEntrega: '2025-08-19 10:00',
                region: 'Región de O\'higgins',
                comuna: 'San Fernando',
                sector: 'Plaza',
                nombre: 'Matias Morales',
                email: 'matias.morales@email.com',
                celular: '+569.12345678',
                contacto: 'Instagram: @matiasm',
                tipo: 'Perro',
                cantidad: 1,
                edad: '5 meses',
                descripcion: 'Cachorro muy juguetón.',
                fotos: ['/assets/dalmata1.webp', '/assets/dalmata2.webp', '/assets/dalmata3.webp']
            },
            {
                fechaPublicacion: '2025-08-17 18:00',
                fechaEntrega: '2025-08-18 14:00',
                region: 'Región Metropolitana',
                comuna: 'Vitacura',
                sector: 'Santa María de Manquehue',
                nombre: 'Agustina Silva',
                email: 'agustina.silva@email.com',
                celular: '+569.98765432',
                contacto: 'Telegram: @agustinas',
                tipo: 'Perros',
                cantidad: 2,
                edad: '5 años',
                descripcion: 'Dos perros adultos, muy buenos guardianes.',
                fotos: ['/assets/doberman1.jpg', '/assets/doberman2.webp', '/assets/doberman3.jpg']
            },
            
            {
                fechaPublicacion: '2025-08-16 14:30',
                fechaEntrega: '2025-08-17 16:00',
                region: 'Región de O\'higgins',
                comuna: 'Angostura',
                sector: 'Viña Casa Silva',
                nombre: 'Mario Pablo Silva',
                email: 'mario.silva@email.com',
                celular: '+569.55544433',
                contacto: 'X: @marios',
                tipo: 'Perro',
                cantidad: 2,
                edad: '6 meses',
                descripcion: 'cachorros muy juguetones y amigables.',
                fotos: ['/assets/grandanes1.jpg']
            },
            {
                fechaPublicacion: '2025-08-15 10:15',
                fechaEntrega: '2025-08-16 12:00',
                region: 'Región Metropolitana',
                comuna: 'Las Condes',
                sector: 'El Golf',
                nombre: 'Laura Pérez',
                email: 'laura.perez@email.com',
                celular: '+569.11223344',
                contacto: 'TikTok: @laurap',
                tipo: 'Perro',
                cantidad: 1,
                edad: '3 meses',
                descripcion: 'Cachorro muy juguetón.',
                fotos: ['/assets/pastor.jpg', '/assets/pastor2.webp']
            }
        ];

        let photoCount = 1;
        let socialInputCount = 0;

        // Inicialización
        document.addEventListener('DOMContentLoaded', function() {

            // Obtener hora actual de Chile
            const ahora = new Date();
            const horaChile = new Date(ahora.toLocaleString("en-US", {timeZone: "America/Santiago"}));

            // Formatear para datetime-local
            const year = horaChile.getFullYear();
            const month = String(horaChile.getMonth() + 1).padStart(2, '0');
            const day = String(horaChile.getDate()).padStart(2, '0');
            const hours = String(horaChile.getHours()).padStart(2, '0');
            const minutes = String(horaChile.getMinutes()).padStart(2, '0');
            
            const fechaEntrega = `${year}-${month}-${day}T${hours}:${minutes}`;
            
            // Prerellenar el input
            document.getElementById('fechaEntrega').value = fechaEntrega;
            

            // Poblar regiones en el select
            const regionSelect = document.getElementById('region');
            // Limpiar opciones actuales de región (excepto la primera)
            while (regionSelect.options.length > 1) {
                regionSelect.remove(1);
            }
            region_comuna.regiones.forEach(region => {
                const option = document.createElement('option');
                option.value = region.nombre;
                option.textContent = region.nombre;
                regionSelect.appendChild(option);
            });

            // Configurar evento de cambio de región
            regionSelect.addEventListener('change', function() {
                const selectedRegion = regionSelect.value;
                const comunaSelect = document.getElementById('comuna');
                comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
                const regionObj = region_comuna.regiones.find(r => r.nombre === selectedRegion);
                if (regionObj) {
                    regionObj.comunas.forEach(comuna => {
                        const option = document.createElement('option');
                        option.value = comuna.nombre;
                        option.textContent = comuna.nombre;
                        comunaSelect.appendChild(option);
                    });
                }
            });

            document.getElementById('contacto').addEventListener('change', handleContactoChange);
        });

        // Navegación entre secciones
        function showSection(sectionId) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');

            // Si es el listado, poblar la tabla
            if (sectionId === 'adoption-list') {
                renderAdoptionTable();
            }
        }

        // Poblar la tabla de adopciones desde adoptionDetails
        function renderAdoptionTable() {
            const tbody = document.getElementById('adoptionTableBody');
            tbody.innerHTML = '';
            adoptionDetails.forEach((adop, idx) => {
                const tr = document.createElement('tr');
                tr.onclick = function() { showAdoptionDetail(idx); };
                tr.innerHTML = `
                    <td>${adop.fechaPublicacion}</td>
                    <td>${adop.fechaEntrega}</td>
                    <td>${adop.comuna}</td>
                    <td>${adop.sector}</td>
                    <td>${adop.cantidad}</td>
                    <td>${adop.tipo}</td>
                    <td>${adop.edad}</td>
                    <td>${adop.nombre}</td>
                    <td>${adop.fotos.length}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Actualizar comunas según región seleccionada
    // La función updateComunas ya no es necesaria, se reemplaza por el evento anterior

        // Manejar cambio en método de contacto
        function handleContactoChange() {
            const contacto = document.getElementById('contacto');
            const socialInputs = document.getElementById('socialInputs');
            
            if (contacto.value) {
                socialInputCount++;
                if (socialInputCount <= 5) {
                    const div = document.createElement('div');
                    div.className = 'social-input';
                    div.style.display = 'block';
                    div.innerHTML = `
                        <label>ID o URL para ${contacto.options[contacto.selectedIndex].text}</label>
                        <input type="text" name="socialId${socialInputCount}" minlength="4" maxlength="50" placeholder="Mínimo 4, máximo 50 caracteres">
                    `;
                    socialInputs.appendChild(div);
                }
            }
        }

        // Agregar input de foto adicional
        function addPhotoInput() {
            if (photoCount < 5) {
                photoCount++;
                const photoInputs = document.getElementById('photoInputs');
                const div = document.createElement('div');
                div.className = 'photo-input-group';
                div.innerHTML = `<input type="file" name="foto" accept="image/*">`;
                photoInputs.appendChild(div);
            } else {
                alert('Máximo 5 fotos permitidas');
            }
        }

        // Validaciones del formulario
        function validateForm() {
            let isValid = true;
           

            // Limpiar errores previos
            document.querySelectorAll('.error').forEach(error => error.textContent = '');

            // Validar región
            const region = document.getElementById('region').value;
            if (!region) {
                document.getElementById('regionError').textContent = 'La región es obligatoria';
                isValid = false;
            }

            // Validar comuna
            const comuna = document.getElementById('comuna').value;
            if (!comuna) {
                document.getElementById('comunaError').textContent = 'La comuna es obligatoria';
                isValid = false;
            }

            // Validar sector (opcional, pero con límite de caracteres)
            const sector = document.getElementById('sector').value;
            if (sector.length > 100) {
                document.getElementById('sectorError').textContent = 'El sector no puede superar los 100 caracteres';
                isValid = false;
            }

            // Validar nombre
            const nombre = document.getElementById('nombre').value;
            if (!nombre) {
                document.getElementById('nombreError').textContent = 'El nombre es obligatorio';
                isValid = false;
            } else if (nombre.length < 3 || nombre.length > 200) {
                document.getElementById('nombreError').textContent = 'El nombre debe tener entre 3 y 200 caracteres';
                isValid = false;
            }

            // Validar email
            const email = document.getElementById('email').value;
            const emailPattern =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!email) {
                document.getElementById('emailError').textContent = 'El email es obligatorio';
                isValid = false;
            } else if (!emailPattern.test(email)) {
                document.getElementById('emailError').textContent = 'El email debe tener un formato válido';
                isValid = false;
            } else if (email.length > 100) {
                document.getElementById('emailError').textContent = 'El email no puede superar los 100 caracteres';
                isValid = false;
            }

            // Validar celular (opcional, pero con formato específico)
            const celular = document.getElementById('celular').value;
            const celularPattern = /^\+\d{3}\.\d{8}$/;
            if (celular && !celularPattern.test(celular)) {
                document.getElementById('celularError').textContent = 'El formato del celular debe ser +NNN.NNNNNNNN';
                isValid = false;
            }

             // Validar tipo de mascota
            const tipo = document.getElementById('tipo').value;
            if (!tipo) {
                document.getElementById('tipoError').textContent = 'Debe seleccionar el tipo de mascota';
                isValid = false;
            }

            // Validar cantidad
            const cantidad = document.getElementById('cantidad').value;
            if (!cantidad || cantidad < 1) {
                document.getElementById('cantidadError').textContent = 'La cantidad debe ser mínimo 1';
                isValid = false;
            }
            // Validar edad
            const edad = document.getElementById('edad').value;
            if (!edad || edad < 1) {
                document.getElementById('edadError').textContent = 'La edad debe ser mínimo 1';
                isValid = false;
            }

            // Validar unidad de edad
            const unidadEdad = document.getElementById('unidadEdad').value;
            if (!unidadEdad) {
                document.getElementById('unidadEdadError').textContent = 'Debe seleccionar la unidad de edad';
                isValid = false;
            }

            // Validar fecha de entrega
            const fechaEntrega = document.getElementById('fechaEntrega').value;
            
            if (!fechaEntrega) {
                document.getElementById('fechaEntregaError').textContent = 'La fecha de entrega es obligatoria';
                isValid = false;
            } else {
                // Obtener la fecha mínima (hora actual de Chile que se prellenó)
                const ahora = new Date();
                const horaChile = new Date(ahora.toLocaleString("en-US", {timeZone: "America/Santiago"}));
                const year = horaChile.getFullYear();
                const month = String(horaChile.getMonth() + 1).padStart(2, '0');
                const day = String(horaChile.getDate()).padStart(2, '0');
                const hours = String(horaChile.getHours()).padStart(2, '0');
                const minutes = String(horaChile.getMinutes()).padStart(2, '0');
                const fechaMinima = `${year}-${month}-${day}T${hours}:${minutes}`;
    
                // Convertir a objetos Date para comparar
                const fechaSeleccionada = new Date(fechaEntrega);
                const fechaMinimaObj = new Date(fechaMinima);
                
                // Validar formato
                if (isNaN(fechaSeleccionada.getTime())) {
                    document.getElementById('fechaEntregaError').textContent = 'El formato de fecha debe ser año-mes-día hora:minuto';
                    isValid = false;
                } 
                // Validar que sea mayor o igual a la fecha prellenada
                else if (fechaSeleccionada < fechaMinimaObj) {
                    document.getElementById('fechaEntregaError').textContent = 'La fecha debe ser mayor o igual a la fecha prellenada';
                    isValid = false;
                }
            }

            // Validar fotos
            const fotoInputs = document.querySelectorAll('input[type="file"][name="foto"]');
            let hasPhotos = false;
            fotoInputs.forEach(input => {
                if (input.files.length > 0) {
                    hasPhotos = true;
                }
            });

            if (!hasPhotos) {
                document.getElementById('fotoError').textContent = 'Debe agregar al menos 1 foto';
                isValid = false;
            }

            return isValid;
        }

        // Manejar envío del formulario
        document.getElementById('adoptionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                document.getElementById('confirmModal').style.display = 'block';
            }
        });

        // Confirmar envío
        function confirmSubmit() {
            document.getElementById('confirmModal').style.display = 'none';
            document.getElementById('adoptionForm').innerHTML = `
                <div class="success">
                    <h3>¡Hemos recibido la información de adopción, muchas gracias y suerte!</h3>
                    <button onclick="showSection('home')" class="btn">Volver a la portada</button>
                </div>
            `;
        }

        // Cerrar modal
        function closeModal() {
            document.getElementById('confirmModal').style.display = 'none';
        }

        // Mostrar detalle de adopción
        function showAdoptionDetail(index) {
            const detail = adoptionDetails[index];
            const detailContent = document.getElementById('detailContent');
            
            detailContent.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                    <div>
                        <h4>Información del lugar</h4>
                        <p><strong>Fecha de publicación:</strong> ${detail.fechaPublicacion}</p>
                        <p><strong>Fecha de entrega:</strong> ${detail.fechaEntrega}</p>
                        <p><strong>Región:</strong> ${detail.region}</p>
                        <p><strong>Comuna:</strong> ${detail.comuna}</p>
                        <p><strong>Sector:</strong> ${detail.sector}</p>
                    </div>
                    <div>
                        <h4>Información de contacto</h4>
                        <p><strong>Nombre:</strong> ${detail.nombre}</p>
                        <p><strong>Email:</strong> ${detail.email}</p>
                        <p><strong>Celular:</strong> ${detail.celular}</p>
                        <p><strong>Contacto adicional:</strong> ${detail.contacto}</p>
                    </div>
                </div>
                <div>
                    <h4>Información de la mascota</h4>
                    <p><strong>Tipo:</strong> ${detail.tipo}</p>
                    <p><strong>Cantidad:</strong> ${detail.cantidad}</p>
                    <p><strong>Edad:</strong> ${detail.edad}</p>
                    <p><strong>Descripción:</strong> ${detail.descripcion}</p>
                </div>
            `;

            const photosContainer = document.getElementById('detailPhotos');
            photosContainer.innerHTML = '';
            detail.fotos.forEach((foto, i) => {
                const img = document.createElement('div');
                img.className = 'photo-preview';
                if (typeof foto === 'string' && foto.startsWith('/assets')) {
                    img.innerHTML = `<img src="${foto}" alt="Foto Mascota" style="width: 320px; height: 240px; object-fit: cover; border-radius: 8px; cursor: pointer;">`;
                    img.onclick = function() { enlargePhoto(foto); };
                } else {
                    img.innerHTML = `<div style="width: 320px; height: 240px; background: #ecf0f1; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; font-size: 4rem;">${foto}</div>`;
                    img.onclick = function() { enlargePhoto(foto); };
                }
                photosContainer.appendChild(img);
            });

            showSection('adoption-detail');
        }

        // Ampliar foto
        function enlargePhoto(photo) {
            const enlargedPhoto = document.getElementById('enlargedPhoto');
            if (typeof photo === 'string' && photo.startsWith('/assets')) {
                enlargedPhoto.innerHTML = `<img src="${photo}" alt="Foto ampliada" style="width: 800px; height: 600px; object-fit: cover; border-radius: 12px;">`;
            } else {
                enlargedPhoto.innerHTML = `<div style="width: 800px; height: 600px; background: #ecf0f1; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 8rem;">${photo}</div>`;
            }
            document.getElementById('photoModal').style.display = 'block';
        }

        // Cerrar modal de foto
        function closePhotoModal() {
            document.getElementById('photoModal').style.display = 'none';
        }

        
    