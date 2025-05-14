from flask import Flask, request, render_template, redirect, url_for, session
#from utils.validations import validate_login_user, validate_register_user, validate_confession
#from sql import db
#from werkzeug.utils import secure_filename
#import hashlib
#import filetype
#import os

#UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/inicio')
def index():
    return render_template('index.html')

@app.route('/agregar')
def agregar():
    return render_template('agregar.html')

@app.route('/actividades')
def actividades():
    return render_template('actividades.html')

@app.route('/estadisticas')
def estadisticas():
    return render_template('estadisticas.html')

if __name__ == "__main__":
    app.run(debug=True)
