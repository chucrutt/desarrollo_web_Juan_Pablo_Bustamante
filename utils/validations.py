import re
import html
from datetime import datetime

def formValid(nombre, email, telefono, region, comuna, sector, temas, otro_tema, fecha_inicio, fecha_termino, archivos, errores):

    if not nombre or len(nombre) > 200:
        errores += "Nombre inválido "

    if not email or not re.match(r'^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$', email):
        errores += "Email inválido "

    if not telefono or not re.match(r'^\+\d{3}\.\d{8}$', telefono):
        errores += "Teléfono inválido "

    if not region:
        errores += "Región no seleccionada "

    if not comuna:
        print(comuna)
        errores += "Comuna no seleccionada "

    if not sector or len(sector) > 100:
        errores += "Sector inválido "

    if not temas:
        errores += "Tema no seleccionado "
    elif "otro" in temas and (not otro_tema or otro_tema.strip() == ""):
        errores += "Debe especificar otro tema "

    try:
        f_inicio = datetime.fromisoformat(fecha_inicio)
        if fecha_termino:
            f_termino = datetime.fromisoformat(fecha_termino)
            if f_termino < f_inicio:
                errores += "Fecha de término debe ser posterior a la de inicio "
    except:
        errores += "Fechas inválidas "

    if not archivos or len(archivos) < 1 or len(archivos) > 5:
        errores += "Debe subir entre 1 y 5 archivos "
    
    return errores