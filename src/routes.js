// Configurar Router de Vue
import { createWebHistory, createRouter, useRouter } from "vue-router";
import { verifyToken } from "./guards/ValidateSession.js";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("./Pages/Home.vue"),
        children: [
            {
                path: "/",
                name: "Dashboard",
                component: () => import("./components/Title.vue"),
            },
            {
                path: "/usuarios",
                component: () => import("./Pages/Usuarios/Usuarios.vue"),
            },
            {
                path: "/usuarios/crear",
                name: "CrearUsuario",
                component: () => import("./Pages/Usuarios/Crear.vue"),
            },
            {
                path: "/clientes",
                component: () => import("./Pages/Clientes/Clientes.vue"),
            },
            {
                path: "/clientes/:id",
                component: () => import("./Pages/Clientes/Edit.vue"),
            },
            {
                path: "/clientes/crear",
                name: "CrearClientes",
                component: () => import("./Pages/Clientes/Crear.vue"),
            },
            {
                path: "/visitas",
                name: "Visitas",
                component: () => import("./Pages/Visitas/Visitas.vue"),
            },
            {
                path: "/visitas/crear",
                name: "CrearVisitas",
                component: () => import("./Pages/Visitas/Crear.vue"),
            },
            {
                path: "/visitas/:id",
                name: "EditarVisitas",
                component: () => import("./Pages/Visitas/Edit.vue"),
            },
            {
                path: "/ordenes",
                name: "Ordenes",
                component: () => import("./Pages/Ordenes/Ordenes.vue"),
            },
            {
                path: "/ordenes/:id",
                name: "OrdenesEdit",
                component: () => import("./Pages/Ordenes/Edit.vue"),
            },
            {
                path: "/ordenes/crear",
                name: "CrearOrdenes",
                component: () => import("./Pages/Ordenes/Crear.vue"),
            },
            {
                path: "/agenda",
                name: "Agenda",
                component: () => import("./Pages/Agenda/Agenda.vue"),
            },
        ],
        beforeEnter: verifyToken,
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("./Pages/Auth/Logging.vue"),
        beforeEnter: verifyToken,
    },

    // Otras rutas definidas aquí
  {
    path: '/:pathMatch(.*)*', // Ruta comodín para manejar 404
    redirect: '/'
  }
]



const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;