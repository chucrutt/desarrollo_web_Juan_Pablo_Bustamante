from flask import Flask, request, render_template, redirect, url_for, session
#from utils.validations import validate_login_user, validate_register_user, validate_confession
from sql import db
#from werkzeug.utils import secure_filename
#import hashlib
#import filetype
#import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/agregar_actividad', methods=["GET", "POST"])
def agregar():
    regiones = db.get_regiones()
    comunas = db.get_comunas()
    return render_template('agregar.html', regiones=regiones, comunas=comunas)


@app.route('/actividades_recientes')
def actividades():
    return render_template('actividades.html')

@app.route('/estadisticas')
def estadisticas():
    return render_template('estadisticas.html')

if __name__ == "__main__":
    app.run(debug=True)
