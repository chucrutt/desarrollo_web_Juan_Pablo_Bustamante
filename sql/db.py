from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, joinedload
from datetime import datetime
import os
from werkzeug.utils import secure_filename

STATIC_UPLOADS_PATH = os.path.join("static", "uploads")

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

# --- Models ---

class Region(Base):
    __tablename__ = 'region'
    __table_args__ = {'schema': 'tarea2'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)

    comunas = relationship("Comuna", back_populates="region", cascade="all, delete")

class Comuna(Base):
    __tablename__ = 'comuna'
    __table_args__ = {'schema': 'tarea2'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(Integer, ForeignKey('tarea2.region.id'), nullable=False)

    region = relationship("Region", back_populates="comunas")
    actividades = relationship("Actividad", back_populates="comuna", cascade="all, delete")

class Actividad(Base):
    __tablename__ = 'actividad'
    __table_args__ = {'schema': 'tarea2'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    comuna_id = Column(Integer, ForeignKey('tarea2.comuna.id'), nullable=False)
    sector = Column(String(100))
    nombre = Column(String(200), nullable=False)
    email = Column(String(100), nullable=False)
    celular = Column(String(15))
    dia_hora_inicio = Column(DateTime, nullable=False)
    dia_hora_termino = Column(DateTime)
    descripcion = Column(String(500))

    comuna = relationship("Comuna", back_populates="actividades")
    fotos = relationship("Foto", back_populates="actividad", cascade="all, delete")
    contactos = relationship("ContactarPor", back_populates="actividad", cascade="all, delete")
    temas = relationship("ActividadTema", back_populates="actividad", cascade="all, delete")
    comentarios = relationship("Comentario", back_populates="actividad", cascade="all, delete")

class Foto(Base):
    __tablename__ = 'foto'
    __table_args__ = {'schema': 'tarea2'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    actividad_id = Column(Integer, ForeignKey('tarea2.actividad.id'), primary_key=True)

    actividad = relationship("Actividad", back_populates="fotos")

class ContactarPor(Base):
    __tablename__ = 'contactar_por'
    __table_args__ = {'schema': 'tarea2'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra'), nullable=False)
    identificador = Column(String(150), nullable=False)
    actividad_id = Column(Integer, ForeignKey('tarea2.actividad.id'), primary_key=True)

    actividad = relationship("Actividad", back_populates="contactos")

class ActividadTema(Base):
    __tablename__ = 'actividad_tema'
    __table_args__ = {'schema': 'tarea2'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    tema = Column(Enum('música', 'deporte', 'ciencias', 'religión', 'política', 'tecnología', 'juegos', 'baile', 'comida', 'otro'), nullable=False)
    glosa_otro = Column(String(15))
    actividad_id = Column(Integer, ForeignKey('tarea2.actividad.id'), primary_key=True)

    actividad = relationship("Actividad", back_populates="temas")

class Comentario(Base):
    __tablename__ = 'comentario'
    __table_args__ = {'schema': 'tarea2'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)
    texto = Column(String(300), nullable=False)
    fecha = Column(DateTime, nullable=False, default=datetime.now)
    actividad_id = Column(Integer, ForeignKey('tarea2.actividad.id'), nullable=False)

    actividad = relationship("Actividad", back_populates="comentarios")

# --- Database Functions ---

def get_ultimas_actividades():
    session = SessionLocal()
    actividades = session.query(Actividad).options(
        joinedload(Actividad.comuna),
        joinedload(Actividad.temas),
        joinedload(Actividad.fotos)
    ).order_by(Actividad.id.desc()).limit(5).all()
    session.close()
    return actividades

def get_actividades():
    session = SessionLocal()
    actividades = session.query(Actividad).options(
        joinedload(Actividad.comuna),
        joinedload(Actividad.temas),
        joinedload(Actividad.fotos)
    ).order_by(Actividad.id.desc()).all()
    session.close()
    return actividades

def get_regiones():
    session = SessionLocal()
    regiones = session.query(Region).order_by(Region.nombre).all()
    session.close()
    return regiones

def get_comunas():
    session = SessionLocal()
    comunas = session.query(Comuna).order_by(Comuna.nombre).all()
    session.close()
    return comunas

def create_actividad(nombre, email, celular, region, comuna_id, sector, temas, otro_tema, dia_hora_inicio, dia_hora_termino, archivos, descripcion, contactos):
    session = SessionLocal()

    actividad = Actividad(
        comuna_id=int(comuna_id),
        sector=sector,
        nombre=nombre,
        email=email,
        celular=celular,
        dia_hora_inicio=datetime.fromisoformat(dia_hora_inicio),
        dia_hora_termino=datetime.fromisoformat(dia_hora_termino) if dia_hora_termino else None,
        descripcion = descripcion.strip() if descripcion else None
    )

    session.add(actividad)
    session.flush()  # Necesario para obtener actividad.id

    for archivo in archivos:
        if archivo.filename:
            filename = secure_filename(archivo.filename)
            ruta_local = os.path.join(STATIC_UPLOADS_PATH, filename)
            archivo.save(ruta_local)

            foto = Foto(
                ruta_archivo=f"uploads/{filename}",
                nombre_archivo=filename,
                actividad_id=actividad.id
            )
            session.add(foto)

    for tema in temas:
        if tema == "otro":
            actividad_tema = ActividadTema(
                tema=tema,
                glosa_otro=otro_tema,
                actividad_id=actividad.id
            )
        else:
            actividad_tema = ActividadTema(
                tema=tema,
                glosa_otro=None,
                actividad_id=actividad.id
            )
        session.add(actividad_tema)

    for nombre_red, identificador in contactos.items():
        if nombre_red == "x":
            nombre_enum = "X"
        elif nombre_red == "otro":
            nombre_enum = "otra"
        else:
            nombre_enum = nombre_red

        contacto = ContactarPor(
            nombre=nombre_enum,
            identificador=identificador,
            actividad_id=actividad.id
        )
        session.add(contacto)

    session.commit()
    session.close()

def detalle_actividad(id):
    session = SessionLocal()
    actividad = session.query(Actividad).options(
        joinedload(Actividad.comuna),
        joinedload(Actividad.temas),
        joinedload(Actividad.fotos),
        joinedload(Actividad.contactos),
        joinedload(Actividad.comentarios)
    ).filter_by(id=id).first()
    session.close()
    return actividad

def get_actividades_paginadas(page=1, per_page=5):
    session = SessionLocal()
    query = session.query(Actividad).options(
        joinedload(Actividad.comuna),
        joinedload(Actividad.temas),
        joinedload(Actividad.fotos)
    ).order_by(Actividad.id.desc())

    total = query.count()
    actividades = query.limit(per_page).offset((page - 1) * per_page).all()
    session.close()

    # Devuelvo actividades, total, página actual y total de páginas
    total_pages = (total + per_page - 1) // per_page
    return actividades, total, page, total_pages

def insertar_comentario(actividad_id, nombre, texto):
    session = SessionLocal()
    nuevo = Comentario(
        actividad_id=actividad_id,
        nombre=nombre,
        texto=texto,
        fecha=datetime.now()
    )
    session.add(nuevo)
    session.commit()
    session.close()

# --- To create tables if not exist ---
def init_db():
    Base.metadata.create_all(engine)