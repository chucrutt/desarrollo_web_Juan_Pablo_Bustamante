from flask import Flask, request, render_template, redirect, url_for, session
#from utils.validations import validate_login_user, validate_register_user, validate_confession
from sql import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os

app = Flask(__name__)