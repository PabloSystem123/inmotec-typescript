import React from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { cn } from "@/shared/utils/cn"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu, Settings } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#00457B] text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/matriz-logo.png" alt="Matriz Inmobiliaria" width={150} height={40} />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-white/10 text-white"}
                >
                  Inicio
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/nosotros">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-white/10 text-white"}
                >
                  Nosotros
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white">
                Inmuebles
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem to="/inmuebles?tipo=venta" title="En Venta">
                    Propiedades disponibles para compra
                  </ListItem>
                  <ListItem to="/inmuebles?tipo=alquiler" title="En Alquiler">
                    Propiedades disponibles para alquilar
                  </ListItem>
                  <ListItem to="/inmuebles?tipo=comercial" title="Comerciales">
                    Locales y oficinas comerciales
                  </ListItem>
                  <ListItem to="/inmuebles?tipo=proyectos" title="Proyectos Nuevos">
                    Desarrollos inmobiliarios en construcción
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white">
                Servicios
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {services.map((service) => (
                    <ListItem
                      key={service.title}
                      to={`/servicios#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      title={service.title}
                    >
                      {service.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contactanos">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-white/10 text-white"}
                >
                  Contáctanos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Link to="/admin" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Admin
            </Link>
          </Button>
          <Button asChild className="bg-white text-[#00457B] hover:bg-gray-100">
            <Link to="/login">Iniciar sesión</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#00457B] text-white">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-xl font-medium">
                Inicio
              </Link>
              <Link to="/nosotros" className="text-xl font-medium">
                Nosotros
              </Link>
              <Link to="/inmuebles" className="text-xl font-medium">
                Inmuebles
              </Link>
              <Link to="/servicios" className="text-xl font-medium">
                Servicios
              </Link>
              <Link to="/contactanos" className="text-xl font-medium">
                Contáctanos
              </Link>
              <Link to="/admin" className="text-xl font-medium flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Admin
              </Link>
              <Button asChild className="mt-4 bg-white text-[#00457B] hover:bg-gray-100">
                <Link to="/login">Iniciar sesión</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const services = [
  {
    title: "Compra y Venta",
    description: "Asesoramiento completo en el proceso de compra y venta de propiedades.",
  },
  {
    title: "Alquiler",
    description: "Gestión integral de alquileres y administración de propiedades.",
  },
  {
    title: "Tasaciones",
    description: "Valoración profesional de inmuebles para conocer el precio real de mercado.",
  },
  {
    title: "Asesoría Legal",
    description: "Asesoramiento legal en todas las etapas de la transacción inmobiliaria.",
  },
]