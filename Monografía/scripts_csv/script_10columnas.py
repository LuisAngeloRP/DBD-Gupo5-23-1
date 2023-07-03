import csv
import random
import string

# Número de filas de datos que deseas generar
numero_filas = 10000000

# Nombre del archivo CSV de salida
nombre_archivo = "datos.csv"

# Generar una cadena de caracteres aleatorios para datos alfabéticos
def generar_cadena_aleatoria(n):
    return ''.join(random.choices(string.ascii_letters, k=n))

# Generar los datos y escribirlos en el archivo CSV
with open(nombre_archivo, "w", newline="") as archivo_csv:
    escritor_csv = csv.writer(archivo_csv)
    
    # Escribir el encabezado del CSV
    escritor_csv.writerow(["id", "nombre", "apellido", "dirección", "teléfono", "dni", "especialidad", "empresa", "edad", "salario"])
    
    # Generar los datos para cada fila
    for i in range(numero_filas):
        id = i + 1
        nombre = generar_cadena_aleatoria(8)
        apellido = generar_cadena_aleatoria(10)
        direccion = generar_cadena_aleatoria(12)
        telefono = random.randint(1000000000, 9999999999)
        dni = random.randint(10000000, 99999999)
        especialidad = generar_cadena_aleatoria(10)
        empresa = generar_cadena_aleatoria(8)
        edad = random.randint(18, 65)
        salario = random.randint(20000, 100000)
        
        # Escribir la fila en el archivo CSV
        escritor_csv.writerow([id, nombre, apellido, direccion, telefono, dni, especialidad, empresa, edad, salario])
