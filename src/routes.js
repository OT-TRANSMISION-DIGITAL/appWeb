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
                path: "/ordenes",
                name: "Ordenes",
                component: () => import("./Pages/Ordenes/Ordenes.vue"),
            },
            {
                path: "/ordenes/crear",
                name: "CrearOrdenes",
                component: () => import("./Pages/Ordenes/Crear.vue"),
            },
        ],
        beforeEnter: verifyToken,
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("./Pages/Auth/Logging.vue"),
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