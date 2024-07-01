// Configurar Router de Vue
import { createWebHistory, createRouter, useRouter } from "vue-router";


const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("./Pages/Home.vue"),
        children: [
            {
                path: "/usuarios",
                component: () => import("./Pages/Usuarios/Usuarios.vue"),
            },
            {
                path: "/usuarios/crear",
                name: "CrearUsuario",
                component: () => import("./Pages/Usuarios/Crear.vue"),
            }
        ]
        
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