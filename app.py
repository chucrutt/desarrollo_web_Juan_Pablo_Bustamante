from flask import Flask, flash, abort, request, render_template, redirect, url_for, session, jsonify
from sql import db
from utils import validations
from sqlalchemy import func
#from werkzeug.utils import secure_filename
#import hashlib
#import filetype
#import os

app = Flask(__name__)
app.secret_key = "programacionweb"

@app.route('/')
def index():
    actividades = db.get_ultimas_actividades()
    return render_template('index.html', actividades=actividades)

@app.route('/agregar_actividad', methods=["GET", "POST"])
def agregar():
    regiones = db.get_regiones()
    comunas = db.get_comunas()
    if (request.method == "POST"):
        nombre = request.form.get('nombre', '').strip()
        email = request.form.get('email', '').strip()
        telefono = request.form.get('phone', '').strip()
        region = request.form.get('select-region')
        comuna = request.form.get('select-comuna')
        sector = request.form.get('sector', '').strip()
        temas = request.form.getlist('tema')
        otro_tema = request.form.get('otro-tema', '').strip()
        fecha_inicio = request.form.get('fecha-inicio')
        fecha_termino = request.form.get('fecha-termino')
        archivos = request.files.getlist('files')
        descripcion = request.form.get('descripcion', '').strip()
        contactos = {
            'whatsapp': request.form.get('whatsapp_contact', '').strip(),
            'telegram': request.form.get('telegram_contact', '').strip(),
            'x': request.form.get('x_contact', '').strip(),
            'instagram': request.form.get('instagram_contact', '').strip(),
            'tiktok': request.form.get('tiktok_contact', '').strip(),
            'otro': request.form.get('otro_contact', '').strip()
        }
        contactos = {k: v for k, v in contactos.items() if v}

        errores = "Flask Error: "
        errores = validations.formValid(nombre, email, telefono, region, comuna, sector, temas, otro_tema, fecha_inicio, fecha_termino, archivos, errores)
        if (errores == "Flask Error: "):
            db.create_actividad(nombre, email, telefono, region, comuna, sector, temas, otro_tema, fecha_inicio, fecha_termino, archivos, descripcion, contactos)
            flash("Actividad registrada con éxito")
            return redirect('/')
        else:
            return render_template('agregar.html', regiones=regiones, comunas=comunas, errores=errores)
        
    elif (request.method == "GET"):
        return render_template('agregar.html', regiones=regiones, comunas=comunas)


@app.route('/actividad')
def actividades():
    page = request.args.get('page', 1, type=int)
    per_page = 5
    actividades, total, page, total_pages = db.get_actividades_paginadas(page, per_page)
    return render_template('actividades.html', actividades=actividades, page=page, total_pages=total_pages)

@app.route('/actividad/<int:id>', methods=['GET', 'POST'])
def detalle_actividad(id):
    actividad = db.detalle_actividad(id)
    if not actividad:
        abort(404)
    errores = []
    if request.method == 'POST':
        nombre = request.form.get('nombre', '').strip()
        texto = request.form.get('comentario', '').strip()
        # Validación en servidor
        if len(nombre) < 3 or len(nombre) > 80:
            errores.append("El nombre debe tener entre 3 y 80 caracteres.")
        if len(texto) < 5:
            errores.append("El comentario debe tener al menos 5 caracteres.")
        if not errores:
            db.insertar_comentario(actividad.id, nombre, texto)
            flash("Comentario agregado correctamente.", "success")
            return redirect(url_for('detalle_actividad', id=id))
    return render_template('detalle.html', actividad=actividad, errores=errores)


@app.route('/estadisticas')
def estadisticas():
    return render_template('estadisticas.html')

@app.route('/api/actividades_por_dia')
def actividades_por_dia():
    session = db.SessionLocal()
    # Agrupa por fecha (sin hora)
    results = session.query(
        func.date(db.Actividad.dia_hora_inicio).label('fecha'),
        func.count(db.Actividad.id)
    ).group_by(func.date(db.Actividad.dia_hora_inicio)).order_by('fecha').all()
    session.close()
    # Formatea para Highcharts
    data = [{"fecha": str(r[0]), "cantidad": r[1]} for r in results]
    return jsonify(data)

@app.route('/api/actividades_por_tema')
def actividades_por_tema():
    session = db.SessionLocal()
    results = session.query(
        db.ActividadTema.tema,
        func.count(db.ActividadTema.id)
    ).group_by(db.ActividadTema.tema).all()
    session.close()
    data = [{"tema": r[0], "cantidad": r[1]} for r in results]
    return jsonify(data)

@app.route('/api/actividades_por_mes_y_franja')
def actividades_por_mes_y_franja():
    session = db.SessionLocal()
    from sqlalchemy import case, func

    franja = case(
        (func.hour(db.Actividad.dia_hora_inicio) < 12, 'Mañana'),
        (func.hour(db.Actividad.dia_hora_inicio) < 18, 'Mediodía'),
        else_='Tarde'
    )

    results = session.query(
        func.date_format(db.Actividad.dia_hora_inicio, "%Y-%m").label('mes'),
        franja.label('franja'),
        func.count(db.Actividad.id)
    ).group_by('mes', 'franja').order_by('mes').all()
    session.close()

    meses = sorted(list(set([r[0] for r in results])))
    franjas = ['Mañana', 'Mediodía', 'Tarde']
    data = {franja: [0]*len(meses) for franja in franjas}
    mes_idx = {mes: i for i, mes in enumerate(meses)}
    for mes, franja_val, cantidad in results:
        data[franja_val][mes_idx[mes]] = cantidad

    return jsonify({
        "meses": meses,
        "series": [
            {"name": franja, "data": data[franja]} for franja in franjas
        ]
    })

@app.route('/api/comentarios/<int:actividad_id>')
def api_listar_comentarios(actividad_id):
    session = db.SessionLocal()
    comentarios = session.query(db.Comentario).filter_by(actividad_id=actividad_id).order_by(db.Comentario.fecha.desc()).all()
    session.close()
    return jsonify([
        {
            "fecha": c.fecha.strftime("%Y-%m-%d %H:%M"),
            "nombre": c.nombre,
            "texto": c.texto
        } for c in comentarios
    ])

@app.route('/api/comentarios/<int:actividad_id>', methods=['POST'])
def api_agregar_comentario(actividad_id):
    data = request.get_json()
    nombre = data.get('nombre', '').strip()
    texto = data.get('comentario', '').strip()
    errores = []
    if len(nombre) < 3 or len(nombre) > 80:
        errores.append("El nombre debe tener entre 3 y 80 caracteres.")
    if len(texto) < 5 or len(texto) > 300:
        errores.append("El comentario debe tener entre 5 y 300 caracteres.")
    if errores:
        return jsonify({"errores": errores}), 400
    db.insertar_comentario(actividad_id, nombre, texto)
    return jsonify({"mensaje": "Comentario agregado correctamente."})

if __name__ == "__main__":
    app.run(debug=True)
