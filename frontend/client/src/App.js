import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Menu from "./components/Menu";
import Proyecto from "./components/VistaDetalleProyecto";
import TareasDe from "./components/VistaDetallesTarea";
import ListaProyectos from "./components/VerListaProyectos";
import VerProyectoAsignacionesRecursos from "./components/VerProyectoAsignacionesRecursos";
import VerProyectoAsignacionesEmpleados from "./components/VerProyectoAsignacionesEmpleados";
import Ventana1 from "./components/Ventana1";
import Tareas from "./components/tareas";
import Objetivos from "./components/objetivos";
import EmpleaxProyecto from "./components/emplxPr";
import Progreso from "./components/progreso";
import PlanifivsReportado from "./components/planivsRepo";
import PresupuestoxProy from "./components/presuxPro";
import ReporteRecursos from "./components/reporteRecur";
import { Container, Box } from "@mui/material";
import NavBarra from "./components/navBarra";
import VistaGasto from "./components/vistaGasto";
import VistaPresupuesto from "./components/vistaPresupuesto";
import VistaPartida from "./components/vistaPartida";
import ListaReuion from "./components/ListaReunion";
import TareasCas from "./components/VistaDetallesTareaCas";

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <NavBarra />
        <Container maxWidth="lg">
          <Routes>
            // Proyecto:
            <Route path="proyecto/:id" element={<Proyecto />} />
            <Route path="/proyecto/:id/objetivos" element={<Objetivos />} />
            <Route path="proyecto/:id/tareas" element={<TareasDe />} />
            <Route path="proyecto/:id/reuniones" element={<ListaReuion />} />
            <Route path="proyecto/:id/tareasCas" element={<TareasCas />} />
            // Presupuesto, partida y gastos
            <Route path="lista-proyectos" element={<ListaProyectos />} />
            <Route
              path="/lista-proyectos/:id/asignaciones-recursos"
              element={<VerProyectoAsignacionesRecursos />}
            />
            <Route
              path="/lista-proyectos/:id/asignaciones-empleados"
              element={<VerProyectoAsignacionesEmpleados />}
            />
            <Route path="/proyecto/:id" element={<Proyecto />} />
            <Route path="/proyecto/:id/objetivos" element={<Objetivos />} />
            <Route path="/proyecto/:id/tareas" element={<TareasDe />} />
            // Presupuesto, partida y gastos
            <Route
              path="/proyecto/:id/presupuestos"
              element={<VistaPresupuesto />}
            />
            <Route
              path="/proyecto/:id/presupuestos/:id_pre/partidas"
              element={<VistaPartida />}
            />
            <Route
              path="/proyecto/:id/presupuestos/:id_pre/partidas/:id_par/gastos"
              element={<VistaGasto />}
            />
            // Reportes
            <Route path="/reportes" element={<Ventana1 />} />
            <Route path="/tareas/:id" element={<Tareas />} />
            <Route path="/objetivos/:id" element={<Objetivos />} />
            <Route path="/empleadoxProy/:id" element={<EmpleaxProyecto />} />
            <Route path="/progreso/:fecha1" element={<Progreso />} />
            <Route
              path="/planifivsRepor/:fecha1/:fecha2"
              element={<PlanifivsReportado />}
            />
            <Route path="/presuxpro/:id" element={<PresupuestoxProy />} />
            <Route path="/cuadro2/:id" element={<PresupuestoxProy />} />
            <Route path="/cuadro3/:id" element={<PresupuestoxProy />} />
            <Route path="/cuadro4/:id" element={<PresupuestoxProy />} />
            <Route path="/repRecurso/:id" element={<ReporteRecursos />} />
            <Route path="/sobrantes/:id" element={<ReporteRecursos />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
}
