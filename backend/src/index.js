const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const cassandra = require("cassandra-driver");
const client = new cassandra.Client({contactPoints: ['127.0.0.1']});
client.connect(function(err, result){
  console.log('index: cassandra conected')
});

var getAllSubscriber = 'Select * from "Prueba"."Proyecto"'



const reporteRoutes = require("./routes/reporte.routes");
const proyectosRoutes = require("./routes/proyecto.routes");
const presupuestoRoutes = require("./routes/presupuesto.routes");
const asignacionRoutes = require("./routes/asignacion.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(proyectosRoutes);
app.use(reporteRoutes);
app.use(presupuestoRoutes);
app.use(asignacionRoutes);

app.use((error, req, res, next) => {
  return res.json({ error: error.message });
});

app.listen(4000);
console.log("Server on port 4000");
