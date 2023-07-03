import csv
import random
import string

# Número de filas de datos que deseas generar
numero_filas = 10000000

# Nombre del archivo CSV de salida
nombre_archivo = "datos.csv"

# Generar los datos y escribirlos en el archivo CSV
with open(nombre_archivo, "w", newline="") as archivo_csv:
    escritor_csv = csv.writer(archivo_csv)
    
    # Escribir el encabezado del CSV
    escritor_csv.writerow(["id", "nombre", "apellido", "dirección", "teléfono", "dni"])
    
    # Generar los datos para cada fila
    for i in range(numero_filas):
        # Generar valores aleatorios para cada columna
        id = i + 1
        nombre = ''.join(random.choices(string.ascii_uppercase, k=5))
        apellido = ''.join(random.choices(string.ascii_uppercase, k=7))
        direccion = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
        telefono = ''.join(random.choices(string.digits, k=9))
        dni = ''.join(random.choices(string.digits, k=8))
        
        # Escribir la fila en el archivo CSV
        escritor_csv.writerow([id, nombre, apellido, direccion, telefono, dni])
