from flask import Flask, request, render_template, redirect, url_for, session
from sql import db
from utils import validations
#from werkzeug.utils import secure_filename
#import hashlib
#import filetype
#import os

app = Flask(__name__)

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
        errores = "Flask Error: "
        errores = validations.formValid(nombre, email, telefono, region, comuna, sector, temas, otro_tema, fecha_inicio, fecha_termino, archivos, errores)
        if (errores == "Flask Error: "):
            db.create_actividad(nombre, email, telefono, region, comuna, sector, temas, otro_tema, fecha_inicio, fecha_termino, archivos, descripcion)
            return redirect('/')
        else:
            return render_template('agregar.html', regiones=regiones, comunas=comunas, errores=errores)
        
    elif (request.method == "GET"):
        return render_template('agregar.html', regiones=regiones, comunas=comunas)


@app.route('/actividad')
def actividades():
    actividades = db.get_actividades()
    return render_template('actividades.html', actividades=actividades)

@app.route('/actividad/<int:id>')
def detalle_actividad(id):
    actividad = db.detalle_actividad(id)
    return render_template('detalle.html', actividad=actividad)

@app.route('/estadisticas')
def estadisticas():
    return render_template('estadisticas.html')

if __name__ == "__main__":
    app.run(debug=True)
