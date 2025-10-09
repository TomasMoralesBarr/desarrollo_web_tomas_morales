from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from datetime import datetime
import os
import re

app = Flask(__name__)
app.config['SECRET_KEY'] = 'programacionweb'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

db = SQLAlchemy(app)

# Crear carpeta de uploads si no existe
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Modelos de la base de datos
class Region(db.Model):
    __tablename__ = 'region'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)
    comunas = db.relationship('Comuna', backref='region', lazy=True)

class Comuna(db.Model):
    __tablename__ = 'comuna'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'), nullable=False)
    avisos = db.relationship('AvisoAdopcion', backref='comuna', lazy=True)

class AvisoAdopcion(db.Model):
    __tablename__ = 'aviso_adopcion'
    id = db.Column(db.Integer, primary_key=True)
    fecha_ingreso = db.Column(db.DateTime, nullable=False, default=datetime.now)
    comuna_id = db.Column(db.Integer, db.ForeignKey('comuna.id'), nullable=False)
    sector = db.Column(db.String(100))
    nombre = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    celular = db.Column(db.String(15))
    tipo = db.Column(db.Enum('gato', 'perro'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    unidad_medida = db.Column(db.Enum('a', 'm'), nullable=False)
    fecha_entrega = db.Column(db.DateTime, nullable=False)
    descripcion = db.Column(db.Text(500))
    fotos = db.relationship('Foto', backref='aviso', lazy=True, cascade='all, delete-orphan')
    contactos = db.relationship('ContactarPor', backref='aviso', lazy=True, cascade='all, delete-orphan')

class Foto(db.Model):
    __tablename__ = 'foto'
    id = db.Column(db.Integer, primary_key=True)
    ruta_archivo = db.Column(db.String(300), nullable=False)
    nombre_archivo = db.Column(db.String(300), nullable=False)
    aviso_id = db.Column(db.Integer, db.ForeignKey('aviso_adopcion.id'), nullable=False)

class ContactarPor(db.Model):
    __tablename__ = 'contactar_por'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra'), nullable=False)
    identificador = db.Column(db.String(150), nullable=False)
    aviso_id = db.Column(db.Integer, db.ForeignKey('aviso_adopcion.id'), nullable=False)

# Funciones de validación
def validar_email(email):
    patron = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return re.match(patron, email) is not None

def validar_celular(celular):
    if not celular:
        return True
    patron = r'^\+\d{3}\.\d{8}$'
    return re.match(patron, celular) is not None

def validar_archivo(filename):
    extensiones_permitidas = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in extensiones_permitidas

def validar_formulario(data, files):
    errores = {}
    
    # Validar región
    if not data.get('region'):
        errores['region'] = 'La región es obligatoria'
    
    # Validar comuna
    if not data.get('comuna'):
        errores['comuna'] = 'La comuna es obligatoria'
    else:
        try:
            comuna_id = int(data.get('comuna'))
            comuna = Comuna.query.get(comuna_id)
            if not comuna:
                errores['comuna'] = 'Comuna inválida'
        except:
            errores['comuna'] = 'Comuna inválida'
    
    # Validar sector
    sector = data.get('sector', '')
    if len(sector) > 100:
        errores['sector'] = 'El sector no puede superar los 100 caracteres'
    
    # Validar nombre
    nombre = data.get('nombre', '').strip()
    if not nombre:
        errores['nombre'] = 'El nombre es obligatorio'
    elif len(nombre) < 3 or len(nombre) > 200:
        errores['nombre'] = 'El nombre debe tener entre 3 y 200 caracteres'
    
    # Validar email
    email = data.get('email', '').strip()
    if not email:
        errores['email'] = 'El email es obligatorio'
    elif not validar_email(email):
        errores['email'] = 'El email debe tener un formato válido'
    elif len(email) > 100:
        errores['email'] = 'El email no puede superar los 100 caracteres'
    
    # Validar celular
    celular = data.get('celular', '').strip()
    if celular and not validar_celular(celular):
        errores['celular'] = 'El formato del celular debe ser +NNN.NNNNNNNN'
    
    # Validar tipo
    tipo = data.get('tipo')
    if tipo not in ['gato', 'perro']:
        errores['tipo'] = 'Debe seleccionar el tipo de mascota'
    
    # Validar cantidad
    try:
        cantidad = int(data.get('cantidad', 0))
        if cantidad < 1:
            errores['cantidad'] = 'La cantidad debe ser mínimo 1'
    except:
        errores['cantidad'] = 'La cantidad debe ser un número válido'
    
    # Validar edad
    try:
        edad = int(data.get('edad', 0))
        if edad < 1:
            errores['edad'] = 'La edad debe ser mínimo 1'
    except:
        errores['edad'] = 'La edad debe ser un número válido'
    
    # Validar unidad de edad
    unidad_edad = data.get('unidadEdad')
    if unidad_edad not in ['meses', 'años']:
        errores['unidadEdad'] = 'Debe seleccionar la unidad de edad'
    
    # Validar fecha de entrega
    try:
        fecha_entrega_str = data.get('fechaEntrega')
        fecha_entrega = datetime.strptime(fecha_entrega_str, '%Y-%m-%dT%H:%M')
        fecha_minima = datetime.now()
        if fecha_entrega < fecha_minima:
            errores['fechaEntrega'] = 'La fecha debe ser mayor o igual a la fecha actual'
    except:
        errores['fechaEntrega'] = 'Formato de fecha inválido'
    
    # Validar fotos
    fotos = files.getlist('foto')
    fotos_validas = [f for f in fotos if f and f.filename != '']
    
    if len(fotos_validas) < 1:
        errores['foto'] = 'Debe agregar al menos 1 foto'
    elif len(fotos_validas) > 5:
        errores['foto'] = 'No puede agregar más de 5 fotos'
    else:
        for foto in fotos_validas:
            if not validar_archivo(foto.filename):
                errores['foto'] = 'Solo se permiten archivos de imagen (png, jpg, jpeg, gif, webp)'
                break
    
    return errores

# Rutas
@app.route('/')
def index():
    # Obtener últimos 5 avisos
    avisos = AvisoAdopcion.query.order_by(AvisoAdopcion.fecha_ingreso.desc()).limit(5).all()
    return render_template('index.html', avisos=avisos)

@app.route('/agregar-aviso', methods=['GET', 'POST'])
def agregar_aviso():
    if request.method == 'POST':
        # Validar formulario
        errores = validar_formulario(request.form, request.files)
        
        if errores:
            regiones = Region.query.all()
            return render_template('agregar_aviso.html', 
                                 errores=errores, 
                                 form_data=request.form,
                                 regiones=regiones)
        
        try:
            # Crear aviso de adopción
            unidad = 'a' if request.form.get('unidadEdad') == 'años' else 'm'
            fecha_entrega = datetime.strptime(request.form.get('fechaEntrega'), '%Y-%m-%dT%H:%M')
            
            aviso = AvisoAdopcion(
                comuna_id=int(request.form.get('comuna')),
                sector=request.form.get('sector', '').strip() or None,
                nombre=request.form.get('nombre').strip(),
                email=request.form.get('email').strip(),
                celular=request.form.get('celular', '').strip() or None,
                tipo=request.form.get('tipo'),
                cantidad=int(request.form.get('cantidad')),
                edad=int(request.form.get('edad')),
                unidad_medida=unidad,
                fecha_entrega=fecha_entrega,
                descripcion=request.form.get('descripcion', '').strip() or None
            )
            
            db.session.add(aviso)
            db.session.flush()  # Para obtener el ID del aviso
            
            # Guardar fotos
            fotos = request.files.getlist('foto')
            for foto in fotos:
                if foto and foto.filename:
                    filename = secure_filename(foto.filename)
                    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                    nombre_unico = f"{timestamp}_{filename}"
                    ruta = os.path.join(app.config['UPLOAD_FOLDER'], nombre_unico)
                    foto.save(ruta)
                    
                    foto_db = Foto(
                        ruta_archivo=ruta,
                        nombre_archivo=nombre_unico,
                        aviso_id=aviso.id
                    )
                    db.session.add(foto_db)
            
            # Guardar contactos adicionales
            contacto_tipo = request.form.get('contacto')
            if contacto_tipo:
                # Buscar todos los campos de redes sociales
                for key in request.form.keys():
                    if key.startswith('socialId'):
                        identificador = request.form.get(key, '').strip()
                        if identificador and len(identificador) >= 4:
                            contacto = ContactarPor(
                                nombre=contacto_tipo,
                                identificador=identificador,
                                aviso_id=aviso.id
                            )
                            db.session.add(contacto)
            
            db.session.commit()
            flash('¡Hemos recibido la información de adopción, muchas gracias y suerte!', 'success')
            return redirect(url_for('index'))
            
        except Exception as e:
            db.session.rollback()
            flash(f'Error al procesar el formulario: {str(e)}', 'error')
            regiones = Region.query.all()
            return render_template('agregar_aviso.html', 
                                 form_data=request.form,
                                 regiones=regiones)
    
    regiones = Region.query.all()
    return render_template('agregar_aviso.html', regiones=regiones)

@app.route('/listado-adopciones')
def listado_adopciones():
    page = request.args.get('page', 1, type=int)
    avisos_paginados = AvisoAdopcion.query.order_by(AvisoAdopcion.fecha_ingreso.desc()).paginate(
        page=page, per_page=5, error_out=False
    )
    return render_template('listado_adopciones.html', avisos=avisos_paginados)

@app.route('/detalle-aviso/<int:aviso_id>')
def detalle_aviso(aviso_id):
    aviso = AvisoAdopcion.query.get_or_404(aviso_id)
    return render_template('detalle_aviso.html', aviso=aviso)

@app.route('/estadisticas')
def estadisticas():
    return render_template('estadisticas.html')

@app.route('/api/comunas/<int:region_id>')
def get_comunas(region_id):
    comunas = Comuna.query.filter_by(region_id=region_id).all()
    return jsonify([{'id': c.id, 'nombre': c.nombre} for c in comunas])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)