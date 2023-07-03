import csv
import random
import string

# Número de filas de datos que deseas generar
numero_filas = 1000000

# Nombre del archivo CSV de salida
nombre_archivo = "datos.csv"

# Generar los datos y escribirlos en el archivo CSV
with open(nombre_archivo, "w", newline="") as archivo_csv:
    escritor_csv = csv.writer(archivo_csv)
    
    # Escribir el encabezado del CSV
    escritor_csv.writerow(["id", "nombre", "apellido"])
    
    # Generar los datos para cada fila
    for i in range(numero_filas):
        # Generar un ID numérico
        id = i + 1
        
        # Generar un nombre aleatorio
        nombre = ''.join(random.choices(string.ascii_uppercase, k=5))
        
        # Generar un apellido aleatorio
        apellido = ''.join(random.choices(string.ascii_uppercase, k=7))
        
        # Escribir la fila en el archivo CSV
        escritor_csv.writerow([id, nombre, apellido])
